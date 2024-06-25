import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-create-ebook',
  templateUrl: './create-ebook.component.html',
})
export class CreateEbookComponent implements OnInit {

  createForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ebookService: EbookService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createForm = this.fb.group({
      title: [''],
      author: [''],
      genre: [''],
      format: [''],
      price: ['']
    });
  }

  create() {
    this.ebookService.createEbook(this.createForm.value).subscribe({
      next: () => {
        console.log('Ebook creado con éxito');
        // Puedes redirigir a otra página después de crear el ebook
      },
      error: (err) => {
        console.error('Error al crear el ebook', err);
      }
    });
  }
}
