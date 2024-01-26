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
  selectedResolution: string = "";
  videoURL: string = "";
  videoDetails: any = null;
  model = {
    left: true,
    middle: false,
    right: false,
  };
  url = environment.url;

  focus;
  focus1;
  fromDate: NgbDate;
  toDate: NgbDate;
  closeResult: string;
  selectedFormat: string = "mp4";

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

  setSelectedFormat(format: string) {
    this.selectedFormat = format;
  }
  onFormatChange(event: any) {
    this.selectedFormat = event.target.value;
  }

  ngOnInit() {}
  // download() {
  //   console.log("Selected Resolution:", this.selectedResolution);
  //   console.log("Video Details:", this.videoDetails);
  //   if (!this.videoDetails || !this.videoDetails.availableFormats) {
  //     console.error("Video details are not available.");
  //     return;
  //   }
  //   const selectedItag = Number(this.selectedResolution);
  //   const selectedFormat = this.videoDetails.availableFormats.find(
  //     (f) => f.itag === selectedItag
  //   );
  //   if (!selectedFormat) {
  //     console.error(
  //       "Selected format is not available. Check resolution selection."
  //     );
  //     return;
  //   }
  //   console.log("Selected Format:", selectedFormat);
  //   this.ytDownloadService
  //     .downloadVideo(this.videoURL, selectedFormat.itag)
  //     .subscribe(
  //       (blob) => {
  //         const url = window.URL.createObjectURL(blob); // Create a URL for the blob
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "video.mp4"; // Provide a file name
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       },
  //       (error) => {
  //         console.error("Error downloading video:", error);
  //       }
  //     );
  // }

  download() {
    if (!this.videoDetails || !this.videoDetails.availableFormats) {
      console.error("Video details are not available.");
      return;
    }
    const selectedItag = Number(this.selectedResolution);
    const selectedFormat = this.videoDetails.availableFormats.find(
      (f) => f.itag === selectedItag
    );
    if (!selectedFormat) {
      console.error(
        "Selected format is not available. Check resolution selection."
      );
      return;
    }
    console.log("Selected Format:", selectedFormat);

    // Construct the download URL using the itag of the selected format
    const downloadUrl = `${
      this.ytDownloadService.url
    }download?videoURL=${encodeURIComponent(this.videoURL)}&itag=${
      selectedFormat.itag
    }`;

    // Navigate to the URL or open it in a new window
    window.location.href = downloadUrl; // or window.open(downloadUrl, '_blank');
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
}
