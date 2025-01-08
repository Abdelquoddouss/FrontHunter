import { Component, OnInit } from '@angular/core';
import { CompetitionService } from "../service/competition-service.service";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-compitition',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './compitition.component.html',
  styleUrls: ['./compitition.component.css'] // Corrected property name
})
export class CompititionComponent implements OnInit {
  competitions: any[] = [];

  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.competitionService.getAllCompetitions().subscribe(
      (data) => {
        if (data && data.content) {
          this.competitions = data.content;
        } else {
          console.error('Format de données inattendu :', data);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des compétitions :', error);
      }
    );
  }

  participate(competitionId: string): void {
    const decodedToken = this.decodeToken();
    if (!decodedToken || !decodedToken.id) {
      alert('Vous devez être connecté pour participer.');
      return;
    }

    const userId = decodedToken.id;
    this.competitionService.registerParticipation(userId, competitionId).subscribe(
      (response) => {
        console.log('Participation response:', response);
        alert('Vous avez participé avec succès à cette compétition.');
      },
      (error) => {
        console.error('Erreur lors de la participation:', error);
        const errorMessage = error.status === 401
          ? 'Non autorisé. Veuillez vous reconnecter.'
          : error.status === 400
            ? 'Requête invalide. Vérifiez vos données.'
            : 'Erreur lors de la participation. Veuillez réessayer.';
        alert(errorMessage);
      }
    );
  }

  private decodeToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token is missing.");
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}
