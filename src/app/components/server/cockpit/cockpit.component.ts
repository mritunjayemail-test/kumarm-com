import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent {
  @Output() serverCreated     = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() serverBlueCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  newServerName    = '';
  newServerContent = '';
  constructor() { }

  onAddServer() {
    this.serverCreated.emit({ serverName: this.newServerName, serverContent: this.newServerContent });
  }
  onAddBlueprint() {
    this.serverBlueCreated.emit({ serverName: this.newServerName, serverContent: this.newServerContent });
  }
}
