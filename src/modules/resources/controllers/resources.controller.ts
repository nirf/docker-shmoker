import {Body, Controller, Get, Logger, Param, Post} from '@nestjs/common'
import {ResourceDto, ServerResponse} from '../../../common/common'
import {Resource} from '../entities/resource.entity'
import {ResourcesService} from '../services/resources.service'

@Controller('resource')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService,
                private readonly logger: Logger) {
    }

    @Get(':id')
    async getResource(@Param('id') id: string): Promise<ServerResponse<Resource>> {
        this.logger.log(`Getting resource by id:${id}`)
        const resource = await this.resourcesService.getResourceById(id)
        return {
            err: 0,
            msg: 'say hello to my little friend',
            data: resource
        }
    }

    @Post()
    async saveResource(@Body() resourceDto: ResourceDto): Promise<ServerResponse<Resource>> {
        this.logger.log(`Saving resource`)
        const saveResource = await this.resourcesService.saveResource(resourceDto)
        return {
            err: 0,
            msg: 'saved resource',
            data: saveResource
        }
    }
}
