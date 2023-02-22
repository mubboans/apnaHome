import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public route:Router) { }
  
  setUserData(data){
    localStorage.setItem('userData', JSON.stringify(data));
  }
  setToken(data){
    localStorage.setItem('token', JSON.stringify(data));
  }
  getToken(){
   return localStorage.getItem('token');
  }
  getUserData(){
    return localStorage.getItem('userData');
  }
  
  isUserLogin(){
    return !!localStorage.getItem('userData');
  }
  logoutUser(){
    localStorage.removeItem('userData');
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
