import {Component, OnInit, Input} from '@angular/core';
import {ParticipantService} from "../participant.service";
import {MessageService} from "../message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit{
  @Input() eventId?: number;
  participants: any[] = [];

  constructor(
    private participantService: ParticipantService,
    private messageService: MessageService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (this.eventId !== undefined) {
      this.participantService.getParticipants(this.eventId).subscribe((participants: any[]) => {
        this.participants = participants;
      });
    }
  }

  updateParticipant(eventId: number, participantId: number): void {
    this.router.navigate(['dashboard/event-details', eventId, 'participants', participantId]);
  }


  deleteParticipant(participantId: number): void {
    this.participantService.deleteParticipant(this.eventId!, participantId).subscribe(
      () => {
        // Mettre à jour la liste des événements en filtrant l'événement supprimé
        this.participants = this.participants.filter(participant => participant.id !== participantId);

        // Afficher le message de réussite
        this.messageService.showMessage('Participant supprimé avec succès !', 'success');
      },
      error => {
        // Gérer les erreurs lors de la suppression de l'événement
        console.error('Erreur lors de la suppression du participant:', error);

        // Afficher le message d'erreur
        this.messageService.showMessage('Erreur lors de la suppression du participant', 'error');
      }
    );
  }


}
