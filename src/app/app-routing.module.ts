import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsBackComponent } from './event-details-back/event-details-back.component';
import { EventCreateComponent } from "./event-create/event-create.component";
import { UpdateParticipantComponent } from "./update-participant/update-participant.component";
import { AuthAdminComponent } from "./auth-admin/auth-admin.component";
import { AuthGuard } from './auth.guard';
import { LoginGuard } from "./login.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { NotreMissionComponent } from "./notre-mission/notre-mission.component";
import { EventDetailsFrontComponent } from "./event-details-front/event-details-front.component";
import { FormulaireInscriptionComponent } from "./formulaire-inscription/formulaire-inscription.component";
import { EventListOpenComponent } from "./event-list-open/event-list-open.component";
import { ContactComponent } from "./contact/contact.component";

// Définition des routes
const routes: Routes = [
  { path: '', component: HomeComponent }, // Route pour la page d'accueil
  { path: 'notre-mission', component: NotreMissionComponent }, // Route pour la page notre mission
  { path: 'contact', component: ContactComponent }, // Route pour la page de contact
  { path: 'products', component: EventListOpenComponent }, // Route pour la liste des événements ouverts (côté front)
  { path: 'products/:productID', component: EventDetailsFrontComponent }, // Route pour les détails d'un événement (côté front)
  { path: 'events/:eventId/inscription', component: FormulaireInscriptionComponent }, // Route pour le formulaire d'inscription à un événement
  { path: 'login', component: AuthAdminComponent, canActivate: [LoginGuard] }, // Route pour la page de connexion (protégée par LoginGuard)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Route pour le tableau de bord admin (protégée par AuthGuard)
  { path: 'dashboard/product/:productID/create', component: EventCreateComponent, canActivate: [AuthGuard] }, // Route pour la création d'un événement (protégée par AuthGuard)
  { path: 'dashboard/product/:productID', component: EventDetailsBackComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:productID/:participantId', component: UpdateParticipantComponent, canActivate: [AuthGuard] }, // Route pour la mise à jour d'un participant à un événement (protégée par AuthGuard)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
