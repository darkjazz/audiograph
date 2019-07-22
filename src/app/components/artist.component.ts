import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { Artist }         from '../objects/artist';
import { Category }       from '../objects/category';
import { Track }          from '../objects/track';
import { Config }         from '../objects/config';
import { getUserGuid }    from '../objects/util';
import { ArtistService }  from '../services/artist.service';

const MAX_ARTISTS = 30;

@Component({
  moduleId: module.id,
  selector: 'artist-detail',
  templateUrl: 'artist.component.html',
  styleUrls: ['artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  ab_categories: Category[];
  mood_category: Category;
  lastfm_category: Category;
  deezer_id: string;
  error: any;
  showSpinner: boolean;
  tracks: Array<any>;
  index:number;
  isPlaying: boolean = false;
  cover: string;
  title: string;
  layout: string;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artist = new Artist();
      // if (!sessionStorage["musiclynx-layout"])
      //   sessionStorage["musiclynx-layout"] = "GRAPH";
      // var guid = getUserGuid();
      // console.log(guid);
      // if (!sessionStorage["user-guid"])
      //   sessionStorage["user-guid"] = guid;
      this.layout = sessionStorage["musiclynx-layout"];
      if (params['id']) {
        if (params['id'].search("http") == -1) {
          this.artist.id = params['id'];
          this.getMBArtist();
        }
      }
      else {
        window.history.back();
      }
    })
  }

  getMBArtist(): void {
    this.showSpinner = true;
    // this.cover = "./assets/deezer.png";
    this.artistService.constructMusicbrainzArtist(this.artist).then(artist => {
      this.displayArtist(artist);
    }).catch(reason => {
      console.log(reason)
    });
  }

  getDBPArtist(): void {
    this.showSpinner = true;
    this.cover = "./assets/deezer.png";
    this.artistService.constructDbpediaArtist(this.artist).then(artist => {
      this.displayArtist(artist);
    }).catch(reason => {
      console.log(reason)
    });
  }

  displayArtist(artist: Artist): void {
    this.showSpinner = false;
    this.artist = artist;
    // console.log(artist.tags);
    // if (artist.id) this.getAcousticbrainzCategories();
    // if (artist.name) this.getMoodplayLinks();
    // if (artist.name) this.getDeezerID();
    // this.storeInHistory(artist);
  }

  checkArtistExists(artist: Artist, storage: string): boolean {
    var history_string = localStorage.getItem('musiclynx-history');
    var artist_exists = false;
    if (history_string)
      var history_list = history_string.split(Config.history_separator).map(item => {
        var obj = JSON.parse(item);
        if (typeof obj !== 'string' && obj.id == artist.id)
          artist_exists = true;
      });
    return artist_exists;
  }

  storeInHistory(artist: Artist) {
    var storage = localStorage.getItem('musiclynx-history');
    var artist_string = JSON.stringify({ id: artist.id, name: artist.name });
    if (storage) {
      if (!this.checkArtistExists(artist, storage))
        storage += Config.history_separator + artist_string;
    }
    else {
      storage = artist_string;
    }
    localStorage.setItem("musiclynx-history", storage);
  }

  getImage(): void {
    this.artistService.getImage(this.artist.id)
      .then(artist => {
        this.artist.image = artist.image;
        if (artist.original_image) this.artist.original_image = artist.original_image;
        if (artist.entity_id) this.artist.entity_id = artist.entity_id;
      });
  }

  getAcousticbrainzCategories(): void {
    this.artistService.getAcousticbrainzLinks(this.artist)
      .then(response => {
        this.ab_categories = response;
      })
  }

  getMoodplayLinks(): void {
    this.artistService.getMoodplayLinks(this.artist, MAX_ARTISTS)
      .then(response => {
        if (response.label) this.mood_category = response;
      });
  }

  getLastFMLinks(): void {
    this.artistService.getLastFMLinks(this.artist)
      .then(response => {
        if (response.label) this.lastfm_category = response;
      });
  }

  showGraph(): boolean {
    return this.layout == "GRAPH";
  }

  showGrid(): boolean {
    return this.layout == "GRID";
  }

  goBack(): void {
    window.history.back();
  }

  playing(playing) {
    this.isPlaying = playing;
  }

}
