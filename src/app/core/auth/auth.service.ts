import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

export interface Session {
  id: number;
  userId: number;
  username: string;
  lastName1: string;
  lastName2: string;
  phone: string;
  direction: string;
  dni: string;
  names: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public login(dni: number): Observable<boolean> {
    return new Observable(observer => {
      this.auth().subscribe((data: any) => {
        const { access_token } = data;

        this.kba(dni, access_token).subscribe((data: any) => {
          const { kba } = data;
          const { id } = kba;

          this.authAccount(id, access_token).subscribe((data: any) => {
            const { _links } = data;
            const link = _links['/subscription/creation'].href;

            // tslint:disable-next-line: max-line-length
            window.location.href = `${link}?response_type=code&client_id=${environment.username}&scope=token:subscription&state=foo&redirect_uri=http://localhost:4200/register`;
          });
        });
      });
    });
  }

  private auth() {
    const endpoint = `${environment.api}/security/v1/oauth/token`;

    return this.http.post(
      endpoint,
      `grant_type=client_credentials&scope=token:application`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            environment.username + ':' + environment.password
          )}`,
        }),
      }
    );
  }

  private kba(dni: number, token: string) {
    const endpoint = `${environment.api}/onboarding/v1/kba`;

    return this.http.post(
      endpoint,
      {
        kba: {
          customer: {
            identityDocuments: [
              {
                type: 'DNI',
                number: dni,
              },
            ],
          },
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.apiKey,
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  private authAccount(id: number, token: string) {
    const endpoint = `${environment.api}/onboarding/v1/kba/${id}`;

    return this.http.put(
      endpoint,
      {
        kba: {
          questions: [
            {
              id: '52',
              category: 'GHI',
              answer: {
                id: '1',
              },
            },
            {
              id: '8',
              category: 'ABC',
              answer: {
                id: '4',
              },
            },
            {
              id: '51',
              category: 'DEF',
              answer: {
                id: '1',
              },
            },
          ],
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.apiKey,
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  public createSession(res: any) {
    localStorage.setItem('session', JSON.stringify(res));
    localStorage.setItem('token', res.access_token);
  }

  public session(): Session {
    return JSON.parse(localStorage.getItem('session'));
  }

  public updateSession(session: Session) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  public logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
