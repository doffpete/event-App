import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
  constructor(
    private route: Router,
    private auth: SupabaseService,
  ){}

  logout() {
    this.auth
      .signOut()
      .then((res) => {
        this.route.navigate(['/home']);
        this.auth.removeSessionFromLocalStorage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
