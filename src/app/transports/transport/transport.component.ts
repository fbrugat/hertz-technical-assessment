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
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id === null) {
      this.firestore.collection('transport').add(data);
      this.toastr.success('Succesfully created', 'Create');
    } else {
      this.firestore.doc('transport/' + form.value.id).update(data);
      this.toastr.success('Succesfully updated', 'Update');
    }
    this.resetForm(form);
  }

}
