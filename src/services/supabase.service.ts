import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(
      environment.supabaseURL,
      environment.supabaseKey
    );
  }

  // Register function
  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({
      email,
      password,
    });
  }

  userProfile() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  async createUserProfile(firstName: string, lastName: string, email: string) {
    const user = this.userProfile();
    const supabase = this.supabase_client;
    const { data, error } = await supabase
      .from('profile')
      .insert({
        
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .select();

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Login function
  signIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({
      email,
      password,
    });
  }

  // getter function

  get supabaseClient() {
    return this.supabase_client;
  }

  signOut() {
    return this.supabase_client.auth.signOut();
  }

  saveSessionToLocalStorage(token: any) {
    localStorage.setItem('access_token', JSON.stringify(token));
  }

  removeSessionFromLocalStorage() {
    localStorage.removeItem('user');
  }

  getSessionFromLocalStorage(): any {
    const tokenString = localStorage.getItem('user');
    if (tokenString !== null) {
      const user = JSON.parse(tokenString);
      return user;
    }
  }

  isloggedIn() {
    const user = localStorage.getItem('user');
    return user;
  }
}
