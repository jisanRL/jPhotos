import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
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
  
  @Input()
  img: Image = new Image();
  
  @Output()
  imgAdded = new EventEmitter<Image>();

  ngOnInit(): void {
    // this.save(this.images);
    this.getImages();
  }
  constructor(private apiManagerService: DataServiceService, private router: Router, private activatedRoute: ActivatedRoute) {}

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
        this.apiManagerService.post('http://localhost:8080/image/upload', imageData).subscribe(
          (imageResponse: any) => {
            console.log(imageResponse);
            if (imageResponse.status === 200) {
              // this.message =  "Image uploaded successfully";
              alert("uploaded successfully")
            } else {
              // this.message = "Upload unsuccessful";
              alert("Upload unsuccessful")
            }
            this.images = imageResponse;
          }, 
          (error: HttpErrorResponse) => {
            console.log(error);
          });
      }, 500);
    }
  }

  // alternate method
  // save(images: any) {
  //   this.apiManagerService.addImages(images).subscribe(
  //     (response: Image) => {
  //       console.log(response);
  //       // this.
  //     }, 
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }
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

  search(name: string) {
    let input = (document.getElementById("search") as HTMLInputElement).value;

    if (input.length == 0) {
      alert("Write the name of the pic");
    } else {
      this.apiManagerService.get('http://localhost:8080/image/get/' + name).subscribe((imageResponse: any) => {
        console.log(imageResponse);
        this.imagesData = imageResponse;
        this.router.navigate(['/', 'photo'])
      }, (error: { error: { message: any; }; }) => {
        console.log(error);
      });

    }
  }

}
