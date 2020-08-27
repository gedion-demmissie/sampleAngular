import { Component, OnInit } from '@angular/core';
import {Data} from '../model/sample-data'
import {GoRestService} from  '../service/go-rest.service'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  
  sampleDataResult:Data[];
  filteredsampleDataResult:Data[];
  toggleSorting:boolean = true;


  constructor(private goRestService:GoRestService) { }

  ngOnInit(): void {
     this.goRestService.getData().subscribe(result =>{
           this.sampleDataResult = result?.data;
           this.filteredsampleDataResult = this.sampleDataResult;
     })
  }

  public sortByName(e){
    if(this.toggleSorting){
      this.filteredsampleDataResult.sort((x,y) => x.name.localeCompare(y.name));   
    }
    else{
      this.filteredsampleDataResult.sort((x,y) => y.name.localeCompare(x.name));   
    }
    this.toggleSorting = !this.toggleSorting;   
  }

  public filterData(event: any) {
    let searchString = event.target.value;
    if (searchString && searchString.length) {
      let searchTerm = searchString?.trim()?.toLocaleLowerCase();
      if (searchTerm && searchTerm.length) {
        this.filteredsampleDataResult = this.sampleDataResult.filter(x => this.isSelectable(searchTerm, x));
      }
      else {
        this.filteredsampleDataResult = this.sampleDataResult;
      }

    }
    else {
      this.filteredsampleDataResult = this.sampleDataResult;
    }
  }

  isSelectable(searchTerm: string, data: Data): boolean {

    let isSelectable = data.name.toLowerCase().includes(searchTerm) ||
                       data.id.toString().toLowerCase().includes(searchTerm) ||
                       data.email.toLowerCase().includes(searchTerm);

    return isSelectable;
  }

}
