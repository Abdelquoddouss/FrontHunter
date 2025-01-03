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
      data => {
        console.log(data);  // Vérifier la structure des données
        this.competitions = data.content;
      },
      error => {
        console.error('Erreur de récupération des compétitions:', error);
      }
    );
  }

}
