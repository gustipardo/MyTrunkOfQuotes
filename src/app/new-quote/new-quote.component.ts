import { Component, EventEmitter, Output } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormBuilder } from '@angular/forms';
import { DataQuotesService } from '../data-quotes.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent {
  loading = false;
  session = this.supabase.session
  newQuoteForm = this.formBuilder.group({
    Description: '',
    Author: '',
    Color: '#F3E5AB'
  })
  @Output() updateComponent: EventEmitter<void> = new EventEmitter<void>();
  colors: string[] = [
    '#57C785',
    '#00BAAD',
    '#2A7B9B',
    '#3D3D6B',
    '#511849',
    '#900C3F',
    '#ADD45C',
    '#EDDD53',
    '#FFC300',
    '#FF8D1A',
    '#FF5733',
    '#C70039',
  ];
  selectedColor: string = '';

  constructor(private supabase:SupabaseService, private formBuilder:FormBuilder, public dataQuote:DataQuotesService){
  }
  async ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }

  async addQuote(){
    try{
      this.loading = true;
      const Description = this.newQuoteForm.value.Description as string
      let Author = this.newQuoteForm.value.Author as string
      const Color = this.newQuoteForm.value.Color as string
      if(Author==""){Author="Anonymous"}
      if (this.session) { 
        const { user } = this.session;
        if(this.dataQuote.Edit&&this.dataQuote.QuoteEditId){
        await this.supabase.updateQuote(this.dataQuote.QuoteEditId , Description, Author, Color);
        } 
        else{ 
          await this.supabase.createQuote(Description, Author, Color, user)}
        this.updateComponent.emit();
      }
    } catch (error) {
      console.error('Error at insert/edit quote:', error);
    } finally{
      this.loading = false;
      this.newQuoteForm.reset();
      this.dataQuote.newQuote = false;
    }
  }
  
  setColor(color:string){
    this.newQuoteForm.value.Color = color;
    this.selectedColor=color;
  }


}