import {Component} from '@angular/core';
import {NgForm} from '@angular/forms'; // Importe NgForm pour manipuler les données du formulaire
import {EventService} from '../event.service'; // Importe EventService pour créer l'événement
import {Router} from '@angular/router'; // Importe Router pour naviguer vers d'autres vues
import {MessageService} from '../message.service'; // Importe MessageService pour afficher des messages
import {Location} from '@angular/common'; // Importe Location pour modifier l'URL

// Décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})

export class EventCreateComponent {
  // Injection des services et modules nécessaires
  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private router: Router,
    private location: Location,
  ) {
  }

  // Cette méthode est déclenchée à la soumission du formulaire
  onSubmit(form: NgForm) {
    // On vérifie que le formulaire est valide et que la date de début est inférieure à la date de fin
    if (form.valid) {
      // On crée un objet avec les données du formulaire
      const eventData = {
        acronym: form.value.acronym.toString(),
        event_name: form.value.eventName.toString(),
        location: form.value.location.toString(),
        description: form.value.description.toString(),
        registration_start_date: form.value.registrationStartDate,
        registration_end_date: form.value.registrationEndDate,
        max_participants: form.value.maxParticipants,
      };

      // On utilise le service EventService pour créer l'événement avec les données du formulaire
      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          // Si la création est réussie, on affiche un message de succès et on redirige vers la page de détails de l'événement
          this.messageService.showMessage('Événement créé avec succès !');
          this.router.navigate(['/dashboard', response.eventId]);
          this.location.replaceState('/dashboard');
        },
        (error) => {
          // En cas d'erreur, on affiche un message d'erreur
          this.messageService.showMessage("Erreur lors de la création de l'événement.");
        }
      );
    } else {
      // Si les dates ne sont pas valides, on affiche un message d'erreur
      this.messageService.showMessage("Date de fin inférieure à la date de début");
    }
  }

  // Cette méthode vérifie que la date de début est inférieure à la date de fin
  validateDates(startDate: string, endDate: string): boolean {
    return new Date(startDate) < new Date(endDate);
  }
}
