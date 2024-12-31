import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  email: string = ''; // Liaison avec ngModel
  password: string = '';
  emailError: string = ''; // Message d'erreur email
  passwordError: string = ''; // Message d'erreur mot de passe
  serverError: string = ''; // Message d'erreur serveur

  constructor(private authService: AuthService) {}

  // Validation du formulaire
  validateForm() {
    // Validation pour email
    this.emailError = !this.email
      ? 'Email is required'
      : !/\S+@\S+\.\S+/.test(this.email)
        ? 'Please enter a valid email address'
        : '';

    // Validation pour le mot de passe
    this.passwordError =
      !this.password
        ? 'Password is required'
        : this.password.length < 6
          ? 'Password must be at least 6 characters'
          : '';
  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    this.validateForm();

    // Si il y a des erreurs, ne pas envoyer la requête
    if (!this.emailError && !this.passwordError) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Sauvegarder le token (par exemple dans localStorage)
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.serverError = 'Invalid email or password'; // Adapter le message selon le backend
        },
      });
    }
  }
}
