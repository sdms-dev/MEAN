import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

let httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpService {
  response = [];

  constructor(private http: HttpClient) {};

  baseUrl: string = "http://localhost:3000/api";

  getData(url: string): Observable<object[]> {
    return this.http.get<object[]>(this.baseUrl + url).pipe(
      tap((_) => console.log("fetched data")),
      catchError(this.handleError<object[]>("Get data", []))
    );
  }

  postData(url: string, formData: any): Observable<object[]> {
    // return this.http.post<object[]>(url, JSON.stringify(formData))
    return this.http.post<object[]>(this.baseUrl + url, formData).pipe(
      tap((_) => console.log("add data")),
      catchError(this.handleError<object[]>("add data", []))
    );
  }

  putData(url: string, formData: any): Observable<object[]> {
    return this.http.patch<object[]>(this.baseUrl + url, formData).pipe(
      tap((_) => console.log("update data")),
      catchError(this.handleError<object[]>("update data", []))
    );
  }

  deleteData(url: string): Observable<object[]> {
    return this.http.delete<object[]>(this.baseUrl + url).pipe(
      tap((_) => console.log("delete data")),
      catchError(this.handleError<object[]>("delete data", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
