import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataModel, FieldDetailsModel } from '../../models/all-models';
import { ControlTypes } from '../../constants/control-types';

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.css']
})
export class DataControlsComponent implements OnInit {
  @Input() data:FieldDetailsModel;
  @Output() onItemsSelected:EventEmitter<any>=new EventEmitter<any>();
  public isTextBox:Boolean=false;
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
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
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
        console.log(this.dropDownData);
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
  }
  onItemChange(event){
    //this.onItemsSelected.emit(this.selectedItems);
  }
}
