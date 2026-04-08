/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */

// Category Enum
export enum Category {
    Electronics = "Electronics",
    Furniture = "Furniture",
    Clothing = "Clothing",
    Tools = "Tools",
    Miscellaneous = "Miscellaneous"
}

// Stock Status Enum
export enum StockStatus {
    InStock = "In Stock",
    LowStock = "Low Stock",
    OutOfStock = "Out of Stock"
}

// Item Interface
export interface Item {
    itemID: string;          // Unique, immutable after creation
    itemName: string;        // Required
    category: Category;
    quantity: number;        // Required
    price: number;           // Required
    supplierName: string;    // Required
    stockStatus: StockStatus;
    popularItem: boolean;    // Yes / No
    comment?: string;        // Optional
}