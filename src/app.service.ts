import {Injectable} from '@nestjs/common'
import {Resource, ResourceDto} from './common/common'

@Injectable()
export class AppService {
    async getResourceById(id: string): Promise<Resource> {
        return {
            id: parseInt(id, 10),
            something: 'xxx'
        }
    }

    async saveResource(resourceDto: ResourceDto): Promise<Resource> {
        return {
            id: 1,
            something: resourceDto.something
        }
    }
}
