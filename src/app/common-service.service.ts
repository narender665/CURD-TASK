import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  isClone=false;
  constructor() { }
  setClone(clone:boolean){
    this.isClone = clone;
  }
  getClone(){
    return this.isClone
  }
}
