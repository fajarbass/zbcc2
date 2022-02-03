import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor
  (
    private http: HttpClient
  ) { }


  getStudentTbl()
  {
    return this.http.get<any>('assets/data/students-table-list.json');
  }

  getSchTbl()
  {
    return this.http.get<any>('assets/data/school-table-list.json');
  }

  getScList():Observable<any>
  {
    return this.http.get<any>('assets/data/school-list.json');
  }

  getCorList()
  {
    return this.http.get<any>('assets/data/corrector-list.json');
  }

  getSchCorList()
  {
    return this.http.get<any>('assets/data/school-corrector-list.json');
  }


}
