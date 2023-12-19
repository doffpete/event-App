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
}
