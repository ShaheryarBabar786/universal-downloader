import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class YtServiceService {
  url = environment.url;

  constructor(private http: HttpClient) {}
  downloadVideo(videoURL: string): Observable<any> {
    return this.http.get(`${this.url}download`, {
      params: { videoURL },
    });
  }

  // in the case of direct download

  // downloadVideo(videoURL: string): Observable<Blob> {
  //   return this.http.get(`${this.url}download`, {
  //     params: { videoURL },

  //     responseType: "blob",
  //   });
  // }
}
