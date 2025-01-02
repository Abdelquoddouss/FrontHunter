import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {TypeComponent} from "../../type/type.component";
import {CardsComponent} from "../../cards/cards.component";

@Component({
  selector: 'app-heros',
  standalone: true,
  imports: [NavbarComponent, TypeComponent, CardsComponent],
  templateUrl: './heros.component.html',
  styleUrl: './heros.component.css'
})
export class HerosComponent {

}
