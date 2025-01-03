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
export class CompititionComponent implements OnInit{
  competitions: any[] = [];

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    // Récupérer toutes les compétitions
    this.competitionService.getAllCompetitions().subscribe(
      (data) => {
        this.competitions = data?.content || [];
      },
      (error) => {
        console.error('Erreur lors du chargement des compétitions :', error);
      }
    );
  }

}

