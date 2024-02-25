import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @IsString()
    @ApiProperty({ description: "Task name", nullable: true })
    name: string;

}
