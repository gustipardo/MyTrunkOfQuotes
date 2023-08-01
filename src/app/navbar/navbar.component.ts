import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  session = this.supabase.session
  constructor(private supabase:SupabaseService){
    
  }
  async signOut(){
    await this.supabase.signOut();
  }
}
