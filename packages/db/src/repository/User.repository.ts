import { AppDataSource } from "../data-source";
import { User } from "../entity";

export const UserRepository = AppDataSource.getRepository(User);
