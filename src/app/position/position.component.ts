import { Component, OnInit, Input } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { finalize } from 'rxjs/operators';
import { Pose } from '../core/objects/pose';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {
  @Input()
  userId: number;

  @Input()
  snapshotId: string;

  pose: Pose;
  isLoading = false;

  constructor(private thoughtsSerivce: ThoughtsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.thoughtsSerivce
      .getPose(this.userId, this.snapshotId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((pose: Pose) => {
        this.pose = pose;
      });
  }
}
