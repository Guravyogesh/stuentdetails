import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { 


  
  }
  
  postData(data:any){
    return this.http.post<any>("http://localhost:3004/posts",data).pipe(map((res:any)=>{
     return res;
  }))

}
  
  getData(page: number){
    return this.http.get<any>("http://localhost:3004/posts"+ '?page=' + page).pipe(map((res:any)=>{
     return res;
  }))
  
}

updateData(data:any,id:number){
  return this.http.put<any>("http://localhost:3004/posts/"+id,data).pipe(map((res:any)=>{
   return res;
}))
}

deleteData(id:number){
  return this.http.delete<any>("http://localhost:3004/posts/"+id).pipe(map((res:any)=>{
   return res;
}))
}
}
