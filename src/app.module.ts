import {Logger, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ResourcesModule} from './modules/resources/resources.module'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {HealthModule} from './health/health.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_SCHEMA'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get<boolean>('DB_SYNC'),
            }),
            inject: [ConfigService]
        }),
        ResourcesModule,
        HealthModule],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
}
