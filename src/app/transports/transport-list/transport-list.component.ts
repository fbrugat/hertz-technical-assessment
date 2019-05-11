import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TransportService } from 'src/app/shared/transport.service';
import { Transport } from 'src/app/shared/transport.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.sass']
})
export class TransportListComponent implements OnInit {

  list: Transport[];

  constructor(
    private service: TransportService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.service.getList().subscribe(res => {
      this.list = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Transport;
      });
    });
  }

  onEdit(data: Transport) {
    this.service.formData = Object.assign({}, data);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('transport/' + id).delete();
      this.toastr.warning('Succesfully deleted', 'Delete');
    }
  }

}
