import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { MessageService } from './message/message.service';
// interface
import { IntApplicants} from './applicants.interface';
// class
import { Applicants } from './applicants';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  private baseUrl = `http://localhost:3000`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  getApplicantsList(): Observable<IntApplicants> {
    const applicantsUrl = `${this.baseUrl}/applicants`;
    return this.http.get<IntApplicants>(applicantsUrl)
    .pipe(
      catchError(this.handleError<IntApplicants>('applicants'))
    );
  }

  getApplicant(id: number): Observable<IntApplicants> {
    const applicantsUrl = `${this.baseUrl}/applicants/${id}`;
    return this.http.get<IntApplicants>(applicantsUrl)
    .pipe(
      catchError(this.handleError<IntApplicants>('applicants'))
    );
  }

  updateApplicant(id: number, model: Applicants): Observable<Applicants> {
    const applicantsUrl = `${this.baseUrl}/applicants/${id}`;
    return this.http.put<Applicants>(applicantsUrl, model, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateApplicant', model))
    );
  }

  addApplicant(model: Applicants): Observable<Applicants> {
    const applicantsUrl = `${this.baseUrl}/applicants`;
    return this.http.post<Applicants>(applicantsUrl, model, this.httpOptions)
    .pipe(
      catchError(this.handleError('addApplicant', model))
    );
  }

  deleteApplicant(id: number): Observable<{}> {
    const applicantsUrl = `${this.baseUrl}/applicants/${id}`;
    return this.http.delete(applicantsUrl, this.httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(`An error occurred: ${error.error.message}`);
    } else {
      return throwError(`Some error occured. Please try again later. ${error}`);
    }
  }

   private log(message: string) {
    this.messageService.add(`Applicant: ${message}`);
  }
}
