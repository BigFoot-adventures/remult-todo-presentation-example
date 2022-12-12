import { Allow, BackendMethod, remult } from "remult";
import { List } from "./List";
import { Task } from "./Task";

export class TasksController {

  // can ignore entity api restrictions
  @BackendMethod({ allowed: true })
  static async setAll(completed: boolean, listId: string) {
    const taskRepo = remult.repo(Task);

    for (const task of await taskRepo.find({where: {list: listId}})) {
      await taskRepo.save({ ...task, completed });
    }
  }

  @BackendMethod({ allowed: Allow.authenticated})
  static async updatedUsername(oldUser: string, newUser: string){
    const listRepo = remult.repo(List);
    for(const list of await listRepo.find({where: {user: oldUser}})){
      await listRepo.save({...list, user: newUser})
    }
  }
}
