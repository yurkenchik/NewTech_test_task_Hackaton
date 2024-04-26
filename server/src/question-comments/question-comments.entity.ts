import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Question} from "../questions/questions.entity";

@Entity()
export class QuestionComment {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", nullable: false})
    content: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date

    @ManyToOne(() => Question, question => question.questionComments)
    question: Question

}