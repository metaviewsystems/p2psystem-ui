import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonResponse } from '../common/common-response';
import { ApiService } from '../auth/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('admin@metaviewsystems.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  public loginError: String;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.apiService.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          if (data.status === 200 && !data.body.ErrorCode) {
            this.router.navigate(['/violation']);
          } else {
            this.loginError = data.body.message;
          }
        },
        (error) => (this.loginError = error)
      );
    }
  }
}
