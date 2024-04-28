import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Answer } from '../answers/answers.entity';

@Entity()
export class AnswerComment {

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

    @ManyToOne(() => Answer, answer => answer.answerComments)
    answer: Answer

}