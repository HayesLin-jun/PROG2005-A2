/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */

import { Item } from "./item.model";

export class InventoryService {
    private items: Item[] = [];

    /**
     * Add a new item into inventory
     * Ensures unique itemID
     */
    public addItem(newItem: Item): boolean {
        const exists = this.items.some(item => item.itemID === newItem.itemID);
        if (exists) {
            return false;
        }
        this.items.push(newItem);
        return true;
    }

    /**
     * Update item by itemName
     */
    public updateItem(itemName: string, updatedItem: Item): boolean {
        const index = this.items.findIndex(item => item.itemName === itemName);
        if (index === -1) {
            return false;
        }

        // Keep original itemID (immutable rule)
        updatedItem.itemID = this.items[index].itemID;
        this.items[index] = updatedItem;
        return true;
    }

    /**
     * Delete item by itemName
     */
    public deleteItem(itemName: string): boolean {
        const index = this.items.findIndex(item => item.itemName === itemName);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }

    /**
     * Search items by itemName
     */
    public searchByName(name: string): Item[] {
        return this.items.filter(item =>
            item.itemName.toLowerCase().includes(name.toLowerCase())
        );
    }

    /**
     * Return all items
     */
    public getAllItems(): Item[] {
        return [...this.items];
    }

    /**
     * Get only popular items
     */
    public getPopularItems(): Item[] {
        return this.items.filter(item => item.popularItem === true);
    }
}