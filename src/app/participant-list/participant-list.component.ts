import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ParticipantService} from '../participant.service';
import {MessageService} from '../message.service';
import {ActivatedRoute, Router} from '@angular/router';

// Décorateur de composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  eventId?: number;
  participants: any[] = []; // Liste des participants
  currentPage = 1; // Page actuelle
  hasNextPage = false; // Si la page suivante existe
  hasPrevPage = false; // Si la page précédente existe
  searchTerm: string = ''; // Terme de recherche

  // Constructeur avec les services et modules nécessaires injectés
  constructor(
    private participantService: ParticipantService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  // Méthode exécutée après la création du composant
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
      if (this.eventId !== undefined) {
        this.loadParticipants(this.currentPage);
      }
    });
  }

  // Méthode pour charger les participants
  loadParticipants(page: number): void {
    this.participantService.getAllByPage(this.eventId!, page, this.searchTerm).subscribe(({participants, total}) => {
      this.participants = participants;
      this.hasPrevPage = page > 1;
      this.hasNextPage = page * 10 < total;
      this.changeDetector.detectChanges();
    });
  }

  // Méthode pour passer à la page suivante
  nextPage(): void {
    this.currentPage++;
    this.loadParticipants(this.currentPage);
  }

  // Méthode pour revenir à la page précédente
  prevPage(): void {
    this.currentPage--;
    this.loadParticipants(this.currentPage);
  }

  // Méthode pour mettre à jour le participant
  updateParticipant(eventId: number, participantId: number): void {
    this.router.navigate(['dashboard/', eventId, participantId]);
  }

  // Méthode pour supprimer un participant
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

  // Méthode à exécuter lors de la recherche
  onSearch(): void {
    // Réinitialiser la page actuelle et recharger les événements lorsqu'une nouvelle recherche est effectuée
    this.currentPage = 1;
    this.loadParticipants(1);
  }
}
