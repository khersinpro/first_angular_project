import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

// Instancie le service a la racine d'angular pour que toute l'application partage la même logique
@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService {

  faceSnaps!: FaceSnap[];

  constructor(private http: HttpClient) { }

  getAllFaceSnaps(): Observable<FaceSnap[]>
  {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snap: 'snap'|'unsnap'):Observable<FaceSnap>
  {
    return this.getSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snap === "snap" ? 1 : -1)
      })),
      switchMap(updatedSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedSnap))
    );
  }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1].id + 1),
      map(validId => ({
        ...formValue,
        createdDate: new Date(),
        snaps:0,
        id: validId
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>(`http://localhost:3000/facesnaps`, newFaceSnap))
    )
  }
}
