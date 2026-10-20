import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged!: boolean;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(){
    this.isLogged = this.authService.isLogged;
  }

  login(){
    this.authService.login().subscribe(() => {
        if (this.authService.isLogged){
          this.route.navigate(['/contact-page']);
      }
    });
  }

  logout(){
    this.authService.logout();
  }

}
