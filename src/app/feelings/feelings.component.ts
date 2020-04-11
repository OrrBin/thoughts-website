import { Component, OnInit, Input } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { Feelings } from '../core/objects/feelings';
import { finalize } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-feelings',
  templateUrl: './feelings.component.html',
  styleUrls: ['./feelings.component.css'],
})
export class FeelingsComponent implements OnInit {
  @Input()
  userId: number;

  @Input()
  snapshotId: string;

  feelings: Feelings;
  isLoading = false;

  constructor(private thoughtsSerivce: ThoughtsService, private number: DecimalPipe) {}

  ngOnInit() {
    this.isLoading = true;
    this.thoughtsSerivce
      .getFeelings(this.userId, this.snapshotId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((feelings: Feelings) => {
        this.feelings = feelings;
      });
  }
}
