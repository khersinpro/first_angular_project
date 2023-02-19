import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  // Ce service intercepte les requetes sortante, en nous donnant la requete(req) et le next
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Création des headers a ajouter dans la nouvelle requete
    // Ici on ajoute un header authorization avec un token jwt pour authentifier l'utilisateur
    const headers =  new HttpHeaders()
    .append('Authorization', `Bearer ${this.auth.getToken()}`);

    // Création d'une nouvelle requette avec le clone de la requete (la requete initial est immuable)
    // Puis ajout des headers
    const modifiedRequest = req.clone({ headers })

    // On return la methode next.handle + la requete pour passer a l'etape suivante ou envoyer la requete
    return next.handle(modifiedRequest);
  }
}
