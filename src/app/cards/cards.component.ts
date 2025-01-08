import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CompetitionService} from "../service/competition-service.service";

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
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Vous devez être connecté pour participer.');
      return;
    }

    this.competitionService.registerParticipation(userId, competitionId).subscribe(
      (response) => {
        alert('Vous avez participé avec succès à cette compétition.');
      },
      (error) => {
        console.error('Erreur lors de la participation :', error);
        alert('Erreur lors de la participation. Veuillez réessayer.');
      }
    );
  }


}
