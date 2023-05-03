import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css'],
})
export class UpdateParticipantComponent implements OnInit {
  eventId?: number;
  participantId?: number;
  participant?: any;
  isDataLoaded = false;

  constructor(
    private participantService: ParticipantService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.participantId = +this.route.snapshot.paramMap.get('participantId')!;

    // Récupérer les détails du participant
    this.participantService.getParticipant(this.eventId, this.participantId).subscribe(
      (response) => {
        this.participant = response[0]; // Ajoutez [0] pour extraire l'objet participant du tableau
        this.isDataLoaded = true;
      },
      (error) => {
        console.error('Error fetching participant details', error);
      }
    );
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      const participantData = {
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone_number: form.value.phoneNumber,
      };

      this.participantService
        .updateParticipant(this.eventId!, this.participantId!, participantData)
        .subscribe(
          (response) => {
            console.log('Participant updated', response);
            this.messageService.showMessage('Participant mis à jour avec succès !');
            this.router.navigate(['/event-details', this.eventId]);
          },
          (error) => {
            console.error('Error updating participant', error);
            this.messageService.showMessage("Erreur lors de la mise à jour du participant.");
          }
        );
    }
  }
}
