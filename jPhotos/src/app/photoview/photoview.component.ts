import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.css']
})
export class PhotoviewComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  
  selectedFile: File = {} as File;
  retreivedImage: any;
  retreivedResponse: any;
  base64Data: any;
  message: String = "";
  imageName : any;

  ngOnInit(): void {
  }

  // called when the user selects an image
  public onFileChanged(event:any){
    this.selectedFile = event.target.files[0];      //  selected file
  }
  // called when the user clicks the submit button to upload the image 
  onUpload(){
    console.log(this.selectedFile);

    //FormData API -> provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // call the springboot application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' }).subscribe((response) => {
      if(response.status === 200){
        this.message = "Image uploaded successfully";
      } else {
        this.message = "Upload unsuccessful";
      }
    });
  }
  // called when user clicks the retreive image button to get the image 
  getImage(){
    // make call to spring to get the image bytes
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName).subscribe(
      res => {
        this.retreivedResponse = res;
        this.base64Data = this.retreivedResponse.picByte;
        this.retreivedImage = 'data:image/jpeg;base64' + this.base64Data;    // response we get from the spring
      }
    );
  }
}
