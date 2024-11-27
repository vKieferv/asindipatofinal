import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import {User} from 'src/app/models/user.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title: 'Inicio', url: '/main/home',icon: 'home-outline'},
    {title: 'perfil', url: '/main/intro',icon: 'person-outline'},
  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  currentPath: string = '';
  ngOnInit() {
    this.router.events.subscribe((event:any)=>{
      if(event?.url) this.currentPath = event.url;

    })
  }

  signOut() {
    this.firebaseSvc.signOut();
  }



}
