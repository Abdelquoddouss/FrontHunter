import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../service/auth.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  serverError: string = '';
  userRole: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  // Validation du formulaire
  validateForm(): boolean {
    this.emailError = !this.email
      ? 'Email is required'
      : !/\S+@\S+\.\S+/.test(this.email)
        ? 'Please enter a valid email address'
        : '';

    this.passwordError = !this.password
      ? 'Password is required'
      : this.password.length < 6
        ? 'Password must be at least 6 characters'
        : '';

    return !this.emailError && !this.passwordError;
  }

  // Décodage du token pour obtenir le rôle de l'utilisateur
  decodeToken(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      this.userRole = decodedToken.role || 'unknown';
      console.log('User role:', this.userRole);

      // Redirection basée sur le rôle
      this.redirectUserBasedOnRole(this.userRole);
    } catch (err) {
      console.error('Error decoding token:', err);
      this.serverError = 'Failed to decode token';
    }
  }

  redirectUserBasedOnRole(role: string): void {
    if (role === 'ADMIN') {
      this.router.navigate(['/home']);
    } else if (role === 'MEMBER') {
      this.router.navigate(['/home']);
    } else if (role === 'JURY'){
      this.router.navigate(['/home']);
    }
  }


  // Soumission du formulaire
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.decodeToken(response.token);
        } else {
          this.serverError = 'Token not received from server.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.serverError = err?.error?.message || 'Invalid email or password';
      },
    });
  }
}
