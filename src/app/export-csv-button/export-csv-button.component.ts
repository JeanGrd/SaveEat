import { Component, OnInit, Input } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-export-csv-button',
  templateUrl: './export-csv-button.component.html',
  styleUrls: ['./export-csv-button.component.css'],
})
export class ExportCsvButtonComponent implements OnInit {
  @Input() eventId?: number;

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {}

  exportToCsv(): void {
    if (this.eventId !== undefined) {
      this.eventService.getEvent(this.eventId).subscribe((event: any) => {
        console.log('Event data:', event[0]);
        const eventName = event[0].event_name;

        this.participantService.getParticipants(this.eventId!).subscribe((participants: any[]) => {
          this.generateCsvFile(participants, eventName);
        });
      });
    }
  }

  private generateCsvFile(participants: any[], eventName: string): void {
    // Définir les en-têtes du fichier CSV
    const headers = ['First Name', 'Last Name', 'Email', 'Phone Number'];

    // Générer les lignes du fichier CSV à partir des données des participants
    const rows = participants.map((participant) => [
      participant.first_name,
      participant.last_name,
      participant.email,
      participant.phone_number,
    ]);

    // Convertir les en-têtes et les lignes en une chaîne CSV
    const csvContent =
      headers.join(';') +
      '\n' +
      rows.map((row) => row.join(';')).join('\n');

    // Créer un fichier Blob à partir de la chaîne CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un lien pour télécharger le fichier Blob
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventName}_event.csv`);
    link.style.visibility = 'hidden';

    // Ajouter le lien au DOM, cliquer dessus pour déclencher le téléchargement, puis le supprimer
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
