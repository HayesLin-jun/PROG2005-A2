import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page">
      <h2>Welcome to Inventory Management System</h2>
      <p>PROG2005 Assignment 2 Part 2 - Angular Version</p>
      <h3>Features:</h3>
      <ul>
        <li>Add, edit, delete inventory items</li>
        <li>Search items by name</li>
        <li>View popular items</li>
        <li>Privacy & Security Information</li>
      </ul>
    </div>
  `,
  styles: [`
    .page { padding: 30px; max-width: 800px; margin: 0 auto; }
  `]
})
export class HomeComponent {}
