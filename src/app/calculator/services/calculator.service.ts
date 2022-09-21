import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  saveValueNumber(number:string){
    sessionStorage.setItem('number',number)
  }
  deleteValueNumber(){
    sessionStorage.clear();
  }
  getValueNumber():string|null{
    return sessionStorage.getItem('number')
  }

}
