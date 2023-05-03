import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailsComponent } from './event-details/event-details.component';
import { GeneralstatComponent } from './generalstat/generalstat.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { FormsModule } from '@angular/forms';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { UpdateParticipantComponent } from './update-participant/update-participant.component';
import { ExportCsvButtonComponent } from './export-csv-button/export-csv-button.component';
import { StatsParticipantsComponent } from './stats-participants/stats-participants.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailsComponent,
    GeneralstatComponent,
    EventCreateComponent,
    ParticipantListComponent,
    UpdateParticipantComponent,
    ExportCsvButtonComponent,
    StatsParticipantsComponent,
    AuthAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
