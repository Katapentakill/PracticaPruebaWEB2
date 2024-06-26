import { Component, OnInit } from '@angular/core';
import { EbookService } from 'src/app/_services/ebook.service';
import { listEbook } from 'src/app/_interfaces/list-ebook';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  ebooks: listEbook[] = [];
  editForm: FormGroup = new FormGroup({});
  selectedEbookId: number | null = null;

  constructor(private ebookService: EbookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchEbooks();
    this.initializeForm();
  }

  fetchEbooks(): void {
    this.ebookService.allBooks().subscribe(
      (data: listEbook[]) => {
        this.ebooks = data;
        console.log('Ebooks received:', this.ebooks);
      },
      (error) => {
        console.error('Error fetching ebooks:', error);
      }
    );
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      author: [''],
      genre: [''],
      format: [''],
      price: ['']
    });
  }

  selectEbook(ebook: listEbook): void {
    this.selectedEbookId = ebook.id;
    this.editForm.patchValue({
      author: ebook.author,
      genre: ebook.genre,
      format: ebook.format,
      price: ebook.price
    });
  }

  updateEbook(): void {
    if (this.selectedEbookId !== null) {
      const ebookData = this.editForm.value;
      this.ebookService.updateEbook(ebookData, this.selectedEbookId).subscribe({
        next: () => {
          console.log('Ebook updated successfully');
          this.fetchEbooks(); // Refresh the list after update
          this.selectedEbookId = null; // Reset selected ebook
        },
        error: (err) => {
          console.error('Error updating ebook', err);
        }
      });
    }
  }

  deleteEbook(id: number): void {
    this.ebookService.deleteEbook(id).subscribe({
      next: () => {
        console.log('Ebook deleted successfully');
        this.fetchEbooks(); // Refresh the list after delete
      },
      error: (err) => {
        console.error('Error deleting ebook', err);
      }
    });
  }
}
