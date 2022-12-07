import { Component, Input, OnInit } from '@angular/core';
import { remult } from 'remult';
import { List } from 'src/shared/List';
import { TasksController } from 'src/shared/TasksController';
import { Task } from '../../shared/Task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  taskRepo = remult.repo(Task);
  tasks: Task[] = [];
  //currentList: List;
  @Input() list = new List;

  ngOnInit() {
    this.fetchTasks();
  }

  hideCompleted = false;
  async fetchTasks() {
    this.tasks = await this.taskRepo.find({
      limit: 20,
      orderBy: {completed: "asc"},
      where: {
        completed: this.hideCompleted ? false : undefined,
        list: this.list.listId
      }
    });
    if(this.tasks.length == 0){
      this.addTask();
    }
  }

  async saveTask(task: Task) {
    try{
      const savedTask = await this.taskRepo.save(task);
      this.fetchTasks();
      //this.tasks = this.tasks.map(t => t === task ? savedTask : t);
    }catch(err: any){
      console.log(err.message);
    }
  }

  addTask() {
    this.tasks.push(new Task(this.list.listId));
  }

  async deleteTask(task: Task) {
    await this.taskRepo.delete(task);
    console.log('deleted');
    
    this.tasks = this.tasks.filter(t => t !== task);
  }

  async setAll(completed: boolean){
    await TasksController.setAll(completed);
    this.fetchTasks();
  }
  /*async taskCount(){
    let repo = this.tasks;//await this.taskRepo.find()
    if(repo.length < 20){
      return false;
    }else{
      return true;
    }
  }*/
}
