import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/shared/transport.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.sass']
})
export class TransportComponent implements OnInit {

  constructor(
    private service: TransportService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }

    // We update the formData from the shared service
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
    // We make a copy using the assing to do a deep copy
    const data = Object.assign({}, form.value);

    // We delete the id from the object becouse we don't need it adding or updating the doc
    delete data.id;

    // If we don't have ID then we are creating a new document
    if (form.value.id === null) {
      this.firestore.collection('transport').add(data);
      this.toastr.success('Succesfully created', 'Create');
    // Otherwise, we are updating an existing document
    } else {
      this.firestore.doc('transport/' + form.value.id).update(data);
      this.toastr.success('Succesfully updated', 'Update');
    }

    // After create or update we will reset the form with the initial values
    this.resetForm(form);
  }

}
