import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { Image } from './model/image';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jPhotos';

  images : Array<Image> = []


  constructor(private apiManagerService: DataServiceService) {}

  ngOnInit() {
    this.getImages();
  }

   //gets the images
   getImages() {
    this.apiManagerService.getImages().subscribe(
      (response: Image[]) => {
        this.images = response;
        console.log(this.images);
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  

   
}
