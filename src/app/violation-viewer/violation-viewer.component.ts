import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpserviceService } from '../shared/httpservice.service';

@Component({
  selector: 'app-violation-viewer',
  templateUrl: './violation-viewer.component.html',
  styleUrls: ['./violation-viewer.component.css'],
})
export class ViolationViewerComponent implements OnInit {
  title = 'p2psystem-ui';

  Violations: any = [];
  currentviolation: any;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 20;
  pageSizes = [10, 20, 30];

  imageAsource = '';
  imageBsource = '';
  active = 1;

  constructor(
    public httpService: HttpserviceService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    this.Violations.data = null;
    this.fetchViolations();
    //this.currentviolation = new this.Violations();
  }

  fetchViolations() {
    return this.httpService.getViolations().subscribe((data: {}) => {
      this.Violations = data;
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.fetchViolations();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fetchViolations();
  }

  getviodetails(pkId: number) {
    return this.httpService.getViolationDetails(pkId).subscribe((data: {}) => {
      this.currentviolation = data;
      this.imageAsource = this.currentviolation.data.imageA;
      this.imageBsource = this.currentviolation.data.imageB;
    });
  }

  LogOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
