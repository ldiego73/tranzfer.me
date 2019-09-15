import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Observable } from 'rxjs';

export class TransfiereServie {
  url = `${environment.api}/search/v1/customers`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  searchCustomer(dni: number): Observable<any> {
    return new Observable(observer => {
      this.search(dni).subscribe((data: any) => {
        const { customer } = data;
        const { status } = customer;

        if (status === 'NOT_REGISTERED') {
          observer.error({ isRegistered: false });
        } else {

        }
      });
    });
  }

  private search(dni: number) {
    const endpoint = `${this.url}?identityDocumentType=DNI&identityDocumentNumber=${dni}&notRegistered=true`;

    return this.http.get(endpoint, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.apiKey,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    });
  }

  private accounts() {

  }
}
