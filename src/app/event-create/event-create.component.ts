import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent {
  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private router: Router,
    private location : Location,
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid && this.validateDates(form.value.registrationStartDate, form.value.registrationEndDate)) {
      const eventData = {
        acronym: form.value.acronym.toString(),
        event_name: form.value.eventName.toString(),
        location: form.value.location.toString(),
        description: form.value.description.toString(),
        registration_start_date: form.value.registrationStartDate,
        registration_end_date: form.value.registrationEndDate,
        max_participants: form.value.maxParticipants,
      };

      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Event created', response);
          this.messageService.showMessage('Événement créé avec succès !');
          this.router.navigate(['/dashboard', response.eventId]); // Naviguer vers la page des détails de l'événement
          this.location.replaceState('/dashboard');
        },
        (error) => {
          console.error('Error creating event', error);
          this.messageService.showMessage("Erreur lors de la création de l'événement.");
        }
      );
    } else {
      this.messageService.showMessage("Date de fin inférieure à la date de début");
    }
  }

  validateDates(startDate: string, endDate: string): boolean {
    return new Date(startDate) < new Date(endDate);
  }
}
