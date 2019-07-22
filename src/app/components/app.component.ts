import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton }        from '@angular/material/button';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { MenuOverlayRef }   from '../objects/overlayref';
import { ComponentPortal }  from '@angular/cdk/portal';
import { InfoComponent }    from './info.component';
import { FilterComponent }  from './filter.component';

interface MenuOverlayConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

const DEFAULT_CONFIG: MenuOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'overlay-panel'
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'AudioGraph';

  constructor(private overlay: Overlay) { }

  show(portal) {
    var viewPortal = portal;
    const overlayRef = this.createOverlay();
    const dialogRef = new MenuOverlayRef(overlayRef);
    overlayRef.attach(viewPortal);
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    return dialogRef;
  }

  displayInfo() {
    this.show(new ComponentPortal(InfoComponent))
  }

  displayFilter() {
    this.show(new ComponentPortal(FilterComponent))
  }

  private createOverlay() {
    const overlayConfig = this.getOverlayConfig(DEFAULT_CONFIG);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: MenuOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

}
