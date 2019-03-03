import { Injectable } from '@angular/core';
import { RuleModel,FieldModel,FieldDetailsModel,OperatorModel,DataModel,QueryParamsModel } from '../models/all-models';
import { ControlTypes } from '../constants/control-types';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  constructor() { }
  checkForRuleValidation(rule:RuleModel){
    if(rule){
      if(rule.rules.length>0){
        for (let item of rule.rules) {
          if(item.isGroup){
            item=this.checkForChildRuleValidation(item);
          }
          else
          {
            item.isValidRule=this.checkForData(item);
          }
        }
      }
    }
    return rule;
  }
  private checkForChildRuleValidation(rule:RuleModel){
    if(rule){
      if(rule.rules.length>0){
        for (let item of rule.rules) {
          if(item.isGroup){
            item=this.checkForChildRuleValidation(item);
          }
          else{
            item.isValidRule=this.checkForData(item);
          }
        }
      }
    }
    return rule;
  }
  private checkForData(rule:RuleModel){
    if(rule){
      if(rule.field && rule.operator && rule.value){
        return true;
      }
      else{
        return false;
      }
    }
  }
  createQueryParams(){
    let queryParamsModel:QueryParamsModel=new QueryParamsModel();
    let fields=[];
    let fieldModel:FieldModel=null;
    fieldModel=new FieldModel();
    fieldModel.label="Select";
    fieldModel.value="-1";
    fieldModel.data=new FieldDetailsModel(null,null,null,null,null);
    fields.push(fieldModel);
    fieldModel=new FieldModel();
    fieldModel.label="Region";
    fieldModel.value="1";
    fieldModel.data=new FieldDetailsModel("Region",ControlTypes.SINGLE_SELECT,this.getOperators(ControlTypes.SINGLE_SELECT),this.getValues("Region"),null);
    fields.push(fieldModel);
    fieldModel=new FieldModel();
    fieldModel.label="Country";
    fieldModel.value="2";
    fieldModel.data=new FieldDetailsModel("Country",ControlTypes.MULTI_SELECT,this.getOperators(ControlTypes.MULTI_SELECT),this.getValues("Country"),null);
    fields.push(fieldModel);
    fieldModel=new FieldModel();
    fieldModel.label="City";
    fieldModel.value="3";
    fieldModel.data=new FieldDetailsModel("City",ControlTypes.MULTI_SELECT,this.getOperators(ControlTypes.MULTI_SELECT),this.getValues("City"),null);
    fields.push(fieldModel);
    queryParamsModel.fields=fields;
    return queryParamsModel;
  }
  getOperators(controlType){
    let operator:OperatorModel=null;
    let list=[];
    operator=new OperatorModel("-1","Select");
    list.push(operator);
    if(controlType==ControlTypes.AUTO_COMPLETE ||controlType==ControlTypes.SINGLE_SELECT||controlType==ControlTypes.TEXT_BOX){
      operator=new OperatorModel("1","=");
      list.push(operator);
      operator=new OperatorModel("2","!=");
      list.push(operator);
      operator=new OperatorModel("3",">");
      //list.push(operator);
      operator=new OperatorModel("4","<");
      //list.push(operator);
    }
    else if(controlType==ControlTypes.MULTI_SELECT){
      operator=new OperatorModel("5","in");
      list.push(operator);
      operator=new OperatorModel("6","not in");
      list.push(operator);
    }
    return list;
  }
  getValues(fieldName){
    let operator:DataModel=null;
    let list=[];
    operator=new DataModel("-1","Select");
    list.push(operator);
    if(fieldName=="Region"){
      operator=new DataModel("1","APAC");
      list.push(operator);
      operator=new DataModel("2","EMEA");
      list.push(operator);
      operator=new DataModel("3","NAM");
      list.push(operator);
      operator=new DataModel("4","LTAM");
      list.push(operator);
    }
    else if(fieldName=="Country"){
      operator=new DataModel("5","Afghanistan");
      list.push(operator);
      operator=new DataModel("6","Bangladesh");
      list.push(operator);
      operator=new DataModel("7","India");
      list.push(operator);
      operator=new DataModel("8","Belgium");
      list.push(operator);
      operator=new DataModel("9","Algeria");
      list.push(operator);
      operator=new DataModel("10","Australia");
      list.push(operator);
      operator=new DataModel("8","Brazil");
      list.push(operator);
      operator=new DataModel("9","United States");
      list.push(operator);
      operator=new DataModel("10","Japan");
      list.push(operator);
    }
    else if(fieldName=="City"){
      operator=new DataModel("11","Ashkasham");
      list.push(operator);
      operator=new DataModel("12","Rajbari");
      list.push(operator);
      operator=new DataModel("13","Delhi");
      list.push(operator);
      operator=new DataModel("14","Brusells");
      list.push(operator);
      operator=new DataModel("15","Reggane");
      list.push(operator);
      operator=new DataModel("16","Wellington");
      list.push(operator);
      operator=new DataModel("17","Araruama");
      list.push(operator);
      operator=new DataModel("18","Tampa");
      list.push(operator);
      operator=new DataModel("19","Tokyo");
      list.push(operator);
    }
    return list;
  }
}
