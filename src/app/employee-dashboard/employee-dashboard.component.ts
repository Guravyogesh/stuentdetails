import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',

  providers: [ApiService],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeModelObj: EmployeeModel = new EmployeeModel();

  formValue !: FormGroup;
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  submitted = false;
  showUpdateTitle!: boolean;
  showAddTitle!: boolean;
  p: number = 1;
  total: number = 0;
  values=[];
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.formValue = this.formBuilder.group({
      studentName: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      courseName: ['', Validators.required],
      departmentName: ['', Validators.required],
      hobbies: ['', Validators.required],

    })
    this.getAllEmployee();
    
  }
  courseList = [
    { value: '1', name: 'MCA' },
    { value: '2', name: 'CSE' },
    { value: '3', name: 'BSC' },
    { value: '4', name: 'BCA' },
  ];
  departmentList = [
    { value: '1', name: 'Master Of Computer Application' },
    { value: '2', name: 'Computer Science of Engg.' },
    { value: '3', name: 'Bachelor Of Computer Science' },
    { value: '4', name: 'Bachelor Of Computer Application' },
  ];
  checkboxes = [
    { value: '1', name: 'Music' },
    { value: '2', name: 'Chess' },
    { value: '3', name: 'Carrom' },
    { value: '4', name: 'Coading' },
  ];

  addButtonClickFunction() {
    this.formValue.reset();
    this.showUpdate = false;
    this.showAdd = true;

    this.showUpdateTitle = false;
    this.showAddTitle = true;
  }
  dropdownList = [];
  selectedItems = [];
  dropdownSettings!: IDropdownSettings;
  ngOnInit(): void {
    this.checkboxes = [
      { value: '1', name: 'Music' },
      { value: '2', name: 'Chess' },
      { value: '3', name: 'Carrom' },
      { value: '4', name: 'Coading' },
    ]; 
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,      
    };
  }
  onItemSelect(item: any) {  
    console.log(item);   
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  postEmployeeDetails() {
    debugger
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }
    //alert("fucntion call");   
    this.onItemSelect;
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.studentName = this.formValue.value.studentName;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.courseName = this.formValue.value.courseName;
    this.employeeModelObj.departmentName = this.formValue.value.departmentName;
    this.employeeModelObj.hobbies = this.formValue.value.hobbies;   
    let cancel = document.getElementById("cancel");
    this.api.postData(this.employeeModelObj).subscribe(a => {
      debugger
      console.log(a);
      alert("Record inserted successfully");
      cancel?.click(); this.formValue.reset();
      this.getAllEmployee();
    })
  }
  get f() { return this.formValue.controls; }
  //  get f(): { [key: string]: AbstractControl } {
  //   return this.formValue.controls;
  // }
  getAllEmployee() {
    this.api.getData(this.p).subscribe(a => {
      this.employeeData = a;
      this.total = a.total;
    })

  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllEmployee();
  }
  deleteEmployee(row: any) {

    this.api.deleteData(row.id).subscribe(a => {
      alert("Record Deleted Succesfully");
      this.getAllEmployee();
    })

  }
  updateEmployee(row: any) {
    this.showUpdate = true;
    this.showAdd = false;

    this.showUpdateTitle = true;
    this.showAddTitle = false;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['studentName'].setValue(row.studentName);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['courseName'].setValue(row.courseName);
    this.formValue.controls['departmentName'].setValue(row.departmentName);
    this.formValue.controls['hobbies'].setValue(row.hobbies);

  }

  updateEmployeeDetails() {
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }
    this.employeeModelObj.studentName = this.formValue.value.studentName;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.courseName = this.formValue.value.courseName;
    this.employeeModelObj.departmentName = this.formValue.value.departmentName;
    this.employeeModelObj.hobbies = this.formValue.value.hobbies;
    this.api.updateData(this.employeeModelObj, this.employeeModelObj.id).subscribe(a => {
      alert("Record updated Succesfully");

      let cancel = document.getElementById("cancel");

      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
