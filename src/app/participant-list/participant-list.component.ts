import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ParticipantService } from '../participant.service';
import { MessageService } from '../message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  eventId?: number;
  participants: any[] = [];
  currentPage = 1;
  hasNextPage = false;
  hasPrevPage = false;
  searchTerm: string = '';

  constructor(
    private participantService: ParticipantService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
      if (this.eventId !== undefined) {
        this.loadParticipants(this.currentPage);
      }
    });
  }

  loadParticipants(page: number): void {
    this.participantService.getAllByPage(this.eventId!, page, this.searchTerm).subscribe(({ participants, total }) => {
      this.participants = participants;
      this.hasPrevPage = page > 1;
      this.hasNextPage = page * 10 < total;
      this.changeDetector.detectChanges();
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadParticipants(this.currentPage);
  }

  prevPage(): void {
    this.currentPage--;
    this.loadParticipants(this.currentPage);
  }

  updateParticipant(eventId: number, participantId: number): void {
    this.router.navigate(['dashboard/', eventId, participantId]);
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

  onSearch(): void {
    // Reset the current page and reload events when a new search is performed
    this.currentPage = 1;
    this.loadParticipants(1);
  }

}
