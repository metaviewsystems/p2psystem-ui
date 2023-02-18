import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Violation {
  pkId: number;
  clientId: number;
  licenseState: string;
  licenseNumber: string;
  violationdate: string;
  locationId: string;
  location: string;
  gpsLat: number;
  gpsLong: number;
  postedSpeed: number;
  thresholdSpeed: number;
  totalDistanceTravelled: number;
  totalTimeTaken: number;
  metricUnitSystem: string;
  systemId: string;
  imageUID: string;
  vehicleSpeed: number;
  imageA: string;
  imageB: string;
  medias: Media[];
}

export interface Media {
  imageId: string;
  status: number;
}

export interface Response {
  success: boolean;
  violation: Violation[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  endPoint = environment.api;
  constructor(private httpClient: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  // get api
  getViolations(): Observable<Violation> {
    return this.httpClient
      .get<Violation>(this.endPoint + '/api/violation')
      .pipe(retry(1), catchError(this.httpError));
  }

  httpError(error) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

  // get api
  getViolationDetails(pkId: number): Observable<Violation> {
    return this.httpClient
      .get<Violation>(this.endPoint + '/api/violation/' + pkId)
      .pipe(retry(1), catchError(this.httpError));
  }
}
