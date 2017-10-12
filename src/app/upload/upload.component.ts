import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  name: string;
  myFile: File;


  constructor(private _http: Http, private httpClient: HttpClient) { }

  ngOnInit() {
  }


  fileChange(files) {
    console.log(files.target.files[0]);       // <---- logheaza corect
    this.myFile = files.target.files[0];      // <---- aici arunca : core.es5.js:1020 ERROR Error: Uncaught (in promise):
                                              // InvalidStateError: Failed to set the 'value' property on 'HTMLInputElement':
                                              // This input element accepts a filename, which may only be programmatically set to the empty string.
  };

  onSubmit(data): void {
    const formData = new FormData();
    formData.append("MyFile", this.myFile);

    console.log(data);                // NgForm {_submitted: true, ngSubmit: EventEmitter, form: FormGroup}

    const body = {
      name: this.name,
      imageData: formData
    };

    console.log(body);                // {name: "dasd", imageData: FormData}
    console.log(body.imageData);      // FormData {}

    this.httpClient.post("http://localhost:8000/api/file", formData).subscribe((response) => {console.log(response);});

  };

}
