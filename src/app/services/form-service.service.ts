import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private http:HttpClient) { }

  api = 'http://localhost:3000/users'

  formPost(data:any):Observable<any>{
    return this.http.post(this.api,data)
  }

  detailesGet():Observable<any>{
    return this.http.get(this.api)
  }

  deleteUser(id:string):Observable<any>{    
    return this.http.delete(`${this.api}/${id}`)
  }
}
