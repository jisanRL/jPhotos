import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.css']
})
export class PhotoviewComponent implements OnInit {

  base64textString: any;
  fileName: any;
  imagesData: any;
  message : String = "";

  
  ngOnInit(): void {}

  constructor(private apiManagerService: DataServiceService) {}

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
        this.apiManagerService.post('http://localhost:8080/image/upload', imageData).subscribe((imageResponse: any) => {
          console.log(imageResponse);
          if (imageResponse.status === 200) {
            this.message =  "Image uploaded successfully";
          } else {
            this.message = "Upload unsuccessful";
          }
        }, (error: { error: { message: any; }; }) => {
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

  search(name: string) {
    this.apiManagerService.get('http://localhost:8080/image/get/' + name).subscribe((imageResponse: any) => {
      console.log(imageResponse);
      this.imagesData = imageResponse;
    }, (error: { error: { message: any; }; }) => {
      console.log(error);
    });
  }
}