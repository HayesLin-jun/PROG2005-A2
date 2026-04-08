/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */

import { InventoryService } from "./inventory.service";
import { Item, Category, StockStatus } from "./item.model";

const service: InventoryService = new InventoryService();

// DOM references
const messageBox = document.getElementById("messageBox") as HTMLDivElement;
const displayArea = document.getElementById("displayArea") as HTMLDivElement;
const modal = document.getElementById("modal") as HTMLDivElement;

/* -------------------- Notification Bar -------------------- */
function showMessage(message: string, isError: boolean = false): void {
    messageBox.innerHTML = message;
    messageBox.style.background = isError ? "#e74c3c" : "#2ecc71";

    setTimeout(() => {
        messageBox.innerHTML = "";
        messageBox.style.background = "transparent";
    }, 2500);
}

/* -------------------- Form Data -------------------- */
function getFormData(): Item | null {
    const itemID = (document.getElementById("itemID") as HTMLInputElement).value.trim();
    const itemName = (document.getElementById("itemName") as HTMLInputElement).value.trim();
    const quantity = Number((document.getElementById("quantity") as HTMLInputElement).value);
    const price = Number((document.getElementById("price") as HTMLInputElement).value);
    const supplierName = (document.getElementById("supplierName") as HTMLInputElement).value.trim();

    if (!itemID || !itemName || !supplierName || isNaN(quantity) || isNaN(price)) {
        showMessage("Please complete all required fields correctly.", true);
        return null;
    }

    const category = (document.getElementById("category") as HTMLSelectElement).value as Category;
    const stockStatus = (document.getElementById("stockStatus") as HTMLSelectElement).value as StockStatus;
    const popularItem = (document.getElementById("popularItem") as HTMLInputElement).checked;
    const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;

    return { itemID, itemName, category, quantity, price, supplierName, stockStatus, popularItem, comment };
}

/* -------------------- Card Rendering -------------------- */
function renderItems(items: Item[]): void {
    displayArea.innerHTML = items.map(item => {

        const pillClass =
            item.stockStatus === StockStatus.InStock ? "in" :
            item.stockStatus === StockStatus.LowStock ? "low" : "out";

        return `
        <div class="card">
            <h3>${item.itemName} ${item.popularItem ? "⭐" : ""}</h3>
            <p><strong>ID:</strong> ${item.itemID}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Qty:</strong> ${item.quantity} | <strong>Price:</strong> $${item.price}</p>
            <p><strong>Supplier:</strong> ${item.supplierName}</p>
            <span class="pill ${pillClass}">${item.stockStatus}</span>
            <p>${item.comment ?? ""}</p>
        </div>
        `;
    }).join("");
}

/* -------------------- Delete Modal -------------------- */
function showDeleteModal(name: string): void {
    modal.style.display = "flex";
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <p>Confirm delete <strong>${name}</strong>?</p>
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
            </div>
        </div>
    `;

    (document.getElementById("confirmYes") as HTMLButtonElement).onclick = () => {
        const success = service.deleteItem(name);
        showMessage(success ? "Item deleted." : "Item not found.", !success);
        modal.style.display = "none";
        renderItems(service.getAllItems());
    };

    (document.getElementById("confirmNo") as HTMLButtonElement).onclick = () => {
        modal.style.display = "none";
    };
}

/* -------------------- Button Events -------------------- */

// Add
(document.getElementById("addBtn") as HTMLButtonElement).onclick = () => {
    const item = getFormData();
    if (!item) return;

    const success = service.addItem(item);
    showMessage(success ? "Item added successfully." : "Item ID must be unique.", !success);
    renderItems(service.getAllItems());
};

// Update
(document.getElementById("updateBtn") as HTMLButtonElement).onclick = () => {
    const item = getFormData();
    if (!item) return;

    const success = service.updateItem(item.itemName, item);
    showMessage(success ? "Item updated." : "Item not found.", !success);
    renderItems(service.getAllItems());
};

// Delete (open modal)
(document.getElementById("deleteBtn") as HTMLButtonElement).onclick = () => {
    const name = (document.getElementById("itemName") as HTMLInputElement).value.trim();
    if (!name) {
        showMessage("Enter item name to delete.", true);
        return;
    }
    showDeleteModal(name);
};

// Search
(document.getElementById("searchBtn") as HTMLButtonElement).onclick = () => {
    const name = (document.getElementById("searchInput") as HTMLInputElement).value;
    renderItems(service.searchByName(name));
};

// Show all
(document.getElementById("showAllBtn") as HTMLButtonElement).onclick = () => {
    renderItems(service.getAllItems());
};

// Show popular
(document.getElementById("showPopularBtn") as HTMLButtonElement).onclick = () => {
    renderItems(service.getPopularItems());
};
