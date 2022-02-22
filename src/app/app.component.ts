import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrftDirection, OrtfFileType, OrtfRequest } from './shared/services/ortf/ortf.model';
import { OrtfService } from './shared/services/ortf/ortf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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

  existingRequests: OrtfRequest[];

  displayedColumns: string[] = ['clientName', 'name', 'filename', 'type', 'status', 'lastModUser', 'lastModDate', 'open'];

  constructor(
    private orftService: OrtfService
  ) { }

  ngOnInit() {
    this.clientForm = new FormGroup({
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
    });

    this.orftService.retrieveExistingRequests()
      .subscribe(results => this.existingRequests = results);
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

  handleCreate() {

    let request: OrtfRequest = {
      clientName: "Bharath",
      direction: OrftDirection.Incoming,
      implementationDate: new Date(),
      file: {
        filename: "SampleFile.dat",
        data: "sdf",
        type: OrtfFileType.Lag
      },
      status: "In Step 3"
    }

    this.orftService.createRequest(request)
      .subscribe(result => {
        // For now just console.log the result
        console.log(result);
      })
  }
}
