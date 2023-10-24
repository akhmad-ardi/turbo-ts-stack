export { AppDataSource } from "./data-source";
export * from "./entity";
export * from "./repository";

import { AppDataSource } from "./data-source";

export async function initializeDb() {
  try {
    await AppDataSource.initialize();

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

