import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  standalone: true,
  imports: [],
  templateUrl: './pagination-button.component.html',
  styleUrl: './pagination-button.component.scss'
})
export class PaginationButtonComponent {
  @Output() onPagination = new EventEmitter<void>();

}
