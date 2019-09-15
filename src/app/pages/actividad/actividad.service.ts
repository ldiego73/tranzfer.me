import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';

export class ActividadService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get('http://localhost:3000/transferencias');
  }
}
