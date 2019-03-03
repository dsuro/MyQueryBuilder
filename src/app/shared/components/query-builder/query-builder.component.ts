import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RuleModel,QueryParamsModel } from '../../models/all-models';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {
  @Input() data:RuleModel;
  @Input() queryParams:QueryParamsModel;

  ruleData:RuleModel=null;
  rules:Array<RuleModel>=null;
  isAndActive:Boolean=true;
  isOrActive:Boolean=false;
  config:QueryParamsModel;
  id:number=0;
  constructor() { 
    this.rules=new Array<any>();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['data'] && changes['data'].previousValue!=changes['data'].currentValue){
      this.ruleData=this.data;
      this.rules=this.ruleData.rules;
      this.setActiveCondition(this.ruleData.condition);
    }
    if(changes['queryParams'] && changes['queryParams'].previousValue!=changes['queryParams'].currentValue){
      this.config=this.queryParams;
    }
  }
  onAddRule(){
    let rule:RuleModel=new RuleModel();
    rule.condition=null;
    rule.rules=[];
    rule.isGroup=false;
    rule.isValidRule=true;
    this.rules.push(rule);
    this.checkForGroupValidation();
    //console.log(this.rules);
  }
  onAddGroup(){
    let rule:RuleModel=new RuleModel();
    rule.condition="AND";
    rule.rules=[];
    rule.isGroup=true;
    rule.isValidGroup=false;
    rule.isValidRule=true;
    this.rules.push(rule);
    this.checkForGroupValidation();
    //console.log(this.rules);
  }
  onDeleteRule(index){
    //console.log(index);
    if(this.rules.length>0){
      this.rules.splice(index,1);
      //console.log(this.rules);
    }
    this.checkForGroupValidation();
  }
  onDeleteGroup(){
    while(this.rules.length){
      this.rules.pop();
    }
    this.checkForGroupValidation();
  }
  setActiveCondition(condition){
    if(condition=='AND'){
      this.isAndActive=true;
      this.isOrActive=false;
    }
    else if(condition=='OR'){
      this.isAndActive=false;
      this.isOrActive=true;
    } 
    this.ruleData.condition=condition;
  }
  checkForGroupValidation(){
    if(this.rules.length>1){
      this.ruleData.isValidGroup=true;
    }else{
      this.ruleData.isValidGroup=false;
    }
  }
  onFieldSelection(value,rule){
    //console.log(value);
    //console.log(rule);
    //console.log(this.config);
    if(this.config && value){
      if(value!="-1"){
        const field=this.config.fields.filter((item)=>{
          return item.value==value;
        });
        if(field.length>0){
          rule['operators']=field[0].data.operators;
          rule['valueData']=field[0].data;
        }
        rule['isValidRule']=true;
      }
      else{
        rule['operators']=[];
        rule['valueData']=null;
      }
    }
  }
  onOperatorSelection(value,rule){
    //rule['value']=value;
    if(value!="-1"){
      rule['isValidRule']=true;
    }
  }
}
