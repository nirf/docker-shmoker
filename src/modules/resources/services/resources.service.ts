import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Resource} from '../entities/resource.entity'
import {ResourceDto} from '../../../common/common'

@Injectable()
export class ResourcesService {
    constructor(
        @InjectRepository(Resource)
        private resourceRepository: Repository<Resource>,
    ) {
    }

    async getResourceById(id: string): Promise<Resource> {
        const resource = await this.resourceRepository.findOne(id)
        if (!resource) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `cant find resource with id ${id}`,
            }, HttpStatus.NOT_FOUND)
        }

        return resource
    }

    async saveResource(resourceDto: ResourceDto): Promise<Resource> {
        return await this.resourceRepository.save(resourceDto)
    }
}
