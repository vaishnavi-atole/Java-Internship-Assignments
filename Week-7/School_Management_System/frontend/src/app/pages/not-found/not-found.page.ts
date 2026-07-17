import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css'
})
export class NotFoundPageComponent {
}
