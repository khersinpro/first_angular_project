import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/service/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor (private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.buttonText = "Oh snap!"
    // le "+" devant le param permet de transformer un string en nombre "123" = 123
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getSnapById(snapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === "Oh snap!") {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() =>  this.buttonText = "Oops unsnap!")
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = "Oh snap!")
      );
    }
  }
}
