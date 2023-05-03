import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent {
  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const eventData = {
        acronym: form.value.acronym,
        event_name: form.value.eventName,
        location: form.value.location,
        description: form.value.description,
        registration_start_date: form.value.registrationStartDate,
        registration_end_date: form.value.registrationEndDate,
        max_participants: form.value.maxParticipants,
      };

      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Event created', response);
          this.messageService.showMessage('Événement créé avec succès !');
          this.router.navigate(['/events']); // Ajoutez l'URL appropriée pour la page principale
        },
        (error) => {
          console.error('Error creating event', error);
          this.messageService.showMessage("Erreur lors de la création de l'événement.");
        }
      );
    }
  }
}
