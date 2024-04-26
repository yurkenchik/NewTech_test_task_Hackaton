import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupportCategoriesEnum } from '../enums/support-categories.enum';
import { Answer } from '../answers/answers.entity';


@Entity()
export class Assistant {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", nullable: false})
    email: string

    @Column({type: "varchar", nullable: false})
    username: string

    @Column({type: "varchar", nullable: false})
    firstname: string

    @Column({type: "varchar", nullable: false})
    lastname: string

    @Column({
        type: "simple-array",
        array: true,
        enum: SupportCategoriesEnum,
        default: []
    })
    supportCategories: SupportCategoriesEnum[]

    @Column({type: "varchar", default: ""})
    avatarImage: string

    @Column({type: "boolean", default: false})
    isBanned: boolean

    @Column({type: "varchar", nullable: true})
    banReason: string

    @Column({type: "varchar", nullable: false})
    password: string

    @Column({type: "varchar"})
    role: string = "ASSISTANT"

    @Column({type: "varchar", nullable: true})
    filePath: string

    @Column({type: "bytea", nullable: true})
    fileData: Buffer

    @OneToMany(() => Answer, answer => answer.author)
    @JoinTable()
    answers: Answer[]

}