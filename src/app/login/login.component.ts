import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/providers/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
// loginForm Declaration
loginForm: FormGroup;
  errorCaptured: any;
  successCaptured: any;
  constructor( private _fb:FormBuilder,private _authService: AuthService, private _router: Router,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    // login Form
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null,  [Validators.required]]
    })
  }
// function that get username
get username(){
  return this.loginForm.get('username');
}
// function to get password
get password() {
  return this.loginForm.get('password');
}

// Function to login as user
login(){
  if(!this.loginForm.valid){
    this._toastrService.error('','Empty Form submission is not allowed!', {
      timeOut: 2000
    });
  } else {
  
   this._authService.login(JSON.stringify(this.loginForm.value))
   
   .subscribe(
     data => {
       this.successCaptured = <any>data;  

        this._toastrService.success('',`Login is Successful`, {
         timeOut: 2000
       });
       this._router.navigate([''])     
   },
   // tslint:disable-next-line:no-shadowed-variable
   error=> {
    if (error.status == 0) {
      this._toastrService.error('','Check your Networkk Connection!!!');
     
     } else if (   this.errorCaptured = <any>error.error.message) {
      this._toastrService.error('',`${this.errorCaptured}`, {
        timeOut: 3000
      }); 
     
     } else {
      this._toastrService.error('','Service is unavailable!!!');
      
     }
  });
}
}
}
