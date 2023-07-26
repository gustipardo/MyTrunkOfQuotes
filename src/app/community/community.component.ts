import { Component } from '@angular/core';
import { Quotes, SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  allQuotes: Quotes[] = []
  loading: boolean = false;
  constructor(private supabase:SupabaseService){
    this.getAllQuotes()
  }

  async getAllQuotes(){
    try{
      this.loading = true;
      let { data: quotes, error, status} = await this.supabase.allQuotes();
      if (error && status !== 406) {
        throw error;
      }
      if(quotes){
        this.allQuotes = quotes;
      }
    } catch (error){
      if (error instanceof Error) {
        alert(error.message);
      }
    }finally{
      this.loading = false;
    }
  }
}
