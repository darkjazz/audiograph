import { Component, Output }  from '@angular/core';
import { ArtistService }      from '../services/artist.service';

@Component({
  selector: 'filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.scss']
})
export class FilterComponent {

  categories;
  similarities;
  similarityCategories;

  constructor(private artistService: ArtistService) {
    this.similarityCategories = this.artistService.getSimilarityCategories();
    this.categories = this.artistService.getCategories();
    this.similarities = this.artistService.getSimilarities();
  }

  select(category, similarity) {
    this.artistService.setSimilarityCategory(category, similarity);
  }

  apply() {
    this.artistService.saveFilter();
    window.location.reload();
  }

}
