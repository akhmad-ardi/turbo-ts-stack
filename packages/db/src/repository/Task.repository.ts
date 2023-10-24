import { AppDataSource } from "../data-source";
import { Task } from "../entity";

export const TaskRepository = AppDataSource.getRepository(Task);
