import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  downloadEnglishPDF() {
    window.open('assets/report/ViksitCGEnglish.pdf', '_blank');
  }

  downloadHindiPDF() {
    window.open('assets/report/ViksitCGHindi.pdf', '_blank');
  }

}
