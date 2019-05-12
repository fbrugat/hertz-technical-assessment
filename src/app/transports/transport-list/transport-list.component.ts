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
    // Get the list from the shared service
    this.service.getList().subscribe(res => {
      this.list = res.map(item => {
        // We need to add the ID because Firestore will not return the id of the document on the .data structure
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Transport;
      });
    });
  }

  onEdit(data: Transport) {
    // We do a deep copy to not update the previous object and we fill the form
    this.service.formData = Object.assign({}, data);
  }

  onDelete(id: string) {
    // We display an alert
    if (confirm('Are you sure to delete this record?')) {
      this.delete(id);
      this.toastr.warning('Succesfully deleted', 'Delete');
    }
  }

  onImport() {
    // We display an alert
    if (confirm('Are you sure to import the original CSV file? This will reset the list and you will lose all the previous changes.')) {

      // We delete all documents first - Unfortunatlly Firestore has not a function to empty one collection
      this.list.forEach(element => {
        this.delete(element.id);
      });

      // We read the CSV file from the assets folder
      this.http.get('assets/my-uber-drives-2016.csv', { responseType: 'text' })
        .subscribe(data => {
          let first = true;

          // We split the documents line by line
          const lines = data.split('\r');

          for (const line of lines) {
            // Except the first line - wich is the headers
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

              // We add the line as a document into the 'Transport' collection
              this.firestore.collection('transport').add(item);

            }
          }

          // We display a successfull message
          this.toastr.success('List succesfully imported', 'Reset data');

        });

    }
  }

  delete(id: string) {
    // We delete the document from the collection
    this.firestore.doc('transport/' + id).delete();
  }

}
