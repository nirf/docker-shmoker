import {DiskHealthIndicator, DNSHealthIndicator, MemoryHealthIndicator, TerminusEndpoint, TerminusModuleOptions, TerminusOptionsFactory, TypeOrmHealthIndicator,} from '@nestjs/terminus'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {constants} from '../utils/project.constants'

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
        private readonly dnsHealthIndicator: DNSHealthIndicator,
        private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
        private readonly memoryHealthIndicator: MemoryHealthIndicator,
        private readonly diskHealthIndicator: DiskHealthIndicator,
        private readonly configService: ConfigService
    ) {
    }

    createTerminusOptions(): TerminusModuleOptions {
        const healthEndpoint: TerminusEndpoint = {
            url: `${constants.globalPrefix}/health`,
            healthIndicators: [
                async () => this.dnsHealthIndicator.pingCheck('api', `http://localhost:3000${constants.globalPrefix}/swagger`),
                async () => this.typeOrmHealthIndicator.pingCheck(this.configService.get<string>('DB_SCHEMA')),
                // The process should not use more than 150MB memory
                async () => this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
                // The process should not have more than 150MB allocated
                async () => this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
                // The used disk storage should not exceed 50% of the full disk size
                async () => this.diskHealthIndicator.checkStorage('storage', {thresholdPercent: 0.5, path: '/'})
            ],
        }
        return {
            endpoints: [healthEndpoint],
        }
    }
}
