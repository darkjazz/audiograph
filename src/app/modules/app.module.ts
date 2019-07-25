import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule, JsonpModule }  from "@angular/http";
import { MatSidenavModule, MatIconModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { OverlayModule }            from '@angular/cdk/overlay';
import { PortalModule }             from '@angular/cdk/portal';

// import '../rxjs-extensions'
import { AppComponent }             from '../components/app.component';
import { AppRoutingModule, routedComponents } from './routing.module';
import { ArtistService }            from '../services/artist.service';
import { MusicBrainzService }       from '../services/musicbrainz.service';
import { DeezerService }            from '../services/deezer.service';
import { PlayerService }            from '../services/player.service';
import { Spinner }                  from '../components/spinner.component';
import { GraphComponent }           from '../components/graph.component';
import { InfoComponent }            from '../components/info.component';
import { FilterComponent }          from '../components/filter.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    OverlayModule,
    PortalModule
  ],
  declarations: [
    AppComponent,
    Spinner,
    GraphComponent,
    InfoComponent,
    FilterComponent,
    routedComponents
  ],
  providers:    [
    ArtistService,
    MusicBrainzService,
    DeezerService,
    PlayerService
  ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ InfoComponent, FilterComponent ]
})
export class AppModule { }
