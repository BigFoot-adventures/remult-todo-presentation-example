import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  listRepo = remult.repo(List);
  tasks: Task[] = [];
  //currentList: List;
  @Input() list?: List;
  @Output() deletedList = new EventEmitter<boolean>();

  ngOnInit() {
    this.fetchTasks();
    if(this.tasks.length == 0){
      this.addTask();
    }
  }

  hideCompleted = false;
  async fetchTasks() {
    if(this.list){
      this.tasks = await this.taskRepo.find({
        limit: 20,
        orderBy: {completed: "asc"},
        where: {
          completed: this.hideCompleted ? false : undefined,
          list: this.list.listId
        }
      });
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
    if(this.list)
      this.tasks.push(new Task(this.list.listId));
  }

  async deleteTask(task: Task) {
    await this.taskRepo.delete(task);
    this.tasks = this.tasks.filter(t => t !== task);
  }

  async setAll(completed: boolean){
    await TasksController.setAll(completed, this.list!.listId);
    this.fetchTasks();
  }

  async deleteList(){
    if(this.list){
      await this.listRepo.delete(this.list.listId)
    }
    this.deletedList.emit(true);    
  }
  
  async saveList(){
    try{
      if(this.list)
        await this.listRepo.save(this.list);
    }catch(err: any){
      console.log(err.message);
    }
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
