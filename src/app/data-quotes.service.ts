import { Injectable } from '@angular/core';
import { Quotes } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DataQuotesService {
  newQuote = false;
  button: string = "Add Quote";
  Edit:boolean=false;
  Description: string = "";
  Author: string = "";
  QuoteEditId:string | undefined;
  quotes:Quotes[] = [];

  
  constructor() { }

}
