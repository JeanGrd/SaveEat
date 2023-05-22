// export-csv-button.component.ts
import {Component, OnInit, Input} from '@angular/core';
import {ParticipantService} from '../participant.service'; // Import du service ParticipantService pour interagir avec les données de participants
import {EventService} from '../event.service'; // Import du service EventService pour interagir avec les données d'événements

// Décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-export-csv-button',
  templateUrl: './export-csv-button.component.html',
  styleUrls: ['./export-csv-button.component.css'],
})
export class ExportCsvButtonComponent implements OnInit {
  @Input() eventId?: number; // L'id de l'événement à exporter est un input du composant

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
  }

  // Cette méthode est appelée lorsque l'utilisateur clique sur le bouton d'exportation
  exportToCsv(): void {
    if (this.eventId !== undefined) {
      this.eventService.getEvent(this.eventId).subscribe((event: any) => {
        console.log('Event data:', event[0]);
        const eventName = event[0].event_name; // On récupère le nom de l'événement

        // On récupère tous les participants de l'événement
        this.participantService.getAll(this.eventId!).subscribe((participants: any[]) => {
          // On génère le fichier CSV à partir des données des participants
          this.generateCsvFile(participants, eventName);
        });
      });
    }
  }

  // Cette méthode génère un fichier CSV à partir des données des participants
  private generateCsvFile(participants: any[], eventName: string): void {
    // Définir les en-têtes du fichier CSV
    const headers = ['First Name', 'Last Name', 'Email', 'Phone Number'];

    // Créer les lignes du CSV
    const rows = participants.map((participant) => [
      participant.first_name,
      participant.last_name,
      participant.email,
      participant.phone_number,
    ]);

    // Créer le contenu du CSV
    const csvContent =
      headers.join(';') +
      '\n' +
      rows.map((row) => row.join(';')).join('\n');

    // Créer un blob à partir du contenu du CSV
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

    // Créer un lien de téléchargement pour le fichier CSV
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventName}_event.csv`);
    link.style.visibility = 'hidden';

    // Ajouter le lien au corps du document et déclencher le clic sur le lien pour démarrer le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
