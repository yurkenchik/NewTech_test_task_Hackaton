import {forwardRef, Module} from '@nestjs/common';
import { AssistantsService } from './assistants.service';
import { AssistantsController } from './assistants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistant } from './assistants.entity';
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [AssistantsController],
    providers: [AssistantsService],
    imports: [
        TypeOrmModule.forFeature([Assistant]),
        forwardRef(() => JwtModule)

    ],
    exports: [
        TypeOrmModule,
        AssistantsService
    ]
})
export class AssistantsModule {}
