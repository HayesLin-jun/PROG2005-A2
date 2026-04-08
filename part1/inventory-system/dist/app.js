/**
 * Author: LinZijun
 * Student ID: 24832397
 * Part 1 - Inventory Management System
 */
import { InventoryService } from "./inventory.service";
const service = new InventoryService();
const messageBox = document.getElementById("messageBox");
const displayArea = document.getElementById("displayArea");
function showMessage(message, isError = false) {
    messageBox.innerHTML = message;
    messageBox.style.backgroundColor = isError ? "#ffcccc" : "#ccffcc";
}
function getFormData() {
    const itemID = document.getElementById("itemID").value.trim();
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);
    const supplierName = document.getElementById("supplierName").value.trim();
    if (!itemID || !itemName || !supplierName || isNaN(quantity) || isNaN(price)) {
        showMessage("Please fill all required fields correctly.", true);
        return null;
    }
    const category = document.getElementById("category").value;
    const stockStatus = document.getElementById("stockStatus").value;
    const popularItem = document.getElementById("popularItem").checked;
    const comment = document.getElementById("comment").value;
    return { itemID, itemName, category, quantity, price, supplierName, stockStatus, popularItem, comment };
}
function renderItems(items) {
    displayArea.innerHTML = items.map(item => {
        var _a;
        return `
        <div class="card">
            <strong>${item.itemName}</strong> (${item.itemID})<br/>
            Category: ${item.category} | Qty: ${item.quantity} | Price: $${item.price}<br/>
            Supplier: ${item.supplierName} | Status: ${item.stockStatus}<br/>
            Popular: ${item.popularItem ? "Yes" : "No"}<br/>
            Comment: ${(_a = item.comment) !== null && _a !== void 0 ? _a : ""}
        </div>
        <hr/>
    `;
    }).join("");
}
// Event bindings
document.getElementById("addBtn").onclick = () => {
    const item = getFormData();
    if (!item)
        return;
    const success = service.addItem(item);
    showMessage(success ? "Item added successfully." : "Item ID must be unique.", !success);
};
document.getElementById("updateBtn").onclick = () => {
    const item = getFormData();
    if (!item)
        return;
    const success = service.updateItem(item.itemName, item);
    showMessage(success ? "Item updated." : "Item not found.", !success);
};
document.getElementById("deleteBtn").onclick = () => {
    const name = document.getElementById("itemName").value.trim();
    if (!name) {
        showMessage("Enter item name to delete.", true);
        return;
    }
    messageBox.innerHTML = `
        Confirm deletion?
        <button id="confirmDel">Yes</button>
        <button id="cancelDel">No</button>
    `;
    document.getElementById("confirmDel").onclick = () => {
        const success = service.deleteItem(name);
        showMessage(success ? "Deleted successfully." : "Item not found.", !success);
    };
    document.getElementById("cancelDel").onclick = () => {
        showMessage("Deletion cancelled.");
    };
};
document.getElementById("searchBtn").onclick = () => {
    const name = document.getElementById("searchInput").value;
    renderItems(service.searchByName(name));
};
document.getElementById("showAllBtn").onclick = () => {
    renderItems(service.getAllItems());
};
document.getElementById("showPopularBtn").onclick = () => {
    renderItems(service.getPopularItems());
};
