import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Resource} from './modules/resources/entities/resource.entity'
import {ResourcesModule} from './modules/resources/resources.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'argus',
            entities: [Resource],
            synchronize: true,
        }),
        ResourcesModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
