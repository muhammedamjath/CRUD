import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormServiceService } from '../../../services/form-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  userForm : FormGroup;
  users:any[]= []
  constructor(private fb: FormBuilder , private service:FormServiceService) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required]],
      place: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service.detailesGet().subscribe((res)=>{
      res.forEach((data:any)=>{
        this.users.push(data)
      })
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.service.formPost(this.userForm.value).subscribe((res)=>{
        this.userForm.reset()
        this.users.push(res)
      })
    }
  }

  deleteUser(id:string){
    this.service.deleteUser(id).subscribe((res)=>{
      this.users = this.users.filter((user) => user._id !== id);
    })
  }
}
