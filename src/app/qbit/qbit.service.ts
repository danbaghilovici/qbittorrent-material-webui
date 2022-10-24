import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QbitService {

  constructor(private readonly http:HttpClient) { }

  public fetchVersion():Observable<string>{
    return of("");
  }

}
