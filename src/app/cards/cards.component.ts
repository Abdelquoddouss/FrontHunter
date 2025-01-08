import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CompetitionService} from "../service/competition-service.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  competitions: any[] = [];

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(
      (data) => {
        if (data && data.content) {
          this.competitions = data.content;
        } else {
          console.error('Format de données inattendu :', data);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des compétitions :', error);
      }
    );
  }

  participate(competitionId: string): void {
    const decodedToken = this.decodeToken();
    if (!decodedToken || !decodedToken.id) {
      Swal.fire('Non autorisé', 'Vous devez être connecté pour participer.', 'warning');
      return;
    }

    const userId = decodedToken.id;
    this.competitionService.registerParticipation(userId, competitionId).subscribe(
      (response) => {
        Swal.fire('Succès', 'Vous avez participé avec succès à cette compétition.', 'success');

      },
      (error) => {
        console.error('Erreur lors de la participation:', error);
        const errorMessage = error.status === 401
          ? 'Non autorisé. Veuillez vous reconnecter.'
          : error.status === 400
            ? 'Requête invalide. Vérifiez vos données.'
            : 'Erreur lors de la participation. Veuillez réessayer.';
        Swal.fire('Erreur', errorMessage, 'error');
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
