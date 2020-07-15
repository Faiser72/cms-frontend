import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUserAvatar;
  currentUserName;
  constructor() { }

  ngOnInit() {
  }

  /* for submenu Start here... */
  // showSubmenu: boolean = false;
  // showCompaniesSubmenu: boolean = false;
  // showCandidatesSubmenu: boolean = false;

  // toggleSubmenu(submenu: string) {
  //   let element = document.getElementById(submenu);
  //   if (element.style.display == '' || element.style.display == 'none') {
  //     element.style.display = 'block';
  //   }
  //   else {
  //     element.style.display = 'none';
  //   }
  // }
  /* Ends here. */

}
