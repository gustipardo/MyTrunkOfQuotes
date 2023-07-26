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
    Author: ''
  })
  @Output() updateComponent: EventEmitter<void> = new EventEmitter<void>();

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
      if(Author==""){Author="Anonymous"}
      if (this.session) { 
        const { user } = this.session;
        if(this.dataQuote.Edit&&this.dataQuote.QuoteEditId){
        await this.supabase.updateQuote(this.dataQuote.QuoteEditId , Description, Author);
        } 
        else{ 
          await this.supabase.createQuote(Description, Author, user)}
        this.updateComponent.emit();
      }
    } catch (error) {
      console.error('Error al insertar/editar una nueva cita:', error);
    } finally{
      this.loading = false;
      this.newQuoteForm.reset();
      this.dataQuote.newQuote = false;
    }
  }
}