import { Injectable } from '@angular/core';
import { Transport } from './transport.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  formData: Transport;

  constructor() { }
}
