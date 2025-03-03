import { Component, inject } from '@angular/core';
import { DestinationsService } from '../services/destinations.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-admin-manage-destinations',
  imports: [MatTableModule, RouterModule, MatIconModule],
  templateUrl: './admin-manage-destinations.component.html',
  styleUrl: './admin-manage-destinations.component.scss',
})
export class AdminManageDestinationsComponent {
  destinations_service = inject(DestinationsService);
  displayedColumns: string[] = [
    'destination_code',
    'destination_name',
    'airport_name',
    'airport_url',
    'actions',
  ];
  public get destinations() {
    return this.destinations_service.destinations;
  }
}
