import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  // sideBarOpen = true;
  // sideBarOpen=false;
  sideBarOpen;
  isSmallMobileDevice: MediaQueryList = window.matchMedia("(max-width: 599px)")
  
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    console.log('a',this.isSmallMobileDevice.matches);
    if (!this.isSmallMobileDevice.matches) {
      this.sideBarOpen = true;

    }
    else{
      this.sideBarOpen = false;

    }
  }

  ngOnInit() {
    // this.a=window.matchMedia("(max-width: 700px)");
   

  }

  switchMode(isDarkMode: boolean) {
    const hostClass = isDarkMode ? "theme-dark" : "theme-light";
    localStorage.setItem('theme',hostClass);
    let theme_local=localStorage.getItem('theme');
    this.renderer.setAttribute(this.document.body, "class", theme_local);
    // this.isDark = isDarkMode;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
