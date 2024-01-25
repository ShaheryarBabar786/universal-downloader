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

  getVideoDetails(videoURL: string): Observable<any> {
    return this.http.get(`${this.url}videoDetails`, { params: { videoURL } });
  }

  downloadVideo(videoURL: string, itag: string): Observable<Blob> {
    return this.http.get(`${this.url}download`, {
      params: { videoURL, itag },
      responseType: "blob",
    });
  }
}
