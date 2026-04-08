import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h2>Search Items</h2>
      <input [(ngModel)]="keyword" placeholder="Search by name" />
      <button (click)="search()">Search</button>

      <div *ngFor="let item of results">
        {{ item.itemName }} ({{ item.category }})
      </div>
    </div>
  `,
  styles: []
})
export class SearchComponent {
  keyword = '';
  results: Item[] = [];

  constructor(private service: InventoryService) {}

  search() {
    this.results = this.service.searchByName(this.keyword);
  }
}
