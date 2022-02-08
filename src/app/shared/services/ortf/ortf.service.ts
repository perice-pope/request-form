import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrftDirection, OrtfFileType, OrtfRequest } from './ortf.model';

@Injectable({
  providedIn: 'root'
})
export class OrtfService {

  mockData: OrtfRequest[] = [
    {
      clientName: "Acme Corp",
      direction: OrftDirection.Incoming,
      implementationDate: new Date(),
      file: {
        filename: "File_1.dat",
        data: "",
        type: OrtfFileType.Production
      },
      status: "Complete"
    },

    {
      clientName: "ABC Health Plan",
      direction: OrftDirection.Incoming,
      implementationDate: new Date(),
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
