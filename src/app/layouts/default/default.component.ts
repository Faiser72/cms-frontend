import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { SpinnerService } from 'src/app/modules/service/spinner/spinner.service';
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';
import { DefaultService } from 'src/app/modules/service/default/default.service';


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
  isLoggedIn = false;
  loggedUser: string = '';
  showSpinner: boolean;
  
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private spinnerService:SpinnerService,
    private authenticationService: AuthenticationService,
    private defaultService: DefaultService
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
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.loggedUser = this.authenticationService.getLoggedUser();
      console.log("Hi, " + this.loggedUser + "! Welcome, to VHR Home.");
      this.defaultService.home().subscribe((data: any) => {
        if (data.success) {
          console.log(data);
          
          sessionStorage.setItem(this.authenticationService.SESSION_ROLE_KEY, data.object.userType.role);
        } else {
          alert("Something Went Wrong! Try again.");
          this.authenticationService.logout();
        }
      }, (error) => {
        alert("Error! - Something Went Wrong! Try again.")
        this.authenticationService.logout();
      });
    }
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
