import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {AppService} from './app.service'
import {Resource, ResourceDto, ServerResponse} from './common/common'

@Controller('resource')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get(':id')
    async getResource(@Param('id') id: string): Promise<ServerResponse<Resource>> {
        const resource = await this.appService.getResourceById(id)
        return {
            err: 0,
            msg: 'say hello to my little friend',
            data: resource
        }
    }

    @Post()
    async saveResource(@Body() resourceDto: ResourceDto): Promise<ServerResponse<Resource>> {
        const saveResource = await this.appService.saveResource(resourceDto)
        return {
            err: 0,
            msg: 'saved resource',
            data: saveResource
        }
    }
}
