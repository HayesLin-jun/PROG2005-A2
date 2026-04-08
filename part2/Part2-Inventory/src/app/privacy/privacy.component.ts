import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="page">
      <h2>Privacy & Security</h2>
      <p>This app does NOT store your data to external servers.</p>
      <p>All data stays only in your browser session.</p>
      <p>Data is automatically cleared when you close the browser.</p>
    </div>
  `,
  styles: []
})
export class PrivacyComponent {}
