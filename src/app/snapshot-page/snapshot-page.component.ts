import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from '../core/objects/user';
import { DatePipe } from '@angular/common';

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

  constructor(private thoughtsSerivce: ThoughtsService, private route: ActivatedRoute, private datepipe: DatePipe) {}

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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
