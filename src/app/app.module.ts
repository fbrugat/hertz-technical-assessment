import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { TransportsComponent } from './transports/transports.component';
import { TransportComponent } from './transports/transport/transport.component';
import { TransportListComponent } from './transports/transport-list/transport-list.component';
import { TransportService } from './shared/transport.service';

@NgModule({
  declarations: [
    AppComponent,
    TransportsComponent,
    TransportComponent,
    TransportListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [TransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
