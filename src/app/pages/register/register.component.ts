import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm!: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private api:CommonService,
    private router:Router
    ) { }
 
    ngOnInit(): void {    
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        mobile: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        user_type: ['', Validators.required],
      });
    }


    onSubmit() {
      if (this.registerForm.valid) {
        const body = {...this.registerForm.value,device:'mobile',social_auth:1}
        this.api.register(body).subscribe({
          next:(res)=>{
            console.log(res);  
            if(res?.status){
              this.router.navigate(['/home'])
            }          
          },
          error:(err)=>{
            console.log(err);
            const error= err.error.error
            alert(error[error?.length-1]|| 'error occures canot register')
          }
        })

      } else {
        alert('fill the form')
        this.registerForm.markAllAsTouched();

      }
    }
}
