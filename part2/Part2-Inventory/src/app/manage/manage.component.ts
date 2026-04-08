import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Category, StockStatus, Item } from '../item.model';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h2>Manage Items</h2>
      <p class="msg">{{ message }}</p>

      <div class="form">
        <h3>Add New Item</h3>
        ID: <input [(ngModel)]="newItem.itemID" type="number" />
        Name: <input [(ngModel)]="newItem.itemName" />
        Category:
        <select [(ngModel)]="newItem.category">
          <option *ngFor="let c of catList" [value]="c">{{c}}</option>
        </select>
        Quantity: <input [(ngModel)]="newItem.quantity" type="number" />
        Price: <input [(ngModel)]="newItem.price" type="number" />
        Supplier: <input [(ngModel)]="newItem.supplierName" />
        Status:
        <select [(ngModel)]="newItem.stockStatus">
          <option *ngFor="let s of statusList" [value]="s">{{s}}</option>
        </select>
        <label>
          <input [(ngModel)]="newItem.popularItem" type="checkbox" />
          Popular Item
        </label>
        <button (click)="addItem()">Add Item</button>
      </div>

      <div class="list">
        <h3>Item List</h3>
        <div *ngFor="let item of items">
          {{ item.itemID }} - {{ item.itemName }} | {{ item.category }}
          <button (click)="deleteItem(item.itemName)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .page { padding: 20px; }
  .form { margin: 20px 0; }
  input, select, button { width: 100%; margin: 5px 0; padding: 10px; }
  .item-card { padding: 10px; background: #fff; margin: 8px 0; border-radius: 8px; }
`]
})
export class ManageComponent {
  catList = Object.values(Category);
  statusList = Object.values(StockStatus);

  newItem: Item = {
    itemID: 0,
    itemName: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: StockStatus.InStock,
    popularItem: false
  };

  items: Item[] = [];
  message = '';

  constructor(private service: InventoryService) {
    this.refresh();
  }

  addItem() {
    const ok = this.service.addItem({ ...this.newItem });
    this.message = ok ? 'Item added ✅' : 'ID already exists';
    this.refresh();
  }

  deleteItem(name: string) {
    this.service.deleteItemByName(name);
    this.refresh();
  }

  refresh() {
    this.items = this.service.getAllItems();
  }
}
