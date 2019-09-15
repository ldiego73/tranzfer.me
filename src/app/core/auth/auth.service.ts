import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

            if (_links.hasOwnProperty('/customer/creation')) {
              localStorage.setItem('init_token', access_token);

              observer.error({ notExists: true });
              return;
            }

            const link = _links['/subscription/creation'].href;

            localStorage.setItem('dni', dni.toString());

            // tslint:disable-next-line: max-line-length
            window.location.href = `${link}?response_type=code&client_id=${environment.username}&scope=token:subscription&state=foo&redirect_uri=${environment.redirect}`;
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

  createSession(code: string): Observable<boolean> {
    const endpoint = `${environment.api}/security/v1/oauth/token`;

    return new Observable(observer => {
      this.http
        .post(
          endpoint,
          `code=${code}&grant_type=authorization_code&redirect_uri=${environment.redirect}`,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Ocp-Apim-Subscription-Key': environment.apiKey,
              Authorization: `Basic ${btoa(
                environment.username + ':' + environment.password
              )}`,
            }),
          }
        )
        .subscribe((data: any) => {
          const { access_token } = data;
          const isRefresh = localStorage.getItem('isRefresh') || '';

          if (isRefresh !== 'true') {
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const number = accounts.length + 1;

            accounts.push({
              id: accounts.length + 1,
              banco: 'Interbank',
              tipo: 'Ahorros',
              moneda: number % 2 === 0 ? 'Soles' : 'Dolares',
              numero_cuenta: this.getAccount(),
            });

            localStorage.setItem('accounts', JSON.stringify(accounts));
          }

          localStorage.setItem('session', JSON.stringify(data));
          localStorage.setItem('token', access_token);
          localStorage.setItem('isRefresh', 'false');

          observer.next(true);
        });
    });
  }

  refreshToken() {
    localStorage.setItem('isRefresh', 'true');
    window.location.href = `https://securitydev.digital.interbank.pe/oauth/authorize?response_type=code&client_id=${environment.username}&scope=token:subscription&state=foo&redirect_uri=${environment.redirect}`;
  }

  private getAccount() {
    return `${randomInt(1000, 9999)} ${randomInt(1000, 9999)} ${randomInt(
      1000,
      9999
    )} ${randomInt(1000, 9999)}`;
  }

  public logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  public existsToken() {
    return localStorage.getItem('token');
  }
}
