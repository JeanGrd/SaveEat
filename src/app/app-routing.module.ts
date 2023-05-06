import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './event-details/event-details.component';
import {EventCreateComponent} from "./event-create/event-create.component";
import {UpdateParticipantComponent} from "./update-participant/update-participant.component";
import {AuthAdminComponent} from "./auth-admin/auth-admin.component";

import { AuthGuard } from './auth.guard';
import {LoginGuard} from "./login.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {NotreMissionComponent} from "./notre-mission/notre-mission.component";
import {EventsComponent} from "./events/events.component";
import {EventDetailsFrontComponent} from "./event-details-front/event-details-front.component";
import {FormulaireInscriptionComponent} from "./formulaire-inscription/formulaire-inscription.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notre-mission', component: NotreMissionComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsFrontComponent },
  { path: 'events/:id/inscription', component: FormulaireInscriptionComponent },
  { path: 'login', component: AuthAdminComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/create', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/event-details/:eventId/participants/:participantId', component: UpdateParticipantComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
