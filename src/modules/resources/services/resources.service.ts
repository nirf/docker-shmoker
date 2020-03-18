import {Injectable} from '@nestjs/common'
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
        return await this.resourceRepository.findOne(id)
        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN,
        //     error: 'This is a custom message',
        // }, HttpStatus.FORBIDDEN);
    }

    async saveResource(resourceDto: ResourceDto): Promise<Resource> {
        return await this.resourceRepository.save(resourceDto)
    }
}
