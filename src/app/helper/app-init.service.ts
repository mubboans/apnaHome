import { Injectable } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(public storage: StorageService) { }
  Init(){
    return new Promise<void>((resolve, reject) => {
      console.log("AppInitService.init() called");
      ////do your initialisation stuff here  
      // this.storage.logoutUser();
          resolve();
  });
  }
}
export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

