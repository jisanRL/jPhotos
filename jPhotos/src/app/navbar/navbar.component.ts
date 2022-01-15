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
    let input = (document.getElementById("search") as HTMLInputElement).value;

    if (input.length == 0) {
      alert("Write the name of the pic");
    } 
    else {
      this.apiManagerService.getImagesByName(name).subscribe(
        (imageResponse: any) => {
          console.log(imageResponse);
          this.imagesData = imageResponse;
           
          localStorage.setItem("viewImage", JSON.stringify(this.imagesData));
          this.router.navigateByUrl('/search/' + this.searchTerm);
        }, (error: { error: { message: any; }; }) => {
          console.log(error);
        });
    }
  }
}
