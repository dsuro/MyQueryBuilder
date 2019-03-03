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

  }
  ngOnInit() {
  }
  onApplyQuery(){
    const rule=this.queryBuilderService.checkForRuleValidation(this.rule);
    console.log(rule);
   //const rule=_.cloneDeep(this.rule);
   this.rule=_.cloneDeep(rule);
  }
  onResetQuery(){
    this.initializeObjects();
    console.log(this.rule);
  }
}
