import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/providers/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // emailRegForm Declaration
  regForm: FormGroup; 
  errorCaptured: any;
  successCaptured: any;
  constructor(private _fb: FormBuilder,private _authService: AuthService, private _toastrService: ToastrService, private _router: Router) { }

  ngOnInit() {
     // Registration Form Declaration Email 
     this.regForm = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required ]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmPassword: ['',  passwordValidator],
    })
  }
  get username(){
    return this.regForm.get('username');
  }

  // function to get email
  get email() {
    return this.regForm.get('email');
  }
  // function to get password
  get password() {
    return this.regForm.get('password');
  }
  get confirmPassword() {
    return this.regForm.get('confirmPassword');
  }
   register(){
    if(!this.regForm.valid){
    } else {
     
     this._authService.register(JSON.stringify(this.regForm.value))
     .subscribe(
       data => {
         this.successCaptured = <any>data['message'];
         this._toastrService.success('',`${this.successCaptured}`, {
           timeOut: 3000
         }); 
           this.regForm.reset();
           this._router.navigate(['/login'])
     },
     // tslint:disable-next-line:no-shadowed-variable
     error=> {
       if (error.status == 0) {
         this._toastrService.error('','Check your Network Connection!!!');
        }  else if (this.errorCaptured = <any>error.error.message.email ) {
         this._toastrService.error('',`${this.errorCaptured}`, {
           timeOut: 3000
         }); 
        }
        else {
         this._toastrService.error('','Service is unavailable!!!');
        }
     });
    }
   }
}

// Comparing the password
// Function to check if the password match each other
export function  passwordValidator(control:AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
      const confirmPasswordValue = control.value;
      const passwordControl = control.root.get('password');
      if(passwordControl){
            const passwordValue = passwordControl.value;
            if(passwordValue !== confirmPasswordValue || passwordValue === '' ){
                return { 
                    isError: true
               }
            }
      }
  }
  return null;
} 

