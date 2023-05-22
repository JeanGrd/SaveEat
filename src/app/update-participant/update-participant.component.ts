import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from '../message.service';
import {ParticipantService} from '../participant.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css'],
})
export class UpdateParticipantComponent implements OnInit {
  eventId?: number; // L'ID de l'événement
  participantId?: number; // L'ID du participant
  participant?: any; // Les détails du participant
  isDataLoaded = false; // Indique si les données ont été chargées

  constructor(
    private participantService: ParticipantService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    // Récupère l'ID de l'événement et du participant depuis les paramètres de la route
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.participantId = +this.route.snapshot.paramMap.get('participantId')!;

    // Récupère les détails du participant depuis le serveur
    this.participantService.getParticipant(this.eventId, this.participantId).subscribe(
      (response) => {
        this.participant = response[0]; // Prend le premier élément du tableau renvoyé par le serveur
        this.isDataLoaded = true; // Les données ont été chargées
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du participant', error);
      }
    );
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Récupère les données du formulaire
      const participantData = {
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone_number: form.value.phoneNumber,
      };

      // Met à jour le participant sur le serveur
      this.participantService
        .updateParticipant(this.eventId!, this.participantId!, participantData)
        .subscribe(
          (response) => {
            console.log('Participant mis à jour', response);
            this.messageService.showMessage('Participant mis à jour avec succès !');
            // Redirige vers la page de l'événement
            this.router.navigate(['dashboard/', this.eventId]);
            this.location.replaceState('dashboard/');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du participant', error);
            this.messageService.showMessage("Erreur lors de la mise à jour du participant.");
          }
        );
    }
  }
}
