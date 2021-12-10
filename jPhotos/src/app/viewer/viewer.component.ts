import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../model/image';
import { DataServiceService } from '../data-service.service';
// import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  images: Image[] = []
  imagesData: any;
  message : String = "";
  img: Image = new Image();
  // deleteImage = new Image();

  constructor(private apiManagerService: DataServiceService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    // for search
    // this.route.params.subscribe(
    //   params => {
    //   if(params.searchTerm) {
    //     this.images = this.apiManagerService.getImages(); 
    //   }
    // })

    this.getImages();
    // this.apiManagerService.getImages().subscribe(
    //   (imageResponse: any) => {
    //     this.imagesData = imageResponse;
    //     this.imgageAdded.emit(this.image);
    //   }, (error: { error : {message : any; }; }) => {
    //     console.log(error);
    // });
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

  // deletes the pic
  deletePic(id: number): void {
    this.apiManagerService.deleteImage(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getImages();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  imgInfo(name: any){
    alert("Image Clicked\n" + name);
  }
}
