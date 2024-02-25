import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('task')  //секция в Swagger для всех методов контроллера
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

 
  @Post()// обработает Post http://localhost:3333/task
  @ApiOperation({ summary: "Add a new task" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateTaskDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes (new ValidationPipe())
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Get()// обработает Get http://localhost:3333/task
  @ApiOperation({ summary: "Returns all tasks" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateTaskDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')// обработает Get http://localhost:3333/task/{id}
  @ApiOperation({ summary: "Returns a task with specified id" })
  @ApiParam({ name: "id", required: true, description: "Task identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateTaskDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')// обработает Patch http://localhost:3333/task/{id}
  @ApiOperation({ summary: "Сhange the status of the task" })
  @ApiParam({ name: "id", required: true, description: "Task identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateTaskDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  switchState(@Param('id') id: string) {
    return this.taskService.switchState(+id);
  }

  @Delete(':id')// обработает Delete http://localhost:3333/task/{id}
  @ApiOperation({ summary: "Delete the task" })
  @ApiParam({ name: "id", required: true, description: "Task identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateTaskDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
