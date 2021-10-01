import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Image } from './model/image';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {
  }

  public get(endpoint: any): any {
    return this.http.get(endpoint).pipe(
      catchError(this.handleError),
    );
  }

  public post(endpoint: any, data: any): any {
    return this.http.post(endpoint, data).pipe(
      catchError(this.handleError),
    );
  }

  public put(endpoint: any, data: any, id: any): any {
    return this.http.put(endpoint + '/' + id, data).pipe(
      catchError(this.handleError),
    );
  }

  public delete(endpoint: any, id: any): any {
    return this.http.delete(endpoint + '/' + id).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  // get the image
  getImages(){
    return this.http.get<Image[]>('http://localhost:8080/image/' );
  }
}
