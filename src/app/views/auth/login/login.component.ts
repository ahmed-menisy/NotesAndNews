import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  onSubmitLog(data: FormGroup): void {
    if (data.invalid) return;
    this._AuthService.login(data.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this._ToastrService.success('Login Successfuly', 'Success', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });

        localStorage.setItem(
          'tokenKeep',
          JSON.stringify([response.access_token, response.role])
        );
        this._AuthService.saveData();

        // this._AuthService.role.next(response.role);
        if (response.role === 'admin') this._Router.navigate(['/admin']);
        else this._Router.navigate(['/user']);
      },
      error: (err: any) => {
        this._ToastrService.error(err.statusText, 'Error!', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }
}
