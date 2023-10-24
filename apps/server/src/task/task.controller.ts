import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { CreateTaskDto } from 'dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Req() req: { user: { sub: string } },
    @Body() createTask: CreateTaskDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.taskService.createTask(req.user.sub, createTask);

      if (typeof data === 'string')
        return res.json({ code: 201, message: data });

      throw data;
    } catch (error) {
      console.log(error);

      return res.send('something error');
    }
  }

  @Get()
  async getTasks(@Res() res: Response) {
    try {
      const data = await this.taskService.getTasks();
      if (data instanceof Error) throw data;

      return res.json({ code: 200, data });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ code: 400, message: error.message });

      return res.send('something erro');
    }
  }

  @Get(':id')
  async getTask(@Param('id') id: string, @Res() res: Response) {
    try {
      const getTaskService = await this.taskService.getTask(id);
      if (getTaskService instanceof Error) throw getTaskService;

      return res.json({ code: 200, data: getTaskService });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ code: 404, message: error.message });

      return 'something error';
    }
  }

  @Patch(':id')
  async finishTask(@Param('id') id: string, @Res() res: Response) {
    try {
      const finishTaskService = await this.taskService.finishTask(id);
      if (finishTaskService instanceof Error) throw finishTaskService;

      return res.json({ code: 201, message: finishTaskService });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ code: 404, message: error.message });

      return res.send('somwthing error');
    }
  }
}
