import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JuntaService } from '../junta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './junta-create.component.html',
  styleUrls: ['./junta-create.component.scss'],
})
export class JuntaCreateComponent {
  inspectores: string[] = []; //Variable para almacenar los inspectores
  inspectores1!: Subscription; //Variable para controlar la subscripcion a los datos de los inspectores en tiempo real de la base de datos
  selectedInspector: string | undefined; //Variable para seleccionar el inspector

  fb = inject(FormBuilder); //Inyectamos el FormBuilder no necesitamos usar el constructor

  
  constructor(
    private juntaService: JuntaService = inject(JuntaService),
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Recupera los inspectores
    this.inspectores1 = this.juntaService.fechInspectors().subscribe(
      (data) => {
        this.juntaService.allInspectors = data;
        this.inspectores = data.map((inspector) => inspector.nombre);
        console.log('inspectores:'+this.inspectores);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de inspectores de la base de datos',
          'Cerrar'
        );
      }
    );
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['blue-snackbar'];
    config.horizontalPosition = 'end'; // Posición horizontal: 'start' | 'center' | 'end' | 'left' | 'right'
    config.verticalPosition = 'top'; // Posición vertical: 'top' | 'bottom'
    config.duration = 3000; // Duración en milisegundos (opcional)
    this.snackBar.open(message, action, config);
  }

  /*
  * Modelo de datos deFormulario para usarlo en el template y enlazarlo con la directiva  ngModel
  formData = {
    name: '',
    email: '',
    password: '',
  };
*/

  /*
  formData = this.fb.group({
    name: '',
    email: '',
    password: '',
    additionalEmails: this.fb.array([]), // Creamos un FormArray vacio para los emails adicionales
  });


    get additionalEmails() {  // Creamos un getter para acceder al FormArray de emails adicionales
      return this.formData.get('additionalEmails') as FormArray;
    }

    removeEmail(index: number) { // Creamos un metodo para eliminar un email adicional
      this.additionalEmails.removeAt(index);
    }

    addEmail() { // Creamos un metodo para agregar un email adicional
      this.additionalEmails.push(this.fb.control(''));
    }

    onSubmitted(){
      console.log(this.formData.value)
    }

    */

  /*
    FORMULARIO ANIDADO
  userProfileForm = this.fb.group({
    personalInfo: this.fb.group({
      name:'',
      email: '',
    }),
    address: this.fb.group({
      street: '',
      city: '',
      zipcode: '',
    }),
  });
*/

  // FORMULARIO DINAMICO
  userProfileForm = this.fb.group({
    personalInfo: this.fb.group({
      name: '',
      email: '',
    }),
    addresses: this.fb.array([
      this.fb.group({
        street: '',
        city: '',
        zipcode: '',
        inspector: '',
      }),
    ]),
  });

  get addressGroups() {
    return this.userProfileForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addressGroups.push(
      this.fb.group({
        street: '',
        city: '',
        zipcode: '',
        inspector: '',
      })
    );
  }

  removeAddress(index: number) {
    this.addressGroups.removeAt(index);
  }

  ngOndestrroy(): void {
    this.inspectores1.unsubscribe();
  }
}
