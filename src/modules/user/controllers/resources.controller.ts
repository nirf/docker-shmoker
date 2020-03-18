import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {ResourceDto, ServerResponse} from '../../../common/common'
import {Resource} from '../entities/resource.entity'
import {ResourcesService} from '../services/resources.service'

@Controller('resource')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {
    }
    @Get(':id')
    async getResource(@Param('id') id: string): Promise<ServerResponse<Resource>> {
        const resource = await this.resourcesService.getResourceById(id)
        return {
            err: 0,
            msg: 'say hello to my little friend',
            data: resource
        }
    }

    @Post()
    async saveResource(@Body() resourceDto: ResourceDto): Promise<ServerResponse<Resource>> {
        const saveResource = await this.resourcesService.saveResource(resourceDto)
        return {
            err: 0,
            msg: 'saved resource',
            data: saveResource
        }
    }
}
