import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  template: `
    <div class="page">
      <h2>Help & FAQ</h2>
      <p>Use Manage Items to add new inventory.</p>
      <p>Use Search to find items quickly.</p>
      <p>Data is temporary and stored only in this session.</p>
    </div>
  `,
  styles: []
})
export class HelpComponent {}
