import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data-service.service';
import { Image } from '../model/image';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  images: Array<Image> = []
  base64textString: any;
  fileName: any;
  imagesData: any;
  message : String = "";
  searchTerm :String = "";

  @Input()
  img: Image = new Image();
  
  @Output()
  imgAdded = new EventEmitter<Image>();
  
  constructor(
    private apiManagerService: DataServiceService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // for search
    this.activatedRoute.params.subscribe(params => {
      if (params.searchTerm)
        this.searchTerm = params.searchTerm;
    })
  }

  /*
  uploads image to the database via springboot 
  */
  save(images: any): any {
    for (let i = 0; i < images.files.length; i++) {
      this.onUploadChange(images.files[i]);
      setTimeout(() => {
        const imageData = {
          name: this.fileName,
          picByte: this.base64textString
        };
        console.log(imageData);

        // call the springboot application to save the image
        this.apiManagerService.addImages(imageData).subscribe(
          (imageResponse: any) => {
            console.log(imageResponse);
            // if there is no internal server error
            if (imageResponse.status === 500) {
              alert("uploaded unsuccessfully")
            } else {
              alert("Upload successful")
            }
            // this.images = imageResponse;
            this.imgAdded.emit();
          }, 
          (error: HttpErrorResponse) => {
            console.log(error);
          });
      }, 500);
    }
  }
  onUploadChange(file: any): any {
    if (file) {
      const reader = new FileReader();
      this.fileName = file.name;
      console.log(this.fileName);
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  handleReaderLoaded(e: any): any {
    this.base64textString = btoa(e.target.result);
    //console.log(this.base64textString);
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


  search(name: string) {
    const resArr: Image[] = [];

    // loop thorugh the res
    for (const image of this.images) {
      // if there is a match between any elements push to to resArr
      if (image.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1) 
      {
        resArr.push(image);
      }
    }
    this.images = resArr;

    if (resArr.length === 0 || !name) {
      this.getImages();
    }
  }


}
