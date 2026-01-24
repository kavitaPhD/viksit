import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  downloadEnglishPDF() 
  {
    window.open('assets/report/ViksitCGEnglish.pdf', '_blank');
  }

  downloadHindiPDF()
  {
    window.open('assets/report/ViksitCGHindi.pdf', '_blank');
  }

}
