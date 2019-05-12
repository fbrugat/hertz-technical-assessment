import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
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
    private toastr: ToastrService,
    private http: HttpClient
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
      this.delete(id);
      this.toastr.warning('Succesfully deleted', 'Delete');
    }
  }

  onImport() {
    if (confirm('Are you sure to import the original CSV file? This will reset the list and you will lose all the previous changes.')) {

      // Delete all documents first...
      this.list.forEach(element => {
        this.delete(element.id);
      });

      // Import CSV file
      this.http.get('assets/my-uber-drives-2016.csv', { responseType: 'text' })
        .subscribe(data => {
          let first = true;

          const lines = data.split('\r');

          for (const line of lines) {
            // Except the first line
            if (first) {
              first = false;
            } else {
              const row = line.split(',');

              const item = {
                startDate: row[0] || '',
                endDate: row[1] || '',
                category: row[2] || '',
                start: row[3] || '',
                stop: row[4] || '',
                miles: Number(row[5]) || 0,
                purpose: row[6] || ''
              };

              this.firestore.collection('transport').add(item);

            }
          }

          this.toastr.success('List succesfully imported', 'Reset data');

        });

    }
  }

  delete(id: string) {
    this.firestore.doc('transport/' + id).delete();
  }

}
