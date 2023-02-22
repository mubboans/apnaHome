import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timelinecard',
  templateUrl: './timelinecard.component.html',
  styleUrls: ['./timelinecard.component.scss']
})
export class TimelinecardComponent implements OnInit {

  constructor() { }
  events1: any[];
  ngOnInit(): void {
    this.events1 = [
      {
        status: "Free List your property",
        date: "15/10/2020 10:30",
        icon: "pi pi-shopping-cart",
        color: "#9C27B0",
        image: "game-controller.jpg"
      },
      {
        status: "Zero Brokerage",
        date: "15/10/2020 14:00",
        icon: "pi pi-cog",
        color: "#673AB7"
      },
      {
        status: "Supersonic Deal",
        date: "15/10/2020 16:15",
        icon: "pi pi-envelope",
        color: "#FF9800"
      },
      {
        status: "Faster Tenants",
        date: "16/10/2020 10:00",
        icon: "pi pi-check",
        color: "#607D8B"
      }
    ];
  }

}
