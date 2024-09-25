import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted = false;
  

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private api:CommonService
    ) { }
 
  ngOnInit(): void {    
    this.loginForm = this.fb.group({
      username:['',Validators.required],
    })

  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    this.submitted= true
    if(this.loginForm.valid){
      const body = {...this.loginForm.value,device:'web',social_auth:1}
      this.api.login(body).subscribe({
        next:(res)=>{
          if(res.status){
            localStorage.setItem('token',res.user.token)
            this.router.navigate(['/home'])
          }         
        },
        error:(err)=>{
          console.log(err);          
        }
      })
      
    } else{
      alert('form is invalid')
    }



  }
}
