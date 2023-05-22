import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../message.service';
import {ParticipantService} from "../participant.service";
import {EventService} from "../event.service";
import {Location} from '@angular/common';

// Décorateur de composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-formulaire-inscription',
  templateUrl: './formulaire-inscription.component.html',
  styleUrls: ['./formulaire-inscription.component.css'],
})
export class FormulaireInscriptionComponent {
  // Déclaration des services et modules utilisés dans le constructeur
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private participantService: ParticipantService,
    private eventService: EventService,
    private location: Location,
  ) {
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const eventId = params['eventId'];
      // Vérifie si l'événement est complet. Si oui, il redirige vers la page de l'événement
      this.eventService.isFull(eventId).subscribe((isFull) => {
        if (isFull) {
          this.router.navigate(['/events', eventId]);
        }
      });
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Création de l'objet participantData à partir des valeurs du formulaire
      const participantData = {
        first_name: form.value.first_name.toString(),
        last_name: form.value.last_name.toString(),
        email: form.value.email.toString(),
        phone_number: form.value.phone_number.toString(),
      };

      // Inscription du participant à l'événement
      this.route.params.subscribe((params) => {

        this.participantService.createParticipant(params['eventId'], participantData).subscribe(
          (response) => {
            console.log('Participant inscrit', response);
            // Affichage du message de réussite de l'inscription
            this.messageService.showMessage("L'inscription du participant a réussi !");
            // Redirection vers la page de l'événement
            this.router.navigate(['/events', params['eventId']]);
            // Remplacement de l'état actuel de l'historique par '/events'
            this.location.replaceState('/events');
          },
          (error) => {
            // Gestion des erreurs
            if (error.error.error === "Event capacity reached") {
              // Si l'événement a atteint sa capacité maximale
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
