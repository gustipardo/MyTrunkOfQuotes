import { Component } from '@angular/core';
import { Quotes, SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  allQuotes: Quotes[] = []
  constructor(private supabase:SupabaseService){}

  async getAllQuotes(){
    try{

      let { data: quotes, error, status} = await this.supabase.allQuotes();
      if(quotes){
        this.allQuotes = quotes;
      }
    } catch (error){

    }finally{

    }
  }
}
