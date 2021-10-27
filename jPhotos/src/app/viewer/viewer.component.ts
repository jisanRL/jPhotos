import { Component, OnInit } from '@angular/core';
import { Image } from '../model/image';
import { DataServiceService } from '../data-service.service';
 

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  images: Array<Image> = []
  base64textString: any;
  fileName: any;
  imagesData: any;
  message : String = "";

  constructor(private apiManagerService: DataServiceService) {
  }

  ngOnInit(): void {
    this.apiManagerService.getImages().subscribe((imageResponse: any) => {
      this.imagesData = imageResponse;
    }, (error: { error : {message : any; }; }) => {
      console.log(error);
    });
  }

  imgInfo(){
    // alert("Image Clicked\n" + this.images);
  }
}
