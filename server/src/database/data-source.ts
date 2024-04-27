import {User} from "../users/users.entity";
import {Question} from "../questions/questions.entity";
import {QuestionComment} from "../question-comments/question-comments.entity";
import {Assistant} from "../assistants/assistants.entity";
import {Answer} from "../answers/answers.entity";
import {AnswerComment} from "../answer-comments/answer-comments.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import * as process from "process";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
    entities: [User, Question, QuestionComment, Assistant, Answer, AnswerComment],
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    migrations: [process.env.TYPEORM_MIGRATIONS]
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource