import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import  {SampleData} from '../model/sample-data'

@Injectable({
  providedIn: 'root'
})
export class GoRestService {

  header:HttpHeaders = new HttpHeaders({'Content-Type':'application/json;charset=utf-8'});
  
  constructor(private apiService:ApiService) { }

  public getData():Observable<SampleData>{
    return this.apiService.get('/users',this.header).pipe(map(data => data));
  }
}
