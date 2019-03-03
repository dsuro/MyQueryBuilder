import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataModel, FieldDetailsModel, RuleModel } from '../../models/all-models';
import { ControlTypes } from '../../constants/control-types';

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.css']
})
export class DataControlsComponent implements OnInit {
  @Input() data:FieldDetailsModel;
  @Input() selectedValue:any;
  @Input() disabled:Boolean;
  @Output() onItemsSelected:EventEmitter<any>=new EventEmitter<any>();
  public isTextBox:Boolean=true;
  public isSingleSelect:Boolean=false;
  public isMultiSelect:Boolean=false;
  public isAutoComplete:Boolean=false;
  public dropDownData:Array<DataModel>;
  private controlType:String;
  private apiUrl:String;
  public placeholderText:String="Select Items";
  public selectedItems:Array<any>=null;
  public selectedItem:any=null;
  public maxLabels:Number=3;
  public isDisabled:Boolean=false;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue!=changes['data'].currentValue){
      
      this.controlType=this.data.controlType;
      if(this.controlType==ControlTypes.SINGLE_SELECT){
        this.isAutoComplete=false;
        this.isMultiSelect=false;
        this.isSingleSelect=true;
        this.isTextBox=false;
        this.dropDownData=this.data.values;
      }
      else if(this.controlType==ControlTypes.MULTI_SELECT){
        this.isAutoComplete=false;
        this.isMultiSelect=true;
        this.isSingleSelect=false;
        this.isTextBox=false;
        this.dropDownData=this.data.values;
        //console.log(this.dropDownData);
      }
      else if(this.controlType==ControlTypes.AUTO_COMPLETE){
        this.isAutoComplete=true;
        this.isMultiSelect=false;
        this.isSingleSelect=false;
        this.isTextBox=false;
        this.apiUrl=this.data.apiUrl;
      }
      else if(this.controlType==ControlTypes.TEXT_BOX){
        this.isAutoComplete=false;
        this.isMultiSelect=false;
        this.isSingleSelect=false;
        this.isTextBox=true;
      }
    }
    if(changes['selectedValue'] && changes['selectedValue'].previousValue!=changes['selectedValue'].currentValue){
      if(this.controlType==ControlTypes.SINGLE_SELECT){
       this.selectedItem=this.selectedValue;
      }
      else if(this.controlType==ControlTypes.MULTI_SELECT){
        this.selectedItems=this.selectedValue;
      }
    }
    if(changes['disabled'] && changes['disabled'].previousValue!=changes['disabled'].currentValue){
     this.isDisabled=this.disabled;
    }
  }
  onItemChange(event){
    //console.log(this.selectedItem);
    //console.log(this.selectedItems);
    if(this.controlType==ControlTypes.SINGLE_SELECT){
       this.onItemsSelected.emit(this.selectedItem);
     }
     else if(this.controlType==ControlTypes.MULTI_SELECT){
        this.onItemsSelected.emit(this.selectedItems);
     }
   
  }
}
