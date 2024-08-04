import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },

      {
        path: 'call',
        loadChildren: () => import('../pages/contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../pages/admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../pages/blog/blog.module').then(m => m.BlogPageModule)
      },
      {
        path: 'resume',
        loadChildren: () => import('../pages/resume/resume.module').then(m => m.ResumePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('../pages/edit/edit.module').then(m => m.EditPageModule)
      },

      {
        path: 'matrimonial',
        loadChildren: () => import('../pages/matrimonial/matrimonial.module').then(m => m.MatrimonialPageModule)
      },

      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () => import('../pages/detail/detail.module').then(m => m.DetailPageModule)
          }
        ],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
