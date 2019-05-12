import { Injectable } from '@angular/core';
import { Transport } from './transport.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  // This will share the data from the form
  formData: Transport;

  constructor(
    private firestore: AngularFirestore
  ) { }

  // We get the list from the Firestore database
  getList() {
    return this.firestore.collection('transport').snapshotChanges();
  }
}
