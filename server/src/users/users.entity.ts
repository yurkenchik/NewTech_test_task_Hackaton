import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SupportCategoriesEnum} from "../enums/support-categories.enum";
import {Question} from "../questions/questions.entity";


@Entity()
export class User {

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

    @Column({type: "varchar"})
    role: string = "USER"

    @OneToMany(() => Question, question => question.author)
    @JoinTable()
    questions: User[]

}
