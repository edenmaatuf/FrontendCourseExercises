import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Destination } from '../types';
import { DestinationsService } from '../services/destinations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.scss',
})
export class DestinationDetailsComponent {
  destination?: Destination;

  destinations_service = inject(DestinationsService);
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('destination_code'); // Retrieve the parameter
    if (!code || isNaN(+code)) {
      alert('Invalid destination code provided.');
      this.router.navigate(['/admin-manage-destinations']); // If no code is provided, redirect to the destinations page
      return;
    }
    const dest = this.destinations_service.destinations.find(
      (d) => d.destination_code == +code
    ); // Find the destination with the matching code
    if (!dest) {
      alert('Destination not found.');
      this.router.navigate(['/admin-manage-destinations']); // If no destination is found, redirect to the destinations page
      return;
    }
    this.destination = dest;
  }
}
