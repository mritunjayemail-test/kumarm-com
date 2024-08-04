import { HttpContext } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
})
export class ServerElementComponent {
  @Input() srvElement!: {
    type: string,
    name: string,
    content: string
  };
  constructor() { }
}
