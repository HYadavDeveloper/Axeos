import { StructuredListModule, ToggleModule } from 'carbon-components-angular';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpService } from '../services/httpService.service';
import { UserAuthService } from '../services/tokenAuth.service';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css'],
  standalone: true,
  imports: [StructuredListModule, FormsModule, CommonModule, ToggleModule],
  providers: [UserAuthService],
})
export class SwitchesComponent implements OnInit {
  data: any;
  description: any;

  constructor(private http: httpService) {}
  ngOnInit() {
    this.listswitches();
  }

  //will get  switch list
  listswitches() {
    this.http.get(`pbx/v1/switches`).subscribe((data) => {
      this.data = data;
      this.description = data;
    });
  }

  //function which is bind with the event of switch change
  openModel(i: number, idata: any) {
    this.data[i].value = !this.data[i].value;
    this.PostSwitchesCall(idata, i);
  }

  //send value true of false of switch
  PostSwitchesCall(data: any, index: number) {
    this.http
      .post(`pbx/v1/switches/${data.uuid}`, { value: data.value })
      .subscribe((response) => {
        if (response) {
          this.getSwitchesDetail(data.uuid, index);
        }
      });
  }

  //get details of particular switch
  getSwitchesDetail(uuid: string, index: number) {
    this.http.get(`pbx/v1/switches/${uuid}`).subscribe((data) => {
      this.data[index] = data;
      this.description[index] = data;
    });
  }
}
