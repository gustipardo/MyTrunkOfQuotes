import { Component } from '@angular/core';
import { Quotes, SupabaseService } from '../supabase.service';
import { DataQuotesService } from '../data-quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  loading = false
  session = this.supabase.session
  public textos: any[] = [];
  quotes:Quotes[] = [];
  newQuote = this.dataQuote.newQuote;
  elementRef: any;
  

  constructor(private supabase:SupabaseService, public dataQuote:DataQuotesService ){
  }

  async ngOnInit(): Promise<void> {
    this.supabase.authChanges((_, session) => (this.session = session));
    this.session = this.supabase.session;
    await this.getQuotes();
  }
  
  async deleteQuote(index:number){
    try{
    const QuoteID = this.quotes[index].id
    const quoteContainer = document.getElementById(index.toString());
    if(QuoteID&&quoteContainer){
    await this.supabase.deleteQuote(QuoteID);
    quoteContainer.classList.add('novisible');
    setTimeout(() => {
    this.quotes = this.quotes.filter((quote) => quote.id !== QuoteID);
  }, 500);
  this.getQuotes()
    }
    } catch (error){
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  async editQuote(index:number){
    const QuoteEdit = this.quotes[index];
    const Description = QuoteEdit.Description;
    const Author = QuoteEdit.Author;
    const QuoteEditID = this.quotes[index].id;

    this.dataQuote.QuoteEditId = QuoteEditID
    this.dataQuote.newQuote = true
    this.dataQuote.Description = Description;
    this.dataQuote.Author = Author;
    this.dataQuote.button = "Edit Quote";
    this.dataQuote.Edit = true;
  }

  async getQuotes() {
    try {
      console.log("session "+this.session);
      console.log("Quotes"+this.quotes);
      this.loading = true;
      if (this.session) { 
        const { user } = this.session;
        let { data: quotes, error, status } = await this.supabase.quotes(user);
        if (error && status !== 406) {
          throw error;
        }
  
        if (quotes) {
          this.quotes = quotes;
          this.dataQuote.quotes = quotes;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
  
  updateComponent(){
    this.getQuotes()
  }
}
