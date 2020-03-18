import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export interface ServerResponse<T> {
    err: number,
    msg: string,
    data: T
}

export class ResourceDto {
    @ApiModelProperty({
        type: String,
        example: 'blabla',
        required: true
    })
    something: string
}

// tslint:disable-next-line:max-classes-per-file
export class Resource {
    id: number
    something: string
}
