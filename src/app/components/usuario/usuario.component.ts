import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UserComponent {

  userList: any = [];
  userForm: FormGroup | any;
  idUser: any;
  editableUser: boolean = false;

  constructor(private userService: UsuarioService, private toastr: ToastrService, private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  getAllUsers() {
    this.userService.getAllUsersData().subscribe((data: {}) => {
      this.userList = data;
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'nombreUsuario': '',
      'nombre': '',
      'apellido':'',
      'correo': '',
      'rol': ''
    });
    this.getAllUsers();
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  newUserEntry() {
    this.userService.newUser(this.userForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/inicio'])
          .then(() => {
            this.newMessage('Registro exitoso');
          })
      }
    );
  }

  updateUserEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.userForm.value) {
      if (this.userForm.value[key] === '') {
        this.userForm.removeControl(key);
      }
    }
    this.userService.updateUser(this.idUser, this.userForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Usuario editado");
      }
    );
  }

  toggleEditUser(id: any) {
    this.idUser = id;
    console.log(this.idUser)
    this.userService.getOneUser(id).subscribe(
      data => {
        this.userForm.setValue({
          nombreUsuario: data.nombreUsuario,
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          rol: data.rol
        });
      }
    );
    this.editableUser = !this.editableUser;
  }

  deleteUserEntry(id: any) {
    console.log(id)
    this.userService.deleteUser(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Usuario eliminado");
      }
    );
  }

}
