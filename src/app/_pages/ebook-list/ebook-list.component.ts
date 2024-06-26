import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-ebook-update',
  templateUrl: './ebook-list.component.html',
  styles: []
})
export class EbookUpdateComponent implements OnInit {
  idForm: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ebookService: EbookService,
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.idForm = this.fb.group({
      id: [''] // Inicializa el formulario para manejar el ID
    });

    this.editForm = this.fb.group({
      author: [''],
      genre: [''],
      format: [''],
      price: ['']
    });
  }

  create() {
    const id = this.idForm.get('id')?.value;
    const ebookData = this.editForm.value;

    this.ebookService.updateEbook(ebookData, id).subscribe({
      next: () => {
        console.log('Ebook actualizado con éxito');
        // Puedes redirigir a otra página después de actualizar el ebook si es necesario
      },
      error: (err) => {
        console.error('Error al actualizar el ebook', err);
      }
    });
  }
}
