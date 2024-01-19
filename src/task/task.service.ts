import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService){}



  create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: dto
    })
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {id: +id}
    })
    if (!task) throw new NotFoundException('Task not found!');
    return task;
  }

  async switchState(id: number) {
    const task = await this.findOne(id);
    return this.prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        isDone: !task.isDone
      }
    })

    
  }


  async remove(id: number) {
    return await this.prisma.task.delete({
      where: {
        id: +id
      }
    });
  }
}
