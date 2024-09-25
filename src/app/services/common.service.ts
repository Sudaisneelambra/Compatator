import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) {}



  api= 'https://testing.competitivecracker.com/api/v1/user'


  login(body:any):Observable<any>{
    return this.http.post(`${this.api}/login`, body)
  }

  register(body:any):Observable<any>{
    return this.http.post(`${this.api}/register`, body)
  }


  getCoursesAll(body:any):Observable<any> {
    return this.http.post(`${this.api}/courses`,body)
  }


  boolean = new BehaviorSubject(false)

}
