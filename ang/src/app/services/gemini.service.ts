import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  unsafemapUrl!: string;
  public unsafemapindicatorUrl: any = [];
  mapUrl!: SafeResourceUrl;
  indicatorUrl!: SafeResourceUrl;

  private generativeAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private sanitizer: DomSanitizer) {
    this.generativeAI = new GoogleGenerativeAI('AIzaSyBevlzzGlPeAM42SyYzFPHhJWtqyE96P3c')
  }

  async generateText(prompt: string) {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-1.5-pro-002' });
    this.messageHistory.next
      ({
        from: 'user',
        messsage: prompt

      });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    this.messageHistory.next(
      {
        from: 'bot',
        messsage: text
      }
    )
  }

  public getMessageHistory(): Observable<any>
  {
    return this.messageHistory.asObservable();
  }

} 
