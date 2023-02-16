import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  mySnap!: FaceSnap;
  mySecondSnap!: FaceSnap;
  myThirdSnap!: FaceSnap;


  ngOnInit(): void {
    this.mySnap = new FaceSnap(
      'Mon super titre I',
      'Ma super description',
      new Date(),
      1,
      "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
    );
    
    this.mySecondSnap = new FaceSnap(
      'Mon super titre II',
      'Ma super description',
      new Date(),
      2,
      "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
    );

    this.myThirdSnap = new FaceSnap(
      'Mon super titre III',
      'Ma super description',
      new Date(),
      3,
      "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
    );
  }
}
