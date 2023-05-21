import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MessageService } from '../message.service';
import {ParticipantService} from "../participant.service";
import {EventService} from "../event.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulaire-inscription',
  templateUrl: './formulaire-inscription.component.html',
  styleUrls: ['./formulaire-inscription.component.css'],
})
export class FormulaireInscriptionComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private participantService: ParticipantService,
    private eventService : EventService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const eventId = params['eventId'];
      this.eventService.isFull(eventId).subscribe((isFull) => {
        if (isFull) {
          this.router.navigate(['/events', eventId]);
        }
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const participantData = {
        first_name: form.value.first_name.toString(),
        last_name: form.value.last_name.toString(),
        email: form.value.email.toString(),
        phone_number: form.value.phone_number.toString(),
      };

      // Utilisez ici le service pour les inscriptions
      // Remplacez 'createParticipant()' par la méthode appropriée dans votre service
      this.route.params.subscribe((params) => {

        this.participantService.createParticipant(params['eventId'], participantData).subscribe(
          (response) => {
            console.log('Participant inscrit', response);
            this.messageService.showMessage("L'inscription du participant a réussi !");
            this.router.navigate(['/events', params['eventId']]); // Ajoutez l'URL appropriée pour la page principale
            this.location.replaceState('/events');
          },
          (error) => {
            if (error.error.error === "Event capacity reached") {
              this.messageService.showMessage("Nombre de participants dépassés !");
            } else {
              console.error("Erreur lors de l'inscription du participant", error);
              this.messageService.showMessage("Erreur lors de l'inscription du participant.");
            }
          }
        );
      });
    }
  }
}
