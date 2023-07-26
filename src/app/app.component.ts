import { Component } from '@angular/core';
import { SupabaseService } from './supabase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyTrunkQuotes';
  session = this.supabase.session

  constructor(private readonly supabase: SupabaseService) {
  }

  async ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }
}
