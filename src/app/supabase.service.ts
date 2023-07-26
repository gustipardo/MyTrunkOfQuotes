import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  PostgrestResponse,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from 'src/app/enviroment'

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}
export interface Quotes {
  id?: string
  Description: string
  Author: string
  Color: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  from(arg0: string) {
    throw new Error('Method not implemented.')
  }
  private supabase: SupabaseClient
  _session: AuthSession | null = null
  auth: any

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  quotes(user: User){
    return this.supabase
      .from('Quotes')
      .select(`id, Description, Author, Color`)
      .eq('id_user', user.id)
  }

  allQuotes(){
    return this.supabase
      .from('Quotes')
      .select(`Description, Author, Color`)
  }

  async deleteQuote(Quote_id:string){
    try{
    const { error } = await this.supabase
    .from('Quotes')
    .delete()
    .eq('id', Quote_id)
    if (error) {
      throw error;
    }
    } catch (error){
      throw error;
    }
  }
  
  async updateQuote(Quote_id:string, Description:string, Author:String, Color:string){
    try{
      console.log("edit")
    const { error } = await this.supabase
    .from('Quotes')
    .update({ Description: Description, Author: Author, Color })
    .eq('id', Quote_id)
    if (error) {
      throw error;
    }
    } catch (error){
      throw error;
    }
  }
  
  async createQuote(description: string, author: string, Color:string, user: User): Promise<void> {
    try {
      const { error } = await this.supabase.from('Quotes').insert([
        { Description: description, Author: author, Color: Color, id_user: user.id }
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }
  
  

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }
}