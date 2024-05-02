import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StructuredListModule } from 'carbon-components-angular';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { httpService } from '../services/httpService.service';

@Component({
  selector: 'app-stream-events',
  templateUrl: './stream-events.component.html',
  styleUrls: ['./stream-events.component.css'],
  standalone: true,
  imports: [StructuredListModule, FormsModule, CommonModule],
})
export class StreamEventsComponent implements OnInit {
  data: any;
  isConnected: boolean = false;
  todos: string[] = [];
  websocketUrl = 'wss://fetest.demo.axeos.cloud/apis/pbx/v1/events/ws';
  public socket$!: WebSocketSubject<any>;
  constructor(private http: httpService) {}

  ngOnInit(): void {
    this.listswitches();
  }

  listswitches() {
    this.http.get(`pbx/v1/events` + '?timeout=10').subscribe((data) => {
      this.data = data;
      this.connectWebSocket();
    });
  }

  connectWebSocket() {
    const authToken = localStorage.getItem('accessToken');
    const urlWithAuthTokenAndParams = `${
      this.websocketUrl
    }?last=${10}&limit=${10}`;
    this.socket$ = webSocket(urlWithAuthTokenAndParams);
    this.socket$.next({
      access_token: authToken,
    });
    this.socket$.subscribe(
      (message) => {
        this.isConnected = true;
        var arrTodo: string[] = [];
        if (message) {
          this.data.push(message);
        }
        this.todos = arrTodo;
      },
      (error) => console.error('WebSocket error:', error),
      () => {
        this.isConnected = false;
      }
    );
  }

  convertTime(time: any) {
    const gmtDate = new Date(time);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return gmtDate.toLocaleString('en-US', { timeZone: userTimeZone });
  }
}
