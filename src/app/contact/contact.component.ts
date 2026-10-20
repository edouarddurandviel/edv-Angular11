import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{

  isLogged!: boolean;


  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(){
    this.isLogged = this.authService.isLogged;
  }


  logout(){
    this.authService.logout().subscribe(
      () => {
        if (!this.authService.isLogged){
          this.route.navigate(['/']);
        }
      }
    );
  }

}