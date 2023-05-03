import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import {EventCreateComponent} from "./event-create/event-create.component";
import {UpdateParticipantComponent} from "./update-participant/update-participant.component";
import {AuthAdminComponent} from "./auth-admin/auth-admin.component";

import { AuthGuard } from './auth.guard';
import {LoginGuard} from "./login.guard";

const routes: Routes = [
  { path: '', component: AuthAdminComponent, canActivate: [LoginGuard] },
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'events/create', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
  { path: 'event-details/:eventId/participants/:participantId', component: UpdateParticipantComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
