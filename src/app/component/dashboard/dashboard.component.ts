import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
taskobj:Task=new Task();
taskArr:Task[]=[];
addTaskValue:string='';
editTaskValue:string='';
addWorkValue:string='';
editWorkValue:string='';
  constructor(public crudService:CrudService) { }

  ngOnInit(): void {

 this.taskobj= new Task();
this.getAllTask();
this.taskArr=[];
this.editTaskValue='';
this.addTaskValue='';
this.editWorkValue='';
this.addWorkValue='';
}

getAllTask(){
  this.crudService.getAllTask().subscribe(res=>{
this.taskArr=res;
  },err=>{
    alert("err unable to get list");
  })
}

addTask(){
  this.taskobj.task_name=this.addTaskValue;
  this.taskobj.task_work=this.addWorkValue;
this.crudService.addTask(this.taskobj).subscribe(res=>{
  this.ngOnInit();
  this.addTaskValue='';
  this.addWorkValue='';
},err=>{
  alert(err);
})
}

editTask(){
  this.taskobj.task_name=this.editTaskValue;
  this.taskobj.task_work=this.editWorkValue;
  this.crudService.editTask(this.taskobj).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    alert("fail to Update");
  })
  }

  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("fail to delete");
    })
    }

    call(etask:Task){

this.taskobj=etask;
this.editTaskValue=etask.task_name;
this.editWorkValue=etask.task_work;
}
}
