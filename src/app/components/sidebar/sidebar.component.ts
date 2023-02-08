import { Component } from '@angular/core';
import { TempService } from 'src/app/temp.service';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})




export class SidebarComponent {
  constructor (public tempService: TempService) {

  }
}
