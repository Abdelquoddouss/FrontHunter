import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-heros',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './heros.component.html',
  styleUrl: './heros.component.css'
})
export class HerosComponent {

}
