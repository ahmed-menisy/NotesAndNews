import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {}
  showPass: boolean = true;

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  // on Submit Form
  onSubmitForm(data: FormGroup): void {
    if (data.invalid) return;
    this._AuthService.signup(data.value).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('SignUp Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });

        this._Router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.statusText, 'Error!', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }
}
