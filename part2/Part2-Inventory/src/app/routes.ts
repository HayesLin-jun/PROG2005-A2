import { Routes } from '@angular/router';
// 正确路径：从 app 目录出发，./home/home.component
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { SearchComponent } from './search/search.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];