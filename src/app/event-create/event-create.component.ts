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
          this.router.navigate(['/dashboard']); // Ajoutez l'URL appropriée pour la page principale
        },
        (error) => {
          console.error('Error creating event', error);
          this.messageService.showMessage("Erreur lors de la création de l'événement.");
        }
      );
    }
  }
}
