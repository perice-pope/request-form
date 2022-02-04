import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ORTF-UI';

  selectedClient: number;

  clients = [
      { id: 1, name: 'Client 1' },
      { id: 2, name: 'Client 2' },
      { id: 3, name: 'Client 3' },
      { id: 4, name: 'Client 4' },
  ];

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  clientForm!: FormGroup

  ngOnInit() {
    this.clientForm  = new FormGroup({
      ortfClient: new FormControl('', [
        Validators.required,
      ]),
      ortfDirection: new FormControl('', [
        Validators.required,
      ]),
      ortfFileType: new FormControl('', [
        Validators.required,
      ]),
      ortfFile: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  addRequest(event: Event) {
    console.log('submitted values==>>', this.clientForm.value);
  }

  uploadFileEvt(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files && files[0]) {
      this.fileAttr = '';
      Array.from(files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
