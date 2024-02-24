import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BebidasFriasComponent } from './bebidasFrias/bebidas-frias/bebidas-frias.component';
import { EditFormBebidasFriasComponent } from './bebidasFrias/edit-form-bebidas-frias/edit-form-bebidas-frias.component';
import { CreateFormBebidasFriasComponent } from './bebidasFrias/create-form-bebidas-frias/create-form-bebidas-frias.component';
import { LoginAdminComponent } from './account/2login-admin/login-admin.component';
import { NavbarComponent } from './principal/navbar/navbar.component';

import { BebidasFriasService } from './services/bebidas.frias.service';
import { SigninAdminService } from './services/signin-admin.service';
import { ProductosMenuComponent } from './productos/productos-menu/productos-menu.component';
import { MenuBebidasComponent } from './productos/menu-bebidas/menu-bebidas.component';
import { AuthService } from './services/auth-service.service';
import { BebidasCalientesComponent } from './bebidasCalientes/bebidas-calientes/bebidas-calientes.component';
import { CreateFormBebidasCalientesComponent } from './bebidasCalientes/create-form-bebidas-calientes/create-form-bebidas-calientes.component';
import { EditFormBebidasCalientesComponent } from './bebidasCalientes/edit-form-bebidas-calientes/edit-form-bebidas-calientes.component';
import { MenuCrepasComponent } from './productos/menu-crepas/menu-crepas.component';
import { MenuWaflesComponent } from './productos/menu-wafles/menu-wafles.component';
import { MenuCrepaSaladaComponent } from './productos/menu-crepa-salada/menu-crepa-salada.component';
import { MenuCrepaDulceComponent } from './productos/menu-crepa-dulce/menu-crepa-dulce.component';
import { EditFormCrepaDulceHarinaComponent } from './crepaDulce/Harinas/edit-form-crepa-dulce-harina/edit-form-crepa-dulce-harina.component';
import { CreateFormCrepaDulceHarinaComponent } from './crepaDulce/Harinas/create-form-crepa-dulce-harina/create-form-crepa-dulce-harina.component';
import { CrepaDulceHarinaComponent } from './crepaDulce/Harinas/crepa-dulce-harina/crepa-dulce-harina.component';
import { CreateFormCrepaDulceUntableComponent } from './crepaDulce/ingredientesUntables/create-form-crepa-dulce-untable/create-form-crepa-dulce-untable.component';
import { EditFormCrepaDulceUntableComponent } from './crepaDulce/ingredientesUntables/edit-form-crepa-dulce-untable/edit-form-crepa-dulce-untable.component';
import { CrepaDulceUntableComponent } from './crepaDulce/ingredientesUntables/crepa-dulce-untable/crepa-dulce-untable.component';
import { CrepaDulceComplementarioComponent } from './crepaDulce/ingredientesComplementarios/crepa-dulce-complementario/crepa-dulce-complementario.component';
import { CreateFormCrepaDulceComplementarioComponent } from './crepaDulce/ingredientesComplementarios/create-form-crepa-dulce-complementario/create-form-crepa-dulce-complementario.component';
import { EditFormCrepaDulceComplementarioComponent } from './crepaDulce/ingredientesComplementarios/edit-form-crepa-dulce-complementario/edit-form-crepa-dulce-complementario.component';
import { EditFormCrepaDulceNieveComponent } from './crepaDulce/nieve/edit-form-crepa-dulce-nieve/edit-form-crepa-dulce-nieve.component';
import { CreateFormCrepaDulceNieveComponent } from './crepaDulce/nieve/create-form-crepa-dulce-nieve/create-form-crepa-dulce-nieve.component';
import { CrepaDulceNieveComponent } from './crepaDulce/nieve/crepa-dulce-nieve/crepa-dulce-nieve.component';
import { CreateFormCrepaDulcePreciosComponent } from './crepaDulce/precios/create-form-crepa-dulce-precios/create-form-crepa-dulce-precios.component';
import { EditFormCrepaDulcePreciosComponent } from './crepaDulce/precios/edit-form-crepa-dulce-precios/edit-form-crepa-dulce-precios.component';
import { CrepaDulcePreciosComponent } from './crepaDulce/precios/crepa-dulce-precios/crepa-dulce-precios.component';
import { CreateFormCrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/create-form-crepa-salada-ingrediente-principal/create-form-crepa-salada-ingrediente-principal.component';
import { EditFormCrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/edit-form-crepa-salada-ingrediente-principal/edit-form-crepa-salada-ingrediente-principal.component';
import { CrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/crepa-salada-ingrediente-principal/crepa-salada-ingrediente-principal.component';
import { CrepaSaladaAderesoComponent } from './crepaSalada/adereso/crepa-salada-adereso/crepa-salada-adereso.component';
import { CreateFromCrepaSaladaAderesoComponent } from './crepaSalada/adereso/create-from-crepa-salada-adereso/create-from-crepa-salada-adereso.component';
import { EditFromCrepaSaladaAderesoComponent } from './crepaSalada/adereso/edit-from-crepa-salada-adereso/edit-from-crepa-salada-adereso.component';
import { EditFromCrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/edit-from-crepa-salada-ensalada-individual/edit-from-crepa-salada-ensalada-individual.component';
import { CreateFromCrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/create-from-crepa-salada-ensalada-individual/create-from-crepa-salada-ensalada-individual.component';
import { CrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/crepa-salada-ensalada-individual/crepa-salada-ensalada-individual.component';
import { CrepaSaladaBotanaComponent } from './crepaSalada/botana/crepa-salada-botana/crepa-salada-botana.component';
import { CreateFormCrepaSaladaBotanaComponent } from './crepaSalada/botana/create-form-crepa-salada-botana/create-form-crepa-salada-botana.component';
import { EditFormCrepaSaladaBotanaComponent } from './crepaSalada/botana/edit-form-crepa-salada-botana/edit-form-crepa-salada-botana.component';
import { EditFormCrepaSaladaPrecioComponent } from './crepaSalada/precio/edit-form-crepa-salada-precio/edit-form-crepa-salada-precio.component';
import { CreateFormCrepaSaladaPrecioComponent } from './crepaSalada/precio/create-form-crepa-salada-precio/create-form-crepa-salada-precio.component';
import { CrepaSaladaPrecioComponent } from './crepaSalada/precio/crepa-salada-precio/crepa-salada-precio.component';
import { CreateFormIngredienteUntableComponent } from './waffles/ingredienteUntable/create-form-ingrediente-untable/create-form-ingrediente-untable.component';
import { EditFormIngredienteUntableComponent } from './waffles/ingredienteUntable/edit-form-ingrediente-untable/edit-form-ingrediente-untable.component';
import { IngredienteUntableComponent } from './waffles/ingredienteUntable/ingrediente-untable/ingrediente-untable.component';
import { EditFormIngredienteComplementarioComponent } from './waffles/ingredienteComplementario/edit-form-ingrediente-complementario/edit-form-ingrediente-complementario.component';
import { CreateFormIngredienteComplementarioComponent } from './waffles/ingredienteComplementario/create-form-ingrediente-complementario/create-form-ingrediente-complementario.component';
import { IngredienteComplementarioComponent } from './waffles/ingredienteComplementario/ingrediente-complementario/ingrediente-complementario.component';
import { CreateFormNieveComponent } from './waffles/nieve/create-form-nieve/create-form-nieve.component';
import { EditFormNieveComponent } from './waffles/nieve/edit-form-nieve/edit-form-nieve.component';
import { NieveComponent } from './waffles/nieve/nieve/nieve.component';
import { CreateFormPrecioComponent } from './waffles/precio/create-form-precio/create-form-precio.component';
import { EditFormPrecioComponent } from './waffles/precio/edit-form-precio/edit-form-precio.component';
import { PrecioComponent } from './waffles/precio/precio/precio.component';
import { CreateFormUsuarioCajaComponent } from './usuarios/usuariosCaja/create-form-usuario-caja/create-form-usuario-caja.component';
import { EditFormUsuarioCajaComponent } from './usuarios/usuariosCaja/edit-form-usuario-caja/edit-form-usuario-caja.component';
import { UsuarioCajaComponent } from './usuarios/usuariosCaja/usuario-caja/usuario-caja.component';
import { UsuarioEcommerComponent } from './usuarios/usuariosEcommer/usuario-ecommer/usuario-ecommer.component';
import { CreateFormUsuarioEcommerComponent } from './usuarios/usuariosEcommer/create-form-usuario-ecommer/create-form-usuario-ecommer.component';
import { EditFormUsuarioEcommerComponent } from './usuarios/usuariosEcommer/edit-form-usuario-ecommer/edit-form-usuario-ecommer.component';
import { MenuUsuariosComponent } from './usuarios/menu/menu-usuarios/menu-usuarios.component';
import { MenuPrincipalComponent } from './menuPrincipal/menu-principal/menu-principal.component';
import { SucursalesCreateFormComponent } from './sucursales/sucursales-create-form/sucursales-create-form.component';
import { SucursalesEditFormComponent } from './sucursales/sucursales-edit-form/sucursales-edit-form.component';
import { SucursalesComponent } from './sucursales/sucursales/sucursales.component';
import { PrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/precio-waffle-canasta/precio-waffle-canasta.component';
import { CreateFormPrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/create-form-precio-waffle-canasta/create-form-precio-waffle-canasta.component';
import { EditFormPrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/edit-form-precio-waffle-canasta/edit-form-precio-waffle-canasta.component';
import { AderesoBaseComponent } from './crepaSalada/aderesoBase/adereso-base/adereso-base.component';
import { AderesoBaseCreateFormComponent } from './crepaSalada/aderesoBase/adereso-base-create-form/adereso-base-create-form.component';
import { AderesoBaseEditFormComponent } from './crepaSalada/aderesoBase/adereso-base-edit-form/adereso-base-edit-form.component';
import { IngredientesBaseComponent } from './crepaSalada/ingredientesBase/ingredientes-base/ingredientes-base.component';
import { IngredientesBaseCreateFormComponent } from './crepaSalada/ingredientesBase/ingredientes-base-create-form/ingredientes-base-create-form.component';
import { IngredientesBaseEditFormComponent } from './crepaSalada/ingredientesBase/ingredientes-base-edit-form/ingredientes-base-edit-form.component';
import { CreateFormIngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/create-form-ingredientes-untables/create-form-ingredientes-untables.component';
import { EditFormIngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/edit-form-ingredientes-untables/edit-form-ingredientes-untables.component';
import { IngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/ingredientes-untables/ingredientes-untables.component';
import { CreateFormNivesWaffleCanastaComponent } from './waffleCanasta/nieves/create-form-nives/create-form-nives.component';
import { EditFormNivesWaffleCanastaComponent } from './waffleCanasta/nieves/edit-form-nives/edit-form-nives.component';
import { NivesWaffleCanastaComponent } from './waffleCanasta/nieves/nives/nives.component';
import { MenuWaffleCanastaComponent } from './productos/menu-waffle-canasta/menu-waffle-canasta.component';
import { CreateFormIngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/create-form-ingredientes-complementarios/create-form-ingredientes-complementarios.component';
import { EditFormIngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/edit-form-ingredientes-complementarios/edit-form-ingredientes-complementarios.component';
import { IngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/ingredientes-complementarios/ingredientes-complementarios.component';
import { BebidasCalientesStockComponent } from './bebidasCalientes/bebidas-calientes-stock/bebidas-calientes-stock.component';
import { BebidasFriasStockComponent } from './bebidasFrias/bebidas-frias-stock/bebidas-frias-stock.component';
import { CrepaDulceHarinasStockComponent } from './crepaDulce/Harinas/crepa-dulce-harinas-stock/crepa-dulce-harinas-stock.component';
import { CrepaDulceIngredientesComplementariosStockComponent } from './crepaDulce/ingredientesComplementarios/crepa-dulce-ingredientes-complementarios-stock/crepa-dulce-ingredientes-complementarios-stock.component';
import { CrepaDulceIngredientesUntablesStockComponent } from './crepaDulce/ingredientesUntables/crepa-dulce-ingredientes-untables-stock/crepa-dulce-ingredientes-untables-stock.component';
import { CrepaDulceNieveStockComponent } from './crepaDulce/nieve/crepa-dulce-nieve-stock/crepa-dulce-nieve-stock.component';
import { CrepaSaladaAderesoStockComponent } from './crepaSalada/adereso/crepa-salada-adereso-stock/crepa-salada-adereso-stock.component';
import { CrepaSaladaAderesoBaseStockComponent } from './crepaSalada/aderesoBase/crepa-salada-adereso-base-stock/crepa-salada-adereso-base-stock.component';
import { CrepaSaladaBotanaStockComponent } from './crepaSalada/botana/crepa-salada-botana-stock/crepa-salada-botana-stock.component';
import { CrepaSaladaEnsaladaIndividualStockComponent } from './crepaSalada/ensaladaIndividual/crepa-salada-ensalada-individual-stock/crepa-salada-ensalada-individual-stock.component';
import { CrepaSaladaIngredientePrincipalStockComponent } from './crepaSalada/ingredientePrincipal/crepa-salada-ingrediente-principal-stock/crepa-salada-ingrediente-principal-stock.component';
import { CrepaSaladaIngredienteBaseStockComponent } from './crepaSalada/ingredientesBase/crepa-salada-ingrediente-base-stock/crepa-salada-ingrediente-base-stock.component';
import { WaffleCanastaNievesStockComponent } from './waffleCanasta/nieves/waffle-canasta-nieves-stock/waffle-canasta-nieves-stock.component';
import { WaffleCanastaIngredienteUntableStockComponent } from './waffleCanasta/ingredienteUntable/waffle-canasta-ingrediente-untable-stock/waffle-canasta-ingrediente-untable-stock.component';
import { WaffleCanastaIngredienteComplementarioStockComponent } from './waffleCanasta/ingredienteComplementario/waffle-canasta-ingrediente-complementario-stock/waffle-canasta-ingrediente-complementario-stock.component';
import { WafflesIngredienteComplementarioStockComponent } from './waffles/ingredienteComplementario/waffles-ingrediente-complementario-stock/waffles-ingrediente-complementario-stock.component';
import { WafflesIngredienteUntableStockComponent } from './waffles/ingredienteUntable/waffles-ingrediente-untable-stock/waffles-ingrediente-untable-stock.component';
import { WafflesNieveStockComponent } from './waffles/nieve/waffles-nieve-stock/waffles-nieve-stock.component';
import { MenuBebidasStockComponent } from './stocks/menu-bebidas-stock/menu-bebidas-stock.component';
import { MenuCrepaDulceStockComponent } from './stocks/menu-crepa-dulce-stock/menu-crepa-dulce-stock.component';
import { MenuCrepaSaladaStockComponent } from './stocks/menu-crepa-salada-stock/menu-crepa-salada-stock.component';
import { MenuCrepasStockComponent } from './stocks/menu-crepas-stock/menu-crepas-stock.component';
import { MenuWaffleCanastaStockComponent } from './stocks/menu-waffle-canasta-stock/menu-waffle-canasta-stock.component';
import { MenuWaffleStockComponent } from './stocks/menu-waffle-stock/menu-waffle-stock.component';
import { StockMenuComponent } from './stocks/stock-menu/stock-menu.component';
import { BebidasCalientesVentasComponent } from './bebidasCalientes/bebidas-calientes-ventas/bebidas-calientes-ventas.component';
import { BebidasFriasVentasComponent } from './bebidasFrias/bebidas-frias-ventas/bebidas-frias-ventas.component';
import { CrepaDulceHarinasVentasComponent } from './crepaDulce/Harinas/crepa-dulce-harinas-ventas/crepa-dulce-harinas-ventas.component';
import { CrepaDulceIngredientesComplementariosVentasComponent } from './crepaDulce/ingredientesComplementarios/crepa-dulce-ingredientes-complementarios-ventas/crepa-dulce-ingredientes-complementarios-ventas.component';
import { CrepaDulceIngredientesUntablesVentasComponent } from './crepaDulce/ingredientesUntables/crepa-dulce-ingredientes-untables-ventas/crepa-dulce-ingredientes-untables-ventas.component';
import { CrepaDulceNieveVentasComponent } from './crepaDulce/nieve/crepa-dulce-nieve-ventas/crepa-dulce-nieve-ventas.component';
import { CrepaSaladaAderesoVentasComponent } from './crepaSalada/adereso/crepa-salada-adereso-ventas/crepa-salada-adereso-ventas.component';
import { CrepaSaladaAderesoBaseVentasComponent } from './crepaSalada/aderesoBase/crepa-salada-adereso-base-ventas/crepa-salada-adereso-base-ventas.component';
import { CrepaSaladaBotanaVentasComponent } from './crepaSalada/botana/crepa-salada-botana-ventas/crepa-salada-botana-ventas.component';
import { CrepaSaladaEnsaladaIndividualVentasComponent } from './crepaSalada/ensaladaIndividual/crepa-salada-ensalada-individual-ventas/crepa-salada-ensalada-individual-ventas.component';
import { CrepaSaladaIngredientePrincipalVentasComponent } from './crepaSalada/ingredientePrincipal/crepa-salada-ingrediente-principal-ventas/crepa-salada-ingrediente-principal-ventas.component';
import { CrepaSaladaIngredienteBaseVentasComponent } from './crepaSalada/ingredientesBase/crepa-salada-ingrediente-base-ventas/crepa-salada-ingrediente-base-ventas.component';
import { WaffleCanastaIngredienteComplementarioVentasComponent } from './waffleCanasta/ingredienteComplementario/waffle-canasta-ingrediente-complementario-ventas/waffle-canasta-ingrediente-complementario-ventas.component';
import { WaffleCanastaIngredienteUntableVentasComponent } from './waffleCanasta/ingredienteUntable/waffle-canasta-ingrediente-untable-ventas/waffle-canasta-ingrediente-untable-ventas.component';
import { WaffleCanastaNievesVentasComponent } from './waffleCanasta/nieves/waffle-canasta-nieves-ventas/waffle-canasta-nieves-ventas.component';
import { WafflesNieveVentasComponent } from './waffles/nieve/waffles-nieve-ventas/waffles-nieve-ventas.component';
import { WafflesIngredienteUntableVentasComponent } from './waffles/ingredienteUntable/waffles-ingrediente-untable-ventas/waffles-ingrediente-untable-ventas.component';
import { WafflesIngredienteComplementarioVentasComponent } from './waffles/ingredienteComplementario/waffles-ingrediente-complementario-ventas/waffles-ingrediente-complementario-ventas.component';
import { FacturasComponent } from './facturas/facturas/facturas.component';
import { ViewFacturaComponent } from './facturas/view-factura/view-factura.component';
import { MenuBebidasSalesComponent } from './sales/menu-bebidas-sales/menu-bebidas-sales.component';
import { MenuCrepaDulceSalesComponent } from './sales/menu-crepa-dulce-sales/menu-crepa-dulce-sales.component';
import { MenuCrepaSaladaSalesComponent } from './sales/menu-crepa-salada-sales/menu-crepa-salada-sales.component';
import { MenuCrepasSalesComponent } from './sales/menu-crepas-sales/menu-crepas-sales.component';
import { MenuWafflesCanastaSalesComponent } from './sales/menu-waffles-canasta-sales/menu-waffles-canasta-sales.component';
import { MenuWafflesSalesComponent } from './sales/menu-waffles-sales/menu-waffles-sales.component';
import { SalesMenuComponent } from './sales/sales-menu/sales-menu.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertDialogService } from './alert-dialog.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FacturasSucursalComponent } from './facturas/facturas-sucursal/facturas-sucursal.component';
import { ViewUsuarioComponent } from './usuarios/view-usuario/view-usuario.component';
import { AdminSucursalMenuComponent } from './admin-sucursal-menu/admin-sucursal-menu.component';
import { MenuWaffleStockRegularComponent } from './stocks/menu-waffle-regular/menu-waffle-regular.component';

// Global Sales
import { BebidasCalientesVentasGlobalesComponent } from './VentasGlobales/bebidasCalientes/bebidas-calientes-ventas/bebidas-calientes-ventas.component';
import { BebidasFriasVentasGlobalesComponent } from './VentasGlobales/bebidasFrias/bebidas-frias-ventas/bebidas-frias-ventas.component';
import { CrepaDulceHarinasVentasGlobalesComponent } from './VentasGlobales/CrepaDulce/crepa-dulce-harinas-ventas/crepa-dulce-harinas-ventas.component';
import { CrepaDulceIngredientesComplementariosVentasGlobalesComponent } from './VentasGlobales/CrepaDulce/crepa-dulce-ingredientes-complementarios-ventas/crepa-dulce-ingredientes-complementarios-ventas.component';
import { CrepaDulceIngredientesUntablesVentasGlobalesComponent } from './VentasGlobales/CrepaDulce/crepa-dulce-ingredientes-untables-ventas/crepa-dulce-ingredientes-untables-ventas.component';
import { CrepaDulceNieveVentasGlobalesComponent } from './VentasGlobales/CrepaDulce/crepa-dulce-nieve-ventas/crepa-dulce-nieve-ventas.component';
import { CrepaSaladaAderesoVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-adereso-ventas/crepa-salada-adereso-ventas.component';
import { CrepaSaladaAderesoBaseVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-adereso-base-ventas/crepa-salada-adereso-base-ventas.component';
import { CrepaSaladaBotanaVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-botana-ventas/crepa-salada-botana-ventas.component';
import { CrepaSaladaEnsaladaIndividualVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-ensalada-individual-ventas/crepa-salada-ensalada-individual-ventas.component';
import { CrepaSaladaIngredientePrincipalVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-ingrediente-principal-ventas/crepa-salada-ingrediente-principal-ventas.component';
import { CrepaSaladaIngredienteBaseVentasGlobalesComponent } from './VentasGlobales/CrepaSalada/crepa-salada-ingrediente-base-ventas/crepa-salada-ingrediente-base-ventas.component';
import { WaffleCanastaIngredienteComplementarioVentasGlobalesComponent } from './VentasGlobales/waffleCanasta/waffle-canasta-ingrediente-complementario-ventas/waffle-canasta-ingrediente-complementario-ventas.component';
import { WaffleCanastaIngredienteUntableVentasGlobalesComponent } from './VentasGlobales/waffleCanasta/waffle-canasta-ingrediente-untable-ventas/waffle-canasta-ingrediente-untable-ventas.component';
import { WaffleCanastaNievesVentasGlobalesComponent } from './VentasGlobales/waffleCanasta/waffle-canasta-nieves-ventas/waffle-canasta-nieves-ventas.component';
import { WafflesNieveVentasGlobalesComponent } from './VentasGlobales/waffle/waffles-nieve-ventas/waffles-nieve-ventas.component';
import { WafflesIngredienteUntableVentasGlobalesComponent } from './VentasGlobales/waffle/waffles-ingrediente-untable-ventas/waffles-ingrediente-untable-ventas.component';
import { WafflesIngredienteComplementarioVentasGlobalesComponent } from './VentasGlobales/waffle/waffles-ingrediente-complementario-ventas/waffles-ingrediente-complementario-ventas.component';

// Menu Global Sales
import { MenuBebidasSalesGlobalComponent } from './salesGlobal/menu-bebidas-sales/menu-bebidas-sales.component';
import { MenuCrepaDulceSalesGlobalComponent } from './salesGlobal/menu-crepa-dulce-sales/menu-crepa-dulce-sales.component';
import { MenuCrepaSaladaSalesGlobalComponent } from './salesGlobal/menu-crepa-salada-sales/menu-crepa-salada-sales.component';
import { MenuCrepasSalesGlobalComponent } from './salesGlobal/menu-crepas-sales/menu-crepas-sales.component';
import { MenuWafflesCanastaSalesGlobalComponent } from './salesGlobal/menu-waffles-canasta-sales/menu-waffles-canasta-sales.component';
import { MenuWafflesSalesGlobalComponent } from './salesGlobal/menu-waffles-sales/menu-waffles-sales.component';
import { SalesGlobalMenuComponent } from './salesGlobal/sales-menu/sales-menu.component';
import { SinupComponent } from './account/1sinup/sinup.component';
import { MenuWaffleRegularComponent } from './productos/menu-waffle-regular/menu-waffle-regular.component';
import { MenuWaffleRegularSalesComponent } from './sales/menu-waffle-regular-sales/menu-waffle-regular-sales.component';
import { MenuWaffleRegularSalesGlobalComponent } from './salesGlobal/menu-waffle-regular-sales-global/menu-waffle-regular-sales-global.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountConfigComponent } from './account/account-config/account-config.component';
import { TranslateModule } from './translate/translate.module';
import { TranslateService } from './translate/translate.service';
import { TranslatePipe } from './translate/translate.pipe';


export function translateFactory(provider: TranslateService) {
  return () => provider.getData('/assets/i18n/');
}


@NgModule({
  declarations: [
    AlertDialogComponent,
    AppComponent,
    BebidasFriasComponent,
    EditFormBebidasFriasComponent,
    CreateFormBebidasFriasComponent,
    LoginAdminComponent,
    NavbarComponent,
    ProductosMenuComponent,
    MenuBebidasComponent,
    BebidasCalientesComponent,
    CreateFormBebidasCalientesComponent,
    EditFormBebidasCalientesComponent,
    MenuCrepasComponent,
    MenuWaflesComponent,
    MenuCrepaSaladaComponent,
    MenuCrepaDulceComponent,
    EditFormCrepaDulceHarinaComponent,
    CreateFormCrepaDulceHarinaComponent,
    CrepaDulceHarinaComponent,
    CreateFormCrepaDulceUntableComponent,
    EditFormCrepaDulceUntableComponent,
    CrepaDulceUntableComponent,
    CrepaDulceComplementarioComponent,
    CreateFormCrepaDulceComplementarioComponent,
    EditFormCrepaDulceComplementarioComponent,
    EditFormCrepaDulceNieveComponent,
    CreateFormCrepaDulceNieveComponent,
    CrepaDulceNieveComponent,
    CreateFormCrepaDulcePreciosComponent,
    EditFormCrepaDulcePreciosComponent,
    CrepaDulcePreciosComponent,
    CreateFormCrepaSaladaIngredientePrincipalComponent,
    EditFormCrepaSaladaIngredientePrincipalComponent,
    CrepaSaladaIngredientePrincipalComponent,
    CrepaSaladaAderesoComponent,
    CreateFromCrepaSaladaAderesoComponent,
    EditFromCrepaSaladaAderesoComponent,
    EditFromCrepaSaladaEnsaladaIndividualComponent,
    CreateFromCrepaSaladaEnsaladaIndividualComponent,
    CrepaSaladaEnsaladaIndividualComponent,
    CrepaSaladaBotanaComponent,
    CreateFormCrepaSaladaBotanaComponent,
    EditFormCrepaSaladaBotanaComponent,
    EditFormCrepaSaladaPrecioComponent,
    CreateFormCrepaSaladaPrecioComponent,
    CrepaSaladaPrecioComponent,
    CreateFormIngredienteUntableComponent,
    EditFormIngredienteUntableComponent,
    IngredienteUntableComponent,
    EditFormIngredienteComplementarioComponent,
    CreateFormIngredienteComplementarioComponent,
    IngredienteComplementarioComponent,
    CreateFormNieveComponent,
    EditFormNieveComponent,
    NieveComponent,
    CreateFormPrecioComponent,
    EditFormPrecioComponent,
    PrecioComponent,
    CreateFormUsuarioCajaComponent,
    EditFormUsuarioCajaComponent,
    UsuarioCajaComponent,
    UsuarioEcommerComponent,
    CreateFormUsuarioEcommerComponent,
    EditFormUsuarioEcommerComponent,
    MenuUsuariosComponent,
    MenuPrincipalComponent,
    SucursalesCreateFormComponent,
    SucursalesEditFormComponent,
    SucursalesComponent,
    PrecioWaffleCanastaComponent,
    CreateFormPrecioWaffleCanastaComponent,
    EditFormPrecioWaffleCanastaComponent,
    AderesoBaseComponent,
    AderesoBaseCreateFormComponent,
    AderesoBaseEditFormComponent,
    IngredientesBaseComponent,
    IngredientesBaseCreateFormComponent,
    IngredientesBaseEditFormComponent,
    CreateFormIngredientesUntablesWaffleCanastaComponent,
    EditFormIngredientesUntablesWaffleCanastaComponent,
    IngredientesUntablesWaffleCanastaComponent,
    CreateFormNivesWaffleCanastaComponent,
    EditFormNivesWaffleCanastaComponent,
    NivesWaffleCanastaComponent,
    MenuWaffleCanastaComponent,
    CreateFormIngredientesComplementariosWaffleCanastaComponent,
    EditFormIngredientesComplementariosWaffleCanastaComponent,
    IngredientesComplementariosWaffleCanastaComponent,
    BebidasCalientesStockComponent,
    BebidasFriasStockComponent,
    CrepaDulceHarinasStockComponent,
    CrepaDulceIngredientesComplementariosStockComponent,
    CrepaDulceIngredientesUntablesStockComponent,
    CrepaDulceNieveStockComponent,
    CrepaSaladaAderesoStockComponent,
    CrepaSaladaAderesoBaseStockComponent,
    CrepaSaladaBotanaStockComponent,
    CrepaSaladaEnsaladaIndividualStockComponent,
    CrepaSaladaIngredientePrincipalStockComponent,
    CrepaSaladaIngredienteBaseStockComponent,
    WaffleCanastaNievesStockComponent,
    WaffleCanastaIngredienteUntableStockComponent,
    WaffleCanastaIngredienteComplementarioStockComponent,
    WafflesIngredienteComplementarioStockComponent,
    WafflesIngredienteUntableStockComponent,
    WafflesNieveStockComponent,
    MenuBebidasStockComponent,
    MenuCrepaDulceStockComponent,
    MenuCrepaSaladaStockComponent,
    MenuCrepasStockComponent,
    MenuWaffleCanastaStockComponent,
    MenuWaffleStockComponent,
    StockMenuComponent,
    BebidasCalientesVentasComponent,
    BebidasFriasVentasComponent,
    CrepaDulceHarinasVentasComponent,
    CrepaDulceIngredientesComplementariosVentasComponent,
    CrepaDulceIngredientesUntablesVentasComponent,
    CrepaDulceNieveVentasComponent,
    CrepaSaladaAderesoVentasComponent,
    CrepaSaladaAderesoBaseVentasComponent,
    CrepaSaladaBotanaVentasComponent,
    CrepaSaladaEnsaladaIndividualVentasComponent,
    CrepaSaladaIngredientePrincipalVentasComponent,
    CrepaSaladaIngredienteBaseVentasComponent,
    WaffleCanastaIngredienteComplementarioVentasComponent,
    WaffleCanastaIngredienteUntableVentasComponent,
    WaffleCanastaNievesVentasComponent,
    WafflesNieveVentasComponent,
    WafflesIngredienteUntableVentasComponent,
    WafflesIngredienteComplementarioVentasComponent,
    FacturasComponent,
    ViewFacturaComponent,
    MenuBebidasSalesComponent,
    MenuCrepaDulceSalesComponent,
    MenuCrepaSaladaSalesComponent,
    MenuCrepasSalesComponent,
    MenuWafflesCanastaSalesComponent,
    MenuWafflesSalesComponent,
    SalesMenuComponent,
    FacturasSucursalComponent,
    ViewUsuarioComponent,
    AdminSucursalMenuComponent,
    BebidasCalientesVentasGlobalesComponent,
    BebidasFriasVentasGlobalesComponent,
    CrepaDulceHarinasVentasGlobalesComponent,
    CrepaDulceIngredientesComplementariosVentasGlobalesComponent,
    CrepaDulceIngredientesUntablesVentasGlobalesComponent,
    CrepaDulceNieveVentasGlobalesComponent,
    CrepaSaladaAderesoVentasGlobalesComponent,
    CrepaSaladaAderesoBaseVentasGlobalesComponent,
    CrepaSaladaBotanaVentasGlobalesComponent,
    CrepaSaladaEnsaladaIndividualVentasGlobalesComponent,
    CrepaSaladaIngredientePrincipalVentasGlobalesComponent,
    CrepaSaladaIngredienteBaseVentasGlobalesComponent,
    WaffleCanastaIngredienteComplementarioVentasGlobalesComponent,
    WaffleCanastaIngredienteUntableVentasGlobalesComponent,
    WaffleCanastaNievesVentasGlobalesComponent,
    WafflesNieveVentasGlobalesComponent,
    WafflesIngredienteUntableVentasGlobalesComponent,
    WafflesIngredienteComplementarioVentasGlobalesComponent,
    MenuBebidasSalesGlobalComponent,
    MenuCrepaDulceSalesGlobalComponent,
    MenuCrepaSaladaSalesGlobalComponent,
    MenuCrepasSalesGlobalComponent,
    MenuWafflesCanastaSalesGlobalComponent,
    MenuWafflesSalesGlobalComponent,
    SalesGlobalMenuComponent,
    SinupComponent,
    MenuWaffleRegularComponent,
    MenuWaffleStockRegularComponent,
    MenuWaffleRegularSalesComponent,
    MenuWaffleRegularSalesGlobalComponent,
    ChangePasswordComponent,
    AccountConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    TranslateModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    BebidasFriasService,
    SigninAdminService,
    AuthService,
    AlertDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
