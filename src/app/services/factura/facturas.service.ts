import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../environment';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  API_URI = API_BASE_URL+'/FacturasCaja'
  constructor(private http: HttpClient) { }
  getInvoices(sucursal_id: any){
    return this.http.post((this.API_URI), sucursal_id);
  }

  getInvoice(id: any){
    return this.http.get((this.API_URI)+ '/'+ id);
  }

  lapsInvoice(sucursal_id: any){
    return this.http.post((this.API_URI)+'/laps', sucursal_id);
  }

  allInvoices(sucursal_id: any){
    return this.http.post((this.API_URI)+'/all', sucursal_id);
  }

  lapsAllInvoices(sucursal_id: any){
    return this.http.post((this.API_URI)+'/allLaps', sucursal_id);
  }
}
