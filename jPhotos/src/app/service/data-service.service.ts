import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {
  }

  // useless code
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
  // search images by name
  getImagesByName(name: String){
    return this.http.get<Image>('http://localhost:8080/image/get/' + name);
  }
  //add Images
  addImages(image: any) {
    return this.http.post<Image>('http://localhost:8080/image/upload/', image);
  }
  // updates the employee info
  updateImage(image: Image) {
    return this.http.put<Image>('http://localhost:8080/image/update/', image);
  }
  // delete image
  deleteImage(id: number) {
    return this.http.delete<void>('http://localhost:8080/image/delete/' + id);
  }
}
