import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { YtServiceService } from '../services/yt-service.service';
import { environment } from "src/environments/environment";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  videoURL: string = '';
  model = {
    left: true,
    middle: false,
    right: false,
  };
  url =environment.url;

  focus;
  focus1;
  fromDate: NgbDate;
  toDate: NgbDate;
  closeResult: string;
  selectedFormat: string = "mp4"; 

  constructor(private modalService: NgbModal, calendar: NgbCalendar,private ytDownloadService: YtServiceService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  open(content, type) {
    this.modalService
      .open(content, { centered: true })
      .result.then(
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

  download() {
    this.ytDownloadService.downloadVideo(this.videoURL).subscribe(
      response => {
        console.log(response);
        // Handle response here, e.g., display the download link or video details
      },
      error => {
        console.error('Error downloading video:', error);
      }
    );
  }
  
}
