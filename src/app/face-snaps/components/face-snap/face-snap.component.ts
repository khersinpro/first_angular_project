import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/service/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

  // Le décorateur @Input permet d'injecter une propriété personalisée depuis l'exterieur
  // Pour lier une valeur a la propriété facesnap, il faut ajouté dans le composant parent [faceSnap]='nom_de_la_propriété'
  // On peu ensuite utilisé la propriété comme n'importe qu'elle proprité (modifier, afficher ...)
  @Input() faceSnap!: FaceSnap;

  // Décalaration des variables
  buttonText!: string;

  constructor (private faceSnapsService: FaceSnapsService, private router: Router) {

  }

  // ngOnInit se lance a l'instanciation de la class et on initialise les variables
  ngOnInit() {
    this.buttonText = "Oh snap!"
  }

  onViewFaceSnap(snapId: number): void {
    this.router.navigateByUrl(`facesnap/${snapId}`);
  }
}
