import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ThoughtsService } from '../core/services/thoughts.service';
import { finalize } from 'rxjs/operators';
import { ColorImage } from '../core/objects/color_image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input()
  userId: number;

  @Input()
  snapshotId: string;

  @Input()
  type: string;

  public imageData: any;

  // image: ColorImage;
  @ViewChild("heroImage") image: ElementRef;

  isLoading = false;

  constructor(private thoughtsSerivce: ThoughtsService) { }

  ngOnInit() {
    this.isLoading = true;
    if (this.type == 'color') {
      this.thoughtsSerivce.getColorImageData(this.userId, this.snapshotId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(result => {
          this.createImageFromBlob(result);
        });
    } else {
      this.thoughtsSerivce.getDepthImageData(this.userId, this.snapshotId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(result => {
          this.createImageFromBlob(result);
        });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageData = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
