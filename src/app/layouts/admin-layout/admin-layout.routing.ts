import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LeadSearchComponent } from '../../lead-search/lead-search.component';
import { EmailTemplatesComponent } from '../../email-templates/email-templates.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CampaignComponent } from 'app/campaign/campaign.component';

export const AdminLayoutRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent
    }]}, {
    path: '',
    children: [ {
        path: 'lead-search',
      component: LeadSearchComponent
    }]
    }, {
        path: '',
        children: [{
            path: 'email-templates',
            component: EmailTemplatesComponent
        }]
    }, {
      path: '',
      children: [ {
        path: 'icons',
        component: IconsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'maps',
            component: MapsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'typography',
            component: TypographyComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'upgrade',
            component: UpgradeComponent
        }]
    },
    { path: 'table-list', component: TableListComponent },
    { path: 'campaign', component: CampaignComponent },
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'lead-search',   component: LeadSearchComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
