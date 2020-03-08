import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/providers/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
// loginForm Declaration
forgetForm: FormGroup;
  errorCaptured: any;
  successCaptured: any;
  constructor(private _fb: FormBuilder, 
    private _toastrService: ToastrService,
    private _authService: AuthService) { }

  ngOnInit() {
     // login Form
     this.forgetForm = this._fb.group({
      email: [null, [Validators.required]]
    })
  }
// function that get username
get email(){
  return this.forgetForm.get('email');
}

forget() {
  if(!this.forgetForm.valid){
  } else {
   this._authService.forget(JSON.stringify(this.forgetForm.value)).subscribe(
     data => {
      this.successCaptured = <any>data;
      this._toastrService.success(` ${this.successCaptured.message}`);
      this.forgetForm.reset();
   },
   // tslint:disable-next-line:no-shadowed-variable
   error=> {
   if (error.status == 0) {
    this._toastrService.error('','Check your Network Connection!!!');
   } else if (this.errorCaptured = error.message) {
    this._toastrService.error('',` ${this.errorCaptured}`);
  
   } else {
   
   }
   });
  }
}
}
