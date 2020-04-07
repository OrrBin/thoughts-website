import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-snapshot-page',
  templateUrl: './snapshot-page.component.html',
  styleUrls: ['./snapshot-page.component.css'],
})
export class SnapshotPageComponent implements OnInit {
  snapshotId: string;
  userId: number;
  sub: any;

  products: string[];
  isLoading = false;

  constructor(private thoughtsSerivce: ThoughtsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;

    this.sub = this.route.params.subscribe((params) => {
      this.snapshotId = params['id'];
      this.userId = +params['userId'];
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

  timeString(milliseconds: number): string {
    let date = new Date();
    date.setTime(milliseconds);

    return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
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
