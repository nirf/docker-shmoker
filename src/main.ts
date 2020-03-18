import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {constants} from './utils/project.constants'
import {INestApplication} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix(constants.globalPrefix)
    setupSwagger(app)
    await app.listen(3000)
}

function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle(constants.service)
        .setDescription(constants.description)
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(`${constants.globalPrefix}/swagger`, app, document)
}

bootstrap()
