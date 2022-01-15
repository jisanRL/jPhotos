import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../model/image';
import { DataServiceService } from '../service/data-service.service';
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
  viewImage: Image = new Image()
  selectedImage: Image = new Image();
  searchTerm:String = "";
  action: string='';

  constructor(private apiManagerService: DataServiceService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.getImages();
    this.refreshData();
  }
  
  refreshData(){
    // gets the books from the database
    this.apiManagerService.getImages().subscribe(
     response => this.handleSuccessfulResponse(response)
   );
   // go the the addbook paramater in the same page and get that component
   this.route.queryParams.subscribe(
     (params) => {
       this.action = params['action'];

       const selectedImageID = params['id'];
       if(selectedImageID) {
         this.selectedImage = this.images.find(image => image.id === +selectedImageID)!;
       }
     }
   );
  }
  handleSuccessfulResponse(response:any) {
    this.images = response;
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
  // updates the image
  onUpdateImage(image:Image):void {
    this.apiManagerService.updateImage(image).subscribe(
      (response: Image) => {
        console.log(response);
        this.getImages();
      }, 
      // error response
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
  // opens the forms for adding and editing the employee
  onOpenModal(image: Image, mode: String): void {
    const container = document.getElementById('main-container');
    const button  = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';      // hides the button
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'view') {
      this.viewImage = image;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    
    container?.appendChild(button);
    button.click();       // this will open the appropirate modal
  }

}
