import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { YtServiceService } from "../services/yt-service.service";
import { environment } from "src/environments/environment";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showDownloadOptions: boolean = true;

  downloadLinks: { quality: string; url: string }[] = [];

  //MODEL FUNCTIONS START HERE
  model = {
    left: true,
    middle: false,
    right: false,
  };
  url = environment.url;

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    calendar: NgbCalendar,
    private ytDownloadService: YtServiceService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }
  open(content, type) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  //MODEL FUNCTIONS END HERE
  //COMMON FUNCTIONS START
  ngOnInit() {}
  resetInputAndRefresh() {
    this.videoURL = "";
    this.videoDetails = "";
    this.showDownloadOptions = false;
  }
  //COMMON FUNCTIONS HERE
  //---------------------------------Facebook downloader start here--------------------------------------
  // ALL SET OF FUNCTIONS FOR THE FACEBOOK DOWNLOADER

  downloadFacebookVideo(url: string) {
    this.ytDownloadService.downloadFacebookVideo({ url: url }).subscribe(
      (response: any) => {
        if (response && response.resAkhir) {
          this.downloadLinks = response.resAkhir;
        } else {
          console.error("No download links found in response");
          this.downloadLinks = [];
        }
      },
      (error) => {
        console.error("Error downloading Facebook video:", error);
        this.downloadLinks = [];
      }
    );
  }
  downloadVideo(url: string) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "";
    anchor.click();
  }
  getQualityDisplayName(quality: string): string {
    if (quality.includes("HD")) {
      return "DOWNLOAD IN HD QUALITY ";
    } else if (quality.includes("NORMAL")) {
      return "SD";
    } else if (quality.includes("AUDIO")) {
      return "Audio";
    } else {
      return quality; // Fallback if no specific match
    }
  }

  // FACEBOOK DOWNLOADER FUNCTIONS ENDED HERE

  //---------------------------------Facebook downloader end here--------------------------------------

  //--------------------------------youtube downloader start here--------------------------------------

  // ALL SET OF FUNCTIONS FOR THE YOUTUBE DOWNLOADER
  selectedAudioQuality: string = "128";
  selectedResolution: string = "";
  videoURL: string = "";
  videoDetails: any = null;
  focus;
  focus1;
  fromDate: NgbDate;
  toDate: NgbDate;
  closeResult: string;
  selectedFormat: string = "mp4";
  selectedfacebookFormat: string = "mp4";
  selectedinstagramFormat: string = "mp4";
  selectedtiktokFormat: string = "mp4";
  setSelectedFormat(format: string) {
    this.selectedFormat = format;
  }
  onFormatChange(event: any) {
    this.selectedFormat = event.target.value;
  }

  downloadMP3() {
    if (!this.videoDetails) {
      console.error("Video details are not available for MP3 download.");
      return;
    }

    const encodedVideoURL = encodeURIComponent(this.videoURL);
    const audioQuality = this.selectedAudioQuality;

    this.ytDownloadService
      .downloadAudio(encodedVideoURL, audioQuality)
      .subscribe(
        (blob) => this.downloadBlob(blob, `${this.videoDetails.title}.mp3`),
        (error) => console.error("Error downloading MP3:", error)
      );
  }
  downloadMP4() {
    if (!this.videoDetails || !this.videoDetails.availableFormats) {
      console.error("Video details are not available for MP4 download.");
      return;
    }

    const selectedItag = Number(this.selectedResolution);
    const selectedFormat = this.videoDetails.availableFormats.find(
      (f) => f.itag === selectedItag
    );

    if (!selectedFormat) {
      console.error("Selected format for MP4 is not available.");
      return;
    }

    const encodedVideoURL = encodeURIComponent(this.videoURL);

    this.ytDownloadService
      .downloadVideo(encodedVideoURL, selectedFormat.itag)
      .subscribe(
        (blob) => this.downloadBlob(blob, `${this.videoDetails.title}.mp4`),
        (error) => console.error("Error downloading MP4:", error)
      );
  }
  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  fetchVideoDetails() {
    if (!this.videoURL) {
      console.error("Please enter a valid YouTube URL.");
      return;
    }
    this.ytDownloadService.getVideoDetails(this.videoURL).subscribe(
      (details) => {
        console.log("Full response from backend:", details);
        this.videoDetails = details;
        console.log(
          "Available formats after setting videoDetails:",
          this.videoDetails.availableFormats
        );
        console.log("Received videoDetails:", this.videoDetails);
        this.cd.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.error("Error fetching video details:", error);
      }
    );
  }
  formatDuration(durationInSeconds: number): string {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }
  // YOUTUBE DOWNLOADER FUNCTIONS ENDED HERE

  //--------------------------------youtube downloader end here--------------------------------------
}
