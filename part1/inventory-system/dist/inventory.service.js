/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */
export class InventoryService {
    constructor() {
        this.items = [];
    }
    /**
     * Add a new item into inventory
     * Ensures unique itemID
     */
    addItem(newItem) {
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
    updateItem(itemName, updatedItem) {
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
    deleteItem(itemName) {
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
    searchByName(name) {
        return this.items.filter(item => item.itemName.toLowerCase().includes(name.toLowerCase()));
    }
    /**
     * Return all items
     */
    getAllItems() {
        return [...this.items];
    }
    /**
     * Get only popular items
     */
    getPopularItems() {
        return this.items.filter(item => item.popularItem === true);
    }
}
