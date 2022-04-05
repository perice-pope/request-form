import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { Observable, startWith, map } from "rxjs";
import { OrtfRequest } from "./shared/services/ortf/ortf.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "ORTF-UI";

  selectedClient: number;

  clients = [
    { id: 1, name: "hey" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
    { id: 4, name: "Client 4" },
    { id: 1, name: "Client 1" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
    { id: 4, name: "Client 4" },
    { id: 1, name: "Client 1" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
    { id: 4, name: "Client 4" },
  ];

  @ViewChild("fileInput") fileInput: ElementRef;
  fileAttr = "Choose File";
  clientForm!: FormGroup;

  existingRequests: OrtfRequest[] = [];
  existingRequestsCopy: OrtfRequest[] = [];

  displayedColumns: string[] = [
    "clientName",
    "name",
    "implementationDate",
    "filename",
    "type",
    "status",
    "lastModUser",
    "lastModDate",
    "open",
  ];
  filteredOptions: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.clientForm = new FormGroup({
      clientName: new FormControl("", [Validators.required]),
      ortfDirection: new FormControl("", [Validators.required]),
      implementationDate: new FormControl("", [Validators.required]),
      ortfFileType: new FormControl("", [Validators.required]),
      ortfFile: new FormControl("", [Validators.required]),
    });

    this.filteredOptions = this.clientForm.get("clientName")!.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  addRequest(event: Event) {
    
    const { ortfFile, ortfFileType, implementationDate, ...newRecord } = this.clientForm.value;
    newRecord.status = 'Incomplete';
    newRecord.implementationDate = implementationDate.toISOString().slice(0, 10);
    newRecord.file = {
      filename: ortfFile.split("\\").slice(-1)[0],
      data: "",
      type: ortfFileType,
    };
    this.existingRequests = [newRecord, ...this.existingRequests];
    this.existingRequestsCopy = this.existingRequests;

    this.clientForm.reset();
  }

  handleOrtfStatusFilter = (event: MatRadioChange) => {
    this.existingRequests = this.existingRequestsCopy.filter(item => item.status === event.value);
  }

  uploadFileEvt(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files && files[0]) {
      this.fileAttr = "";
      Array.from(files).forEach((file: File) => {
        this.fileAttr += file.name + " - ";
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = "Choose File";
    }
  }

  private _filter(value: string): any[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.clients.filter((client) =>
        client.name.toLowerCase().includes(filterValue)
      );
    }
    return [];
  }
}
