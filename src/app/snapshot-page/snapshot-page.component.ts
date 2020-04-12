import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, catchError } from 'rxjs/operators';
import { User } from '../core/objects/user';
import { DatePipe } from '@angular/common';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-snapshot-page',
  templateUrl: './snapshot-page.component.html',
  styleUrls: ['./snapshot-page.component.css'],
})
export class SnapshotPageComponent implements OnInit {
  snapshotId: string;
  userId: number;
  user: User;
  date: Date = new Date();
  sub: any;
  products: string[];
  isLoading = false;

  isFirst = false;
  isLast = false;

  constructor(private thoughtsSerivce: ThoughtsService, private router: Router, private route: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit() {
    this.isLoading = true;

    this.sub = this.route.params.subscribe((params) => {
      this.snapshotId = params['id'];
      this.userId = +params['userId'];
      this.date.setTime(+params['timestamp']);

      this.thoughtsSerivce.getUser(this.userId)
        .subscribe((user: User) => {
          this.user = user;
        });

      this.thoughtsSerivce
        .getSnapshot(this.userId, this.snapshotId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((products: string[]) => {
          this.products = products;
        });
    });

    this.thoughtsSerivce.getNextSnapshot(this.userId, this.snapshotId).subscribe(
      snap => { },
      error => {
        this.isLast = true;
      }
    );
    this.thoughtsSerivce.getPrevSnapshot(this.userId, this.snapshotId).subscribe(
      snap => { },
      error => {
        this.isFirst = true;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigateNextSnapshot() {
    this.thoughtsSerivce.getNextSnapshot(this.userId, this.snapshotId).subscribe(snapshot => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/snapshot', this.userId, snapshot.snapshotId, snapshot.date]);
      });

    });

  }

  navigatePrevSnapshot() {
    this.thoughtsSerivce.getPrevSnapshot(this.userId, this.snapshotId).subscribe(snapshot => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/snapshot', this.userId, snapshot.snapshotId, snapshot.date]);
      });
    });

  }

  timeString(): string {
    return this.datepipe.transform(this.date, 'yyyy/MM/dd HH:mm:ss SSS');
  }

  hasFeelings() {
    if (!this.products) return false;
    return this.products.find((p) => p == 'feelings') != undefined;
  }

  hasPose() {
    if (!this.products) return false;
    return this.products.find((p) => p == 'pose') != undefined;
  }

  hasColorImage() {
    if (!this.products) return false;
    return this.products.find((p) => p == 'color_image') != undefined;
  }

  hasDepthImage() {
    if (!this.products) return false;
    return this.products.find((p) => p == 'depth_image') != undefined;
  }

}
