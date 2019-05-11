import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/shared/transport.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.sass']
})
export class TransportComponent implements OnInit {

  constructor(
    private service: TransportService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }

    this.service.formData = {
      id: null,
      startDate: '',
      endDate: '',
      category: '',
      start: '',
      stop: '',
      miles: 0,
      purpose: ''
    };
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    this.firestore.collection('transport').add(data);
    this.resetForm(form);
  }

}
