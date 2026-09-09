import { Routes } from '@angular/router';
import { WritePage } from './pages/write-page/write-page';
import { RulesPage } from './pages/rules-page/rules-page';
import { VictimsPage } from './pages/victims-page/victims-page';

export const routes: Routes = [
  {
    path: '',
    component: WritePage,
  },
  {
    path: 'rules',
    component: RulesPage,
  },
  {
    path: 'victims',
    component: VictimsPage,
  },
];
