import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../users/users.entity";
import {QuestionComment} from "../question-comments/question-comments.entity";

@Entity()
export class Question {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", nullable: false})
    content: string

    @Column({type: "integer", default: 0})
    likes: number

    @Column({type: "integer", default: 0})
    dislikes: number

    @Column({type: "boolean", default: false})
    isCompleted: boolean

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date

    @ManyToOne(() => User, user => user.questions)
    author: User

    @OneToMany(() => QuestionComment, questionComments => questionComments.question)
    @JoinTable()
    questionComments: QuestionComment[]

}