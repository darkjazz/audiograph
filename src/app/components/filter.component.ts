import { Component } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent {

  grid;

  constructor() {
    this.grid = [
      [ "Chords", "Tempo", "Timbre", "Audio" ],
      [ "Rank", "Heat", "Inference", "Maximum" ]
    ];
  }

}
