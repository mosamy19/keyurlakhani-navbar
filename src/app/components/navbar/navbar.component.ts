import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy
} from "@angular/core";
import LINKS from "../../common/global";
// import LINKS from '../../common/global';
import { WindowWidthService } from "../../services/window-width.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private resizeSubscription: Subscription;
  screenWidth = window.innerWidth;
  links = LINKS;
  constructor(private windowWidthService: WindowWidthService) {}

  @ViewChild("header", { read: ElementRef }) header: ElementRef;

  ngOnInit() {
    this.resizeSubscription = this.windowWidthService.onResize$.subscribe(
      window => this.onResize(window.innerWidth)
    );
    this.links.map(element => {
      element["dropdown"] = false;
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  onResize(size) {
    this.screenWidth = size;
    if (this.screenWidth > 767) {
      this.header.nativeElement.classList.remove("menu-opened");
    }
  }

  handleMenuClick(e) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.header.nativeElement.classList.toggle("menu-opened");
    }
  }

  dropMenu(e, link) {
    link.dropdown ? (link.dropdown = false) : (link.dropdown = true);
    e.target.closest(".plus").classList.toggle("clicked");
  }
}
