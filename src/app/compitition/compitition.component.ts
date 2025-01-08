import {Component, OnInit} from '@angular/core';
import {CompetitionService} from "../service/competition-service.service";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-compitition',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './compitition.component.html',
  styleUrl: './compitition.component.css'
})
export class CompititionComponent implements OnInit {
  competitions: any[] = [];

  constructor(private competitionService: CompetitionService) {
  }

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
