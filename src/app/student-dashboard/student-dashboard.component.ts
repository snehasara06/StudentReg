import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  studentobj: StudentModel = new StudentModel;

  allstudent: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      dept:[''],
      year:[''],
      // password:['']
    })
    this.AllStudent();
  }

  AddStudent(){
    this.studentobj.dept = this.formValue.value.dept;
    // this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.year = this.formValue.value.year;
    this.studentobj.mobile = this.formValue.value.mobile;

    this.api.postStudent(this.studentobj).subscribe({next: (v) => {
      console.log(v)
    },
    error: (e) => {
      alert("Error")
      console.log(e)
    },
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllStudent();
      this.formValue.reset();
    } 
  })
  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      this.allstudent = res;
    })
  }

  EditStudent(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['year'].setValue(data.year);
    this.formValue.controls['dept'].setValue(data.dept);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    // this.formValue.controls['password'].setValue(data.password);
    this.studentobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.studentobj.year = this.formValue.value.year;
    this.studentobj.mobile = this.formValue.value.mobile;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.dept = this.formValue.value.dept;
    // this.studentobj.class = this.formValue.value.class;
    this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllStudent();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
