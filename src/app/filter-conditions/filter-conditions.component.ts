import { Component, OnInit } from '@angular/core';
import { QueryBuilderService } from '../shared/services/query-builder.service';
import * as _ from 'lodash';
import { RuleModel,QueryParamsModel } from '../shared/models/all-models';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  rule:RuleModel=null;
  config:QueryParamsModel=null;
  enableReset:Boolean=false;
  constructor(private queryBuilderService:QueryBuilderService) {
    this.initializeObjects();
   }
  initializeObjects(){
    this.rule=new RuleModel();
    this.rule.condition="AND";
    this.rule.rules=[];
    this.rule.field=null;
    this.rule.isGroup=true;
    this.rule.isValidGroup=false;
    this.rule.operator=null;
    this.rule.value=null;
    this.rule.isValidRule=true;
    this.config=this.queryBuilderService.createQueryParams();
    this.enableReset=false;
  }
  ngOnInit() {
  }
  onApplyQuery(){
    const rule=this.queryBuilderService.checkForRuleValidation(this.rule);
    //console.log(rule);
    //const rule=_.cloneDeep(this.rule);
    this.rule=_.cloneDeep(rule);
    this.enableReset=true;
    let query=this.queryBuilderService.createQuery(this.rule,this.config);
    console.log(query);
  }
  onResetQuery(){
    this.initializeObjects();
    //console.log(this.rule);
  }
  checkForEnable(){
    let enable=false;
    if(this.rule){
      if(this.rule.rules.length>1){
        enable=true;
      }
    }
    return enable;
  }
}
