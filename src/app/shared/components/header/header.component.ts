import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { MatSlideToggleChange } from "@angular/material";
import { AuthenticationService } from 'src/app/modules/service/authentication/authentication.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  one = "primary";

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {}

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }

  ngOnInit() {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  themes0() {
    this.one = "primary";
  }

  themes1() {
    this.one = "accent";
  }

  themes2() {
    this.one = "dark";
  }

  themes3() {
    this.one = "warn";
  }

  themes(): string {
    return this.one;
  }

  routeToChangePassword(){

  }

  doLogout() {
    if (this.authenticationService.logout()) {
      this.router.navigateByUrl('/login');
    } else {
      location.reload();
    }
  }
  
}
