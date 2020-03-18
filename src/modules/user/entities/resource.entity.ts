import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    something: string
}
