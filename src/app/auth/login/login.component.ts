import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';

  // Validation du formulaire
  validateForm() {
    // Validation de l'email
    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = '';
    }

    // Validation du mot de passe
    if (!this.password) {
      this.passwordError = 'Password is required';
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
    } else {
      this.passwordError = '';
    }
  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    this.validateForm();
    if (!this.emailError && !this.passwordError) {
      console.log('Form Submitted');
      // Ajouter ici la logique pour gérer l'authentification
    }
  }
}
