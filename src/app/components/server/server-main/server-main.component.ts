import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-main',
  templateUrl: './server-main.component.html',
  styleUrls: ['./server-main.component.scss'],
})
export class ServerMainComponent {
  serverElements = [
    { type: 'server', name: 'Test Server', content: 'this is test' }
  ];
  constructor() { }
  onServerAdded(serverData: { serverName: string,
    serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
  onBlueprintAdded(serverData: { serverName: string,
    serverContent: string }) {
    this.serverElements.push({
      type: 'BluePrint',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
}
