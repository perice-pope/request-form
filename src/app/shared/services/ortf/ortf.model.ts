export interface OrtfRequest {
    clientName: string;
    direction: OrftDirection;
    implementationDate: Date;
    file: OrtfFile;
    status: string;
}

export enum OrftDirection {
    Incoming = "Incoming",
    Outgoing = "Outgoing"
}

export interface OrtfFile {
    filename: string;
    data: string;
    type: OrtfFileType;
}

export enum OrtfFileType {
    Test = "Test",
    Production = "Production",
    Lag = "Lag"
}