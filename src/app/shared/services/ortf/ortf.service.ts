import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrtfDirection, OrtfFileType, OrtfRequest } from './ortf.model';

@Injectable({
  providedIn: 'root'
})
export class OrtfService {

  mockData: OrtfRequest[] = [
    {
      clientName: "Acme Corp",
      ortfDirection: OrtfDirection.Incoming,
      implementationDate: new Date().toISOString().slice(0, 10),
      file: {
        filename: "File_1.dat",
        data: "",
        type: OrtfFileType.Production
      },
      status: "Complete"
    },

    {
      clientName: "ABC Health Plan",
      ortfDirection: OrtfDirection.Incoming,
      implementationDate: new Date().toISOString().slice(0, 10),
      file: {
        filename: "SampleFile.dat",
        data: "",
        type: OrtfFileType.Lag
      },
      status: "In Step 3"
    }
  ]

  constructor() { }

  retrieveExistingRequests(): Observable<OrtfRequest[]> {
    return of(this.mockData);
  }
}
