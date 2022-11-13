import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng-lts/api';
import { Expo } from '../home/home.component';
import { AuthlogService } from '../service/authlog.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayModal:boolean;
  cars:any[]
  caty:any
  history:History;
  expes:Expo[];
  expenses:Expo;
  submitted:boolean;
  dataa:any[]
  selectedCity:any;
  cities: any[];
  foods: any[];
  storageModal:boolean;
  dataviewData:any[];
  constructor(public auth:AuthlogService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

}
