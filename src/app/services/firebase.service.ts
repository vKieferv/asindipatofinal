import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  //=== Autenticacion ===

  getAuth(){
    return getAuth();
  }

  //=== Acceder ===
  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=== Crear ===
  singUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=== actualizar ===
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }
  //=== recuperar contraseña ===
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }



  //=== Base de Datos ===

  //=== Setear un documento ===
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //=== Setear un documento ===
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }


}