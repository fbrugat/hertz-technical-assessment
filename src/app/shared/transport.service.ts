import { Injectable } from '@angular/core';
import { Transport } from './transport.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  formData: Transport;

  constructor(
    private firestor: AngularFirestore
  ) { }

  getList() {
    return this.firestor.collection('transport').snapshotChanges();
  }
}
