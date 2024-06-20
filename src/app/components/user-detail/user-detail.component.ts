import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface UserData {
  firstName: string;
  firstLastName: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [
    './user-detail.component.scss',
    '../user-form/user-form.component.scss',
  ],
})
export class UserDetailComponent implements OnInit {
  userDetail!: FormGroup; // Usamos '!' para indicar que será inicializado después

  userData: UserData = {
    firstName: '',
    firstLastName: '',
  };

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // Inicializamos userDetail aquí
    this.userDetail = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userDetail.disable();
    this.route.queryParams.subscribe((params) => {
      this.userData = {
        firstName: params['firstName'],
        firstLastName: params['firstLastName'],
      };

      // Actualizamos los valores del formulario
      this.userDetail.patchValue({
        name: this.userData.firstName,
        lastName: this.userData.firstLastName,
      });

      console.log('Datos recibidos en detalle:', this.userData);

      // Aquí puedes realizar cualquier lógica adicional con los datos recibidos
    });
  }

  goBack() {
    window.history.back();
  }
}
