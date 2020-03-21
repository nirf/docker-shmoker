import {Logger, Module} from '@nestjs/common'
import {TerminusModule} from '@nestjs/terminus'
import {TerminusOptionsService} from './terminus-options.service'
import {ConfigModule} from '@nestjs/config'

@Module({
    imports: [
        TerminusModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TerminusOptionsService,
        }),
    ],
})
export class HealthModule {
}
