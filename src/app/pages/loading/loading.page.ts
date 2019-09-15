import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(data => {
      const { code } = data;
      if (code) {
        this.auth(code);
      }
    });
  }

  auth(code: string) {
    this.authService.createSession(code).subscribe(data => {
      if (data) {
        this.router.navigate(['transfiere']);
      }
    });
  }
}
