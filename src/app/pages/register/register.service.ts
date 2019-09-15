import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';

export class RegisterService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  register(client: any): Observable<any> {
    return new Observable(observer => {
      this.create(client).subscribe(data => {
        observer.next(data);
      }, error => {
        observer.error(error);
      });
    });
  }

  private create(client: any) {
    const token = localStorage.getItem('init_token');
    const { nombres, apellidos, email, sexo, documento } = client;

    const endpoint = `${environment.api}/onboarding/v1/accounts`;
    const newId = new Date().getTime();

    return this.http.post(
      endpoint,
      {
        account: {
          type: 'SAVING',
          subType: 'CUENTA_SIMPLE',
          currency: 'PEN',
          customer: {
            identityDocuments: [
              {
                type: 'DNI',
                number: documento,
              },
            ],
            firstName: nombres,
            lastName: apellidos,
            motherLastName: 'GIRALDO',
            gender: sexo,
            birthDate: '1978-12-02',
            maritalStatus: 'SEPARATED',
            birthCountry: 'PE',
            residenceCountry: 'PE',
            nationality: 'PE',
            phones: [
              {
                number: '955650179',
                carrier: 'MOVISTAR',
              },
            ],
            addresses: [
              {
                country: 'PE',
                department: 'Lima',
                province: 'Lima',
                district: 'San Juan de Miraflores',
                streetType: 'AVENUE',
                streetName: '       $23 lOS',
                streetNumber: '        100 $A 20',
                block: '        %&/ABC12',
                lot: '             #$AB12',
                apartment: '        2&%$ABC&%$',
                neighborhood: '          12&/(abc/()',
                landmark: '           $%&12ABC$',
              },
            ],
            emails: [
              {
                email,
              },
            ],
            ldpd: {
              accepted: true,
            },
          },
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.apiKey,
          'X-Correlation-Id': `PREFIX-${newId}`,
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
