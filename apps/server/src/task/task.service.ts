import { Injectable } from '@nestjs/common';
import { AppDataSource, Task, TaskRepository, UserRepository } from 'db';
import { CreateTaskDto } from 'dto';

@Injectable()
export class TaskService {
  async createTask(id: string, createTaskDto: CreateTaskDto) {
    const newTask = new Task();
    newTask.task = createTaskDto.task;
    newTask.userId = await UserRepository.findOneBy({ id });
    try {
      await TaskRepository.manager.save(newTask);

      return 'task added';
    } catch (error) {
      return error;
    }
  }

  async getTasks() {
    const data = await TaskRepository.find();
    if (data.length === 0) return new Error('nothing task');

    return data;
  }

  async getTask(id: string) {
    const task = await TaskRepository.findOneBy({ id });
    if (!task) return new Error('task not found');

    return task;
  }

  async finishTask(id: string) {
    const task = await this.getTask(id);
    if (task instanceof Error) return task;

    task.finished = !task.finished;

    await AppDataSource.manager.save(task);

    if (task.finished) return 'task finished';
    else return 'task not finish';
  }
}
