import { BackendMethod, remult } from "remult";
import { Task } from "./Task";

export class TasksController {
  @BackendMethod({ allowed: true })
  static async setAll(completed: boolean, listId: string) {
    const taskRepo = remult.repo(Task);

    for (const task of await taskRepo.find({where: {list: listId}})) {
      await taskRepo.save({ ...task, completed });
    }
  }
}
