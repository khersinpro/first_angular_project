import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../service/face-snaps.service';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {
  // Déclaration du formulaire dynamique
  snapForm!: FormGroup;
  // Déclaration d'un observable de type facesnap pour generer un affichage en temps reel
  faceSnapPreview$!: Observable<FaceSnap>;
  // Déclaration d'une variable de type regex pour validé certaines données
  urlRegex!: RegExp;

  // Récupération du formBuilder pour créer le formulaire dans ngOnInit
  constructor(private router: Router, private formBuilder: FormBuilder, private faceSnapService: FaceSnapsService) {}

  ngOnInit(): void {
    // Regex pour accépter uniquement les urls
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    // Création du formulaire avec le formbuilder et le méthode group
    // Puils déclaration des valeurs de bases a null et de différents validator dont un par regex
    // updateOn: 'blur' permet de mettre a jour le formulaire uniquement quand on change de champ
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image_url: [null, [
        Validators.required,
        Validators.pattern(this.urlRegex)
      ]],
      location: [null]
    }, {
      updateOn: 'blur'
    })

    // Création d'un obersable qui va observé les changement du formulaire (valueChanges)
    // Les changements seront affiché en direct dans le HTML
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        created_at: new Date(),
        snaps: 0,
        id: 0
      }))
    );
  }

  // Fonction qui se déclenche a la soumission du formulaire
  // Elle appel la forcion addFaceSnap du service facesnap afin de créer un snap avec les informations du formulaire
  onSubmitForm(): void {
    this.faceSnapService.addFaceSnap(this.snapForm.value);
    this.router.navigateByUrl('facesnaps');
  }
}
