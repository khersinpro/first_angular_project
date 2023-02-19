import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

// Instancie le service a la racine d'angular pour que toute l'application partage la même logique
@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService {

  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title : 'Mon super titre I',
      description: 'Ma super description',
      created_at: new Date(),
      snaps: 1,
      image_url: "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
      location: "Paris"
    },
    {
      id: 2,
      title : 'Mon super titre II',
      description: 'Ma super description',
      created_at: new Date(),
      snaps: 1,
      image_url: "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
      location: "Paris"
    },
    {
      id: 3,
      title : 'Mon super titre III',
      description: 'Ma super description',
      created_at: new Date(),
      snaps: 1,
      image_url: "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
      location: "Paris"
    },
    {
      id: 4,
      title : 'Mon super titre IIII',
      description: 'Ma super description',
      created_at: new Date(),
      snaps: 1,
      image_url: "https://i-mom.unimedias.fr/2020/09/16/je-decouvre-les-pirates.jpg?auto=format%2Ccompress&cs=tinysrgb&h=630&w=1200",
      location: "Paris"
    },
  ];

  constructor() {

  }

  getAllFaceSnaps(): FaceSnap[]
  {
    return this.faceSnaps;
  }

  getSnapById(faceSnapId: number)
  {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);

    if (!faceSnap) {
      throw new Error('FaceSnap not found!');
    }
    return faceSnap;
  }

  snapFaceSnapById(faceSnapId: number, snap: 'snap'|'unsnap'):void
  {
    const selectedFaceSnap = this.getSnapById(faceSnapId);
    snap === 'snap' ? selectedFaceSnap.snaps++ :selectedFaceSnap.snaps--;
  }

  addFaceSnap(formValue: { title: string, description: string, image_url: string, location?: string }): void {
    const faceSnap: FaceSnap = {
      ...formValue,
      created_at: new Date(),
      snaps: 0,
      id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
    }
    this.faceSnaps.push(faceSnap);
  }
}
