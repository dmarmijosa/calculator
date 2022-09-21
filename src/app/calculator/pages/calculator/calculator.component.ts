import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls:['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  numberOperation1:string='';
  numberOperation2:string='';
  sum:boolean=false;
  mul:boolean=false;
  res:boolean=false;
  div:boolean=false;
  igu:boolean=false;
  error:boolean=false;

  constructor(private cs:CalculatorService) { }

  ngOnInit(): void {
  }
  numberAddString(number:string){

    this.error=false;
    if(this.igu){
      this.numberOperation1='';
      this.igu=false;
    }
    this.numberOperation1=this.numberOperation1+number;
  }
  deleteLastNumber(){
    this.error=false;
    this.numberOperation1 = this.numberOperation1.slice(0,-1);
  }
  deletAll(){
    this.error=false;
    this.numberOperation1='';
    this.cs.deleteValueNumber();
  }
  saveValue(){
    if(!this.numberOperation1){
      return;
    }
    this.cs.saveValueNumber(this.numberOperation1);
    this.numberOperation1='';
  }
  getValue(){
    if(!this.cs.getValueNumber()){
      return;
    }
    this.numberOperation1=this.cs.getValueNumber()||'';
  }
  inMemory():boolean{
    return this.cs.getValueNumber()?true:false;
  }
  negative(){
    if(!this.numberOperation1){
      return;
    }
    this.numberOperation1= ((parseFloat(this.numberOperation1))*-1).toString();
  }
  operator(operator:string){

    switch(operator){

      case 'x':
        this.numberOperation2= this.numberOperation1;
        this.numberOperation1='';
        this.mul=true;
      break;
      case '/':
        this.numberOperation2= this.numberOperation1;
        this.numberOperation1='';
        this.div=true;
      break;
      case '+':
        this.numberOperation2= this.numberOperation1;
        this.numberOperation1='';
        this.sum=true;
      break;
      case '-':
        this.numberOperation2= this.numberOperation1;
        this.numberOperation1='';
        this.res=true;
      break;
      case 'inv':
        if(parseFloat(this.numberOperation1)===0){
          this.numberOperation1=`0`;
          this.error=true;
          this.div=false;
        }else{
          this.numberOperation1=`${1/parseFloat(this.numberOperation1)}`;
        }
      break;
      case 'pot':
        this.numberOperation1=`${Math.pow(parseFloat(this.numberOperation1),2)}`
        break;
      case 'sqrt':
        if(parseFloat(this.numberOperation1)<0){
          this.numberOperation1=`0`;
          this.error=true;
          this.div=false;
        }else{
          this.numberOperation1=`${Math.sqrt(parseFloat(this.numberOperation1))}`;
        }
      break;
      case '=':
        this.igu=true;

        if(this.mul && this.numberOperation1){
          this.numberOperation1=`${parseFloat(this.numberOperation2) * parseFloat(this.numberOperation1)}`;
          this.mul=false
        }
        if(this.div && this.numberOperation1){
          if(parseFloat(this.numberOperation1)===0){
            this.numberOperation1=`0`;
            this.error=true;
            this.div=false;
          }else{
            this.numberOperation1=`${parseFloat(this.numberOperation2) / parseFloat(this.numberOperation1)}`;
            console.log(`${parseFloat(this.numberOperation2) / parseFloat(this.numberOperation1)}`);
            this.div=false;
          }

        }
        if(this.res && this.numberOperation1){
          this.numberOperation1=`${parseFloat(this.numberOperation2) - parseFloat(this.numberOperation1)}`;
          this.res=false;
        }
        if(this.sum && this.numberOperation1){
          this.numberOperation1=`${parseFloat(this.numberOperation2) + parseFloat(this.numberOperation1)}`;
          this.sum=false;
        }





    }
  }



}
