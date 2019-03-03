export class RuleModel {
    public isGroup:Boolean;
    public condition:String;
    public rules:Array<RuleModel>;
    public isValidGroup:Boolean;
    public field:any;
    public operator:any;
    public operators:Array<any>;
    public value:any;
    public valueData:any;
    public isValidRule:Boolean;
}
export class QueryParamsModel {
    public fields:Array<FieldModel>;
}
export class FieldModel {
    public value:any;
    public label:any;
    public data:FieldDetailsModel;
}
export class FieldDetailsModel {
     fieldName:String;
     controlType:String;
     operators:Array<OperatorModel>;
     values:Array<DataModel>;
     apiUrl:String;
    constructor(fieldName,controlType,operators,values,apiUrl){
        this.apiUrl=apiUrl;
        this.controlType=controlType;
        this.fieldName=fieldName;
        this.operators=operators;
        this.values=values;
    }
}
export class OperatorModel {
     value:any;
     label:any;
    constructor(value,label){
        this.value=value;
        this.label=label;
    }
}
export class DataModel {
    value:any;
    label:any;
   constructor(value,label){
       this.value=value;
       this.label=label;
   }
}