import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class YtServiceService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  // facebook service start

  downloadFacebookVideo(data: { url: string }): Observable<any> {
    return this.http
      .post(`${this.url}fbDownloader`, data, {
        observe: "response",
        responseType: "text",
      })
      .pipe(
        map((response: HttpResponse<string>) => {
          let responseBody = response.body;
          if (responseBody) {
            try {
              responseBody = JSON.parse(responseBody);
            } catch (error) {
              console.error("Error parsing response body:", error);
              responseBody = null;
            }
          }
          return responseBody;
        })
      );
  }
  // facebook service end

  // youtube services start

  getVideoDetails(videoURL: string): Observable<any> {
    return this.http.get(`${this.url}videoDetails`, { params: { videoURL } });
  }

  downloadVideo(videoURL: string, itag: string): Observable<Blob> {
    return this.http.get(`${this.url}download`, {
      params: { videoURL, itag },
      responseType: "blob",
    });
  }

  downloadAudio(videoURL: string, audioQuality: string): Observable<Blob> {
    return this.http.get(`${this.url}downloadmp3`, {
      params: { videoURL, audioQuality },
      responseType: "blob",
    });
  }

  // youtube services end
}
