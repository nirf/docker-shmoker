import {Logger, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Resource} from './entities/resource.entity'
import {ResourcesService} from './services/resources.service'
import {ResourcesController} from './controllers/resources.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Resource])],
    providers: [ResourcesService, Logger],
    controllers: [ResourcesController],
})
export class ResourcesModule {
}
