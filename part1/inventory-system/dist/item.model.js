/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */
// Category Enum
export var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Furniture"] = "Furniture";
    Category["Clothing"] = "Clothing";
    Category["Tools"] = "Tools";
    Category["Miscellaneous"] = "Miscellaneous";
})(Category || (Category = {}));
// Stock Status Enum
export var StockStatus;
(function (StockStatus) {
    StockStatus["InStock"] = "In Stock";
    StockStatus["LowStock"] = "Low Stock";
    StockStatus["OutOfStock"] = "Out of Stock";
})(StockStatus || (StockStatus = {}));
