import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { finalize } from 'rxjs/operators';
import { SnapshotIndex } from '../core/objects/snapshot';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/objects/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  userId: number;
  user: User;
  sub: any;

  snapshots: SnapshotIndex[] = [];

  isLoading = false;

  constructor(private thoughtsSerivce: ThoughtsService, private route: ActivatedRoute, public datepipe: DatePipe) {}

  ngOnInit() {
    this.isLoading = true;

    this.sub = this.route.params.subscribe((params) => {
      this.userId = +params['id'];

      this.thoughtsSerivce.getUser(this.userId)
      .subscribe((user: User) => {
        this.user = user;
      });

      this.thoughtsSerivce
        .getSnapshots(this.userId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((snapshots: SnapshotIndex[]) => {
          this.snapshots = snapshots;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  timeString(milliseconds: number): string {
    let date = new Date();
    date.setTime(milliseconds);

    return this.datepipe.transform(date, 'yyyy/MM/dd HH:mm:ss SSS');

  }
}
