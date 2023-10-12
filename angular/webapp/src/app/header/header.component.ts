import { Component } from '@angular/core';
import { SidenavbarService } from '../Services/sidenavbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  opened?: boolean;
  avatar: string = "AM";

  constructor(private sideNavbarService: SidenavbarService) {

  }

  clickMenu() { 
    this.sideNavbarService.toggle();
  }
}
