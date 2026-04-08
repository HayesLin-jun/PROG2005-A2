import { Injectable } from '@angular/core';
import { Item, Category, StockStatus } from './item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items: Item[] = [];

  addItem(item: Item): boolean {
    const exists = this.items.some(i => i.itemID === item.itemID);
    if (exists) return false;
    this.items.push(item);
    return true;
  }

  updateItemByName(itemName: string, updated: Partial<Item>): boolean {
    const index = this.items.findIndex(i => i.itemName === itemName);
    if (index === -1) return false;
    this.items[index] = { ...this.items[index], ...updated };
    return true;
  }

  deleteItemByName(itemName: string): boolean {
    const originalLength = this.items.length;
    this.items = this.items.filter(i => i.itemName !== itemName);
    return this.items.length < originalLength;
  }

  searchByName(keyword: string): Item[] {
    return this.items.filter(i =>
      i.itemName.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  getAllItems(): Item[] {
    return [...this.items];
  }

  getPopularItems(): Item[] {
    return this.items.filter(i => i.popularItem);
  }
}