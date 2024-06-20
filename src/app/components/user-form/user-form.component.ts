import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  formattedDocumentNumber: string = '';
  dataLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: DataService
  ) {
    this.userForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  formatNumber() {
    const value = this.userForm.get('documentNumber')?.value.replace(/\D/g, '');
    this.formattedDocumentNumber = new Intl.NumberFormat('de-DE').format(
      Number(value)
    );

    // Actualizar el valor del formulario sin formateo
    this.userForm.get('documentNumber')?.setValue(value, { emitEvent: false });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.dataLoading = true;
      this.apiService
        .getUserData(
          this.userForm.get('documentNumber')?.value,
          this.userForm.get('documentType')?.value
        )
        .subscribe(
          (data) => {
            this.dataLoading = false;
            //ir a componente detalle
            const { firstName, firstLastName } = data.data;
            this.router.navigate(['/detail'], {
              queryParams: { firstName, firstLastName },
            });
          },
          (error) => {
            this.dataLoading = false;
            console.log(error);
            alert(error.error.message);
          }
        );
    }
  }
}
