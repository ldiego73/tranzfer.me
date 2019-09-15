import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Observable } from 'rxjs';

export class TransfiereServie {
  constructor(private http: HttpClient, private auth: AuthService) {}

  transfer(monto: number): Observable<any> {
    return new Observable(observer => {
      this.postTransfer(monto).subscribe((data: any) => {
        observer.next(data);
      });
    });
  }

  private postTransfer(monto: number) {
    const token = localStorage.getItem('token');
    const session = JSON.parse(localStorage.getItem('session'));
    const { scope } = session;
    const parts = scope.split(' ');
    const account = parts[3].split(':')[1];
    const currency = parts[4].split(':')[1];

    const endpoint = `${environment.api}/trx/v1/accounts/${account}/transactions`;
    const newId = new Date().getTime();

    return this.http.post(
      endpoint,
      {
        transaction: {
          type: 'ON_HOLD',
          currency,
          amount: monto.toString(),
          chargeStatement: '',
          depositStatement: '',
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.apiKey,
          'X-Correlation-Id': `PREFIX-${newId}`,
          'X-Application-ID': environment.username,
          'X-Api-Force-Sync': 'false',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  private accounts() {}
}
