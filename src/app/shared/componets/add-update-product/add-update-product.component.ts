import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    date: new FormControl('', [Validators.required]) // Campo de fecha
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(UtilsService);

  ngOnInit() {
  }

  async takeImage(){
    const dataUrl = (await this.utilsSvc.takePicture('imagen asistencia')).dataUrl
    this.form.controls.image.setValue(dataUrl)

  }

  async submit() {
    if (this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.singUp(this.form.value as User).then(async res =>{
        
        await this.firebaseSvc.updateUser(this.form.value.name)

        let uid = res.user.uid;

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color:'primary',
          position:'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() =>{
        loading.dismiss();
      })
    }
  }

  openCamera() {
    console.log("Abrir cámara");
    // Aquí puedes añadir la lógica para abrir la cámara
  }

}
