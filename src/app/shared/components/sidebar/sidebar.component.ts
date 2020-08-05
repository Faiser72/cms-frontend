import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUserAvatar;
  currentUserName;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.currentUserName = this.authenticationService.getLoggedUser();
  }

  ngOnInit() {
  }

  isAdminRole() {
    if (this.authenticationService.getLoggedUserRole() === "ROLE_ADMIN")
      return true;
    else
      return false;
  }

  /* for submenu Start here... */
  showSubmenu: boolean = false;
  showCompaniesSubmenu: boolean = false;
  showCandidatesSubmenu: boolean = false;

  toggleSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }
  /* Ends here. */

}
