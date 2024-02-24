import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidasFriasComponent } from './bebidasFrias/bebidas-frias/bebidas-frias.component';
import { EditFormBebidasFriasComponent } from './bebidasFrias/edit-form-bebidas-frias/edit-form-bebidas-frias.component';
import { CreateFormBebidasFriasComponent } from './bebidasFrias/create-form-bebidas-frias/create-form-bebidas-frias.component';
import { LoginAdminComponent } from './account/2login-admin/login-admin.component';
import { SinupComponent } from './account/1sinup/sinup.component';
import { ProductosMenuComponent } from './productos/productos-menu/productos-menu.component';
import { MenuBebidasComponent } from './productos/menu-bebidas/menu-bebidas.component';
import { AuthGuard1 } from './services/auth1.guard';
import { AuthGuard } from './services/auth.guard';
import { AuthRedirectGuard } from './services/auth.redirect.guard';
import { BebidasCalientesComponent } from './bebidasCalientes/bebidas-calientes/bebidas-calientes.component';
import { EditFormBebidasCalientesComponent } from './bebidasCalientes/edit-form-bebidas-calientes/edit-form-bebidas-calientes.component';
import { CreateFormBebidasCalientesComponent } from './bebidasCalientes/create-form-bebidas-calientes/create-form-bebidas-calientes.component';
import { MenuCrepasComponent } from './productos/menu-crepas/menu-crepas.component';
import { MenuCrepaDulceComponent } from './productos/menu-crepa-dulce/menu-crepa-dulce.component';
import { MenuCrepaSaladaComponent } from './productos/menu-crepa-salada/menu-crepa-salada.component';
import { MenuWaflesComponent } from './productos/menu-wafles/menu-wafles.component';
import { CreateFormCrepaDulceHarinaComponent } from './crepaDulce/Harinas/create-form-crepa-dulce-harina/create-form-crepa-dulce-harina.component';
import { EditFormCrepaDulceHarinaComponent } from './crepaDulce/Harinas/edit-form-crepa-dulce-harina/edit-form-crepa-dulce-harina.component';
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
// Crepa Salada Aderesos
import { CrepaSaladaAderesoComponent } from './crepaSalada/adereso/crepa-salada-adereso/crepa-salada-adereso.component';
import { CreateFromCrepaSaladaAderesoComponent } from './crepaSalada/adereso/create-from-crepa-salada-adereso/create-from-crepa-salada-adereso.component';
import { EditFromCrepaSaladaAderesoComponent } from './crepaSalada/adereso/edit-from-crepa-salada-adereso/edit-from-crepa-salada-adereso.component';
// Crepa Salada Ingredienete Principal
import { CrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/crepa-salada-ingrediente-principal/crepa-salada-ingrediente-principal.component';
import { CreateFormCrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/create-form-crepa-salada-ingrediente-principal/create-form-crepa-salada-ingrediente-principal.component';
import { EditFormCrepaSaladaIngredientePrincipalComponent } from './crepaSalada/ingredientePrincipal/edit-form-crepa-salada-ingrediente-principal/edit-form-crepa-salada-ingrediente-principal.component';
// Crepa Salada Ensalada Individual
import { CrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/crepa-salada-ensalada-individual/crepa-salada-ensalada-individual.component';
import { CreateFromCrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/create-from-crepa-salada-ensalada-individual/create-from-crepa-salada-ensalada-individual.component';
import { EditFromCrepaSaladaEnsaladaIndividualComponent } from './crepaSalada/ensaladaIndividual/edit-from-crepa-salada-ensalada-individual/edit-from-crepa-salada-ensalada-individual.component';
import { CrepaSaladaBotanaComponent } from './crepaSalada/botana/crepa-salada-botana/crepa-salada-botana.component';
import { CreateFormCrepaSaladaBotanaComponent } from './crepaSalada/botana/create-form-crepa-salada-botana/create-form-crepa-salada-botana.component';
import { EditFormCrepaSaladaBotanaComponent } from './crepaSalada/botana/edit-form-crepa-salada-botana/edit-form-crepa-salada-botana.component';
import { CrepaSaladaPrecioComponent } from './crepaSalada/precio/crepa-salada-precio/crepa-salada-precio.component';
import { CreateFormCrepaSaladaPrecioComponent } from './crepaSalada/precio/create-form-crepa-salada-precio/create-form-crepa-salada-precio.component';
import { EditFormCrepaSaladaPrecioComponent } from './crepaSalada/precio/edit-form-crepa-salada-precio/edit-form-crepa-salada-precio.component';
import { IngredienteUntableComponent } from './waffles/ingredienteUntable/ingrediente-untable/ingrediente-untable.component';
import { EditFormIngredienteUntableComponent } from './waffles/ingredienteUntable/edit-form-ingrediente-untable/edit-form-ingrediente-untable.component';
import { CreateFormIngredienteUntableComponent } from './waffles/ingredienteUntable/create-form-ingrediente-untable/create-form-ingrediente-untable.component';
import { IngredienteComplementarioComponent } from './waffles/ingredienteComplementario/ingrediente-complementario/ingrediente-complementario.component';
import { CreateFormIngredienteComplementarioComponent } from './waffles/ingredienteComplementario/create-form-ingrediente-complementario/create-form-ingrediente-complementario.component';
import { EditFormIngredienteComplementarioComponent } from './waffles/ingredienteComplementario/edit-form-ingrediente-complementario/edit-form-ingrediente-complementario.component';
import { NieveComponent } from './waffles/nieve/nieve/nieve.component';
import { EditFormNieveComponent } from './waffles/nieve/edit-form-nieve/edit-form-nieve.component';
import { CreateFormNieveComponent } from './waffles/nieve/create-form-nieve/create-form-nieve.component';
import { PrecioComponent } from './waffles/precio/precio/precio.component';
import { CreateFormPrecioComponent } from './waffles/precio/create-form-precio/create-form-precio.component';
import { EditFormPrecioComponent } from './waffles/precio/edit-form-precio/edit-form-precio.component';
import { UsuarioCajaComponent } from './usuarios/usuariosCaja/usuario-caja/usuario-caja.component';
import { CreateFormUsuarioCajaComponent } from './usuarios/usuariosCaja/create-form-usuario-caja/create-form-usuario-caja.component';
import { EditFormUsuarioCajaComponent } from './usuarios/usuariosCaja/edit-form-usuario-caja/edit-form-usuario-caja.component';
import { UsuarioEcommerComponent } from './usuarios/usuariosEcommer/usuario-ecommer/usuario-ecommer.component';
import { CreateFormUsuarioEcommerComponent } from './usuarios/usuariosEcommer/create-form-usuario-ecommer/create-form-usuario-ecommer.component';
import { EditFormUsuarioEcommerComponent } from './usuarios/usuariosEcommer/edit-form-usuario-ecommer/edit-form-usuario-ecommer.component';
import { MenuPrincipalComponent } from './menuPrincipal/menu-principal/menu-principal.component';
import { MenuUsuariosComponent } from './usuarios/menu/menu-usuarios/menu-usuarios.component';
import { SucursalesComponent } from './sucursales/sucursales/sucursales.component';
import { SucursalesEditFormComponent } from './sucursales/sucursales-edit-form/sucursales-edit-form.component';
import { SucursalesCreateFormComponent } from './sucursales/sucursales-create-form/sucursales-create-form.component';
import { PrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/precio-waffle-canasta/precio-waffle-canasta.component';
import { CreateFormPrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/create-form-precio-waffle-canasta/create-form-precio-waffle-canasta.component';
import { EditFormPrecioWaffleCanastaComponent } from './waffles/precioWaffleCanasta/edit-form-precio-waffle-canasta/edit-form-precio-waffle-canasta.component';
import { IngredientesBaseComponent } from './crepaSalada/ingredientesBase/ingredientes-base/ingredientes-base.component';
import { IngredientesBaseCreateFormComponent } from './crepaSalada/ingredientesBase/ingredientes-base-create-form/ingredientes-base-create-form.component';
import { IngredientesBaseEditFormComponent } from './crepaSalada/ingredientesBase/ingredientes-base-edit-form/ingredientes-base-edit-form.component';
import { AderesoBaseComponent } from './crepaSalada/aderesoBase/adereso-base/adereso-base.component';
import { AderesoBaseEditFormComponent } from './crepaSalada/aderesoBase/adereso-base-edit-form/adereso-base-edit-form.component';
import { AderesoBaseCreateFormComponent } from './crepaSalada/aderesoBase/adereso-base-create-form/adereso-base-create-form.component';
import { MenuWaffleCanastaComponent } from './productos/menu-waffle-canasta/menu-waffle-canasta.component';
import { IngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/ingredientes-untables/ingredientes-untables.component';
import { EditFormIngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/edit-form-ingredientes-complementarios/edit-form-ingredientes-complementarios.component';
import { EditFormIngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/edit-form-ingredientes-untables/edit-form-ingredientes-untables.component';
import { IngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/ingredientes-complementarios/ingredientes-complementarios.component';
import { CreateFormIngredientesComplementariosWaffleCanastaComponent } from './waffleCanasta/ingredienteComplementario/create-form-ingredientes-complementarios/create-form-ingredientes-complementarios.component';
import { NivesWaffleCanastaComponent } from './waffleCanasta/nieves/nives/nives.component';
import { CreateFormNivesWaffleCanastaComponent } from './waffleCanasta/nieves/create-form-nives/create-form-nives.component';
import { EditFormNivesWaffleCanastaComponent } from './waffleCanasta/nieves/edit-form-nives/edit-form-nives.component';
import { CreateFormIngredientesUntablesWaffleCanastaComponent } from './waffleCanasta/ingredienteUntable/create-form-ingredientes-untables/create-form-ingredientes-untables.component';

import { MenuWaffleRegularComponent } from './productos/menu-waffle-regular/menu-waffle-regular.component';

// Stock
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

// Stock Menu
import { MenuBebidasStockComponent } from './stocks/menu-bebidas-stock/menu-bebidas-stock.component';
import { MenuCrepaDulceStockComponent } from './stocks/menu-crepa-dulce-stock/menu-crepa-dulce-stock.component';
import { MenuCrepaSaladaStockComponent } from './stocks/menu-crepa-salada-stock/menu-crepa-salada-stock.component';
import { MenuCrepasStockComponent } from './stocks/menu-crepas-stock/menu-crepas-stock.component';
import { MenuWaffleCanastaStockComponent } from './stocks/menu-waffle-canasta-stock/menu-waffle-canasta-stock.component';
import { MenuWaffleStockComponent } from './stocks/menu-waffle-stock/menu-waffle-stock.component';
import { StockMenuComponent } from './stocks/stock-menu/stock-menu.component';
import { BebidasCalientesVentasComponent } from './bebidasCalientes/bebidas-calientes-ventas/bebidas-calientes-ventas.component';
import { FacturasSucursalComponent } from './facturas/facturas-sucursal/facturas-sucursal.component';
import { ViewUsuarioComponent } from './usuarios/view-usuario/view-usuario.component';
import { ViewFacturaComponent } from './facturas/view-factura/view-factura.component';
import { FacturasComponent } from './facturas/facturas/facturas.component';
import { AdminSucursalMenuComponent } from './admin-sucursal-menu/admin-sucursal-menu.component';
import { BebidasFriasVentasComponent } from './bebidasFrias/bebidas-frias-ventas/bebidas-frias-ventas.component';
import { MenuWafflesCanastaSalesComponent } from './sales/menu-waffles-canasta-sales/menu-waffles-canasta-sales.component';
import { MenuWafflesSalesComponent } from './sales/menu-waffles-sales/menu-waffles-sales.component';
import { MenuCrepaSaladaSalesComponent } from './sales/menu-crepa-salada-sales/menu-crepa-salada-sales.component';
import { MenuCrepaDulceSalesComponent } from './sales/menu-crepa-dulce-sales/menu-crepa-dulce-sales.component';
import { MenuCrepasSalesComponent } from './sales/menu-crepas-sales/menu-crepas-sales.component';
import { MenuBebidasSalesComponent } from './sales/menu-bebidas-sales/menu-bebidas-sales.component';
import { WaffleCanastaNievesVentasComponent } from './waffleCanasta/nieves/waffle-canasta-nieves-ventas/waffle-canasta-nieves-ventas.component';
import { WaffleCanastaIngredienteComplementarioVentasComponent } from './waffleCanasta/ingredienteComplementario/waffle-canasta-ingrediente-complementario-ventas/waffle-canasta-ingrediente-complementario-ventas.component';
import { WaffleCanastaIngredienteUntableVentasComponent } from './waffleCanasta/ingredienteUntable/waffle-canasta-ingrediente-untable-ventas/waffle-canasta-ingrediente-untable-ventas.component';
import { WafflesNieveVentasComponent } from './waffles/nieve/waffles-nieve-ventas/waffles-nieve-ventas.component';
import { WafflesIngredienteComplementarioVentasComponent } from './waffles/ingredienteComplementario/waffles-ingrediente-complementario-ventas/waffles-ingrediente-complementario-ventas.component';
import { WafflesIngredienteUntableVentasComponent } from './waffles/ingredienteUntable/waffles-ingrediente-untable-ventas/waffles-ingrediente-untable-ventas.component';
import { CrepaDulceHarinasVentasComponent } from './crepaDulce/Harinas/crepa-dulce-harinas-ventas/crepa-dulce-harinas-ventas.component';
import { CrepaDulceIngredientesUntablesVentasComponent } from './crepaDulce/ingredientesUntables/crepa-dulce-ingredientes-untables-ventas/crepa-dulce-ingredientes-untables-ventas.component';
import { CrepaDulceIngredientesComplementariosVentasComponent } from './crepaDulce/ingredientesComplementarios/crepa-dulce-ingredientes-complementarios-ventas/crepa-dulce-ingredientes-complementarios-ventas.component';
import { CrepaDulceNieveVentasComponent } from './crepaDulce/nieve/crepa-dulce-nieve-ventas/crepa-dulce-nieve-ventas.component';
import { CrepaSaladaAderesoVentasComponent } from './crepaSalada/adereso/crepa-salada-adereso-ventas/crepa-salada-adereso-ventas.component';
import { CrepaSaladaIngredientePrincipalVentasComponent } from './crepaSalada/ingredientePrincipal/crepa-salada-ingrediente-principal-ventas/crepa-salada-ingrediente-principal-ventas.component';
import { CrepaSaladaEnsaladaIndividualVentasComponent } from './crepaSalada/ensaladaIndividual/crepa-salada-ensalada-individual-ventas/crepa-salada-ensalada-individual-ventas.component';
import { CrepaSaladaBotanaVentasComponent } from './crepaSalada/botana/crepa-salada-botana-ventas/crepa-salada-botana-ventas.component';
import { CrepaSaladaIngredienteBaseVentasComponent } from './crepaSalada/ingredientesBase/crepa-salada-ingrediente-base-ventas/crepa-salada-ingrediente-base-ventas.component';
import { CrepaSaladaAderesoBaseVentasComponent } from './crepaSalada/aderesoBase/crepa-salada-adereso-base-ventas/crepa-salada-adereso-base-ventas.component';
import { SalesMenuComponent } from './sales/sales-menu/sales-menu.component';


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
import { MenuWaffleRegularSalesComponent } from './sales/menu-waffle-regular-sales/menu-waffle-regular-sales.component';
import { MenuWaffleRegularSalesGlobalComponent } from './salesGlobal/menu-waffle-regular-sales-global/menu-waffle-regular-sales-global.component';
import { MenuWaffleStockRegularComponent } from './stocks/menu-waffle-regular/menu-waffle-regular.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountConfigComponent } from './account/account-config/account-config.component';

const routes: Routes = [  
  {path: 'principal', component: MenuPrincipalComponent,  canActivate:[AuthGuard]},
  {path: 'menuWaffleRegular', component: MenuWaffleRegularComponent, canActivate:[AuthGuard]},
  {path: 'menuWaffleRegularSales', component: MenuWaffleRegularSalesComponent, canActivate:[AuthGuard]},
  {path: 'menuWaffleRegularSalesGlobal', component: MenuWaffleRegularSalesGlobalComponent, canActivate:[AuthGuard]},
  {path: 'menuWaffleRegularStock', component: MenuWaffleStockRegularComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: LoginAdminComponent, canActivate: [AuthRedirectGuard]},
  {path: 'signup', component: SinupComponent, canActivate: [AuthRedirectGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'accountConfig', component: AccountConfigComponent, canActivate: [AuthGuard]},
  {path: 'menu', component: ProductosMenuComponent, canActivate: [AuthGuard]},
  {path: 'stock', component: StockMenuComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'sales', component: SalesMenuComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'salesGlobal', component: SalesGlobalMenuComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'bebidas', component: MenuBebidasComponent, canActivate: [AuthGuard]},
  {path: 'menuBebidasStock', component: MenuBebidasStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuBebidasSales', component: MenuBebidasSalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuBebidasSalesGlobal', component: MenuBebidasSalesGlobalComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepas', component: MenuCrepasComponent, canActivate: [AuthGuard]},
  {path: 'menuCrepasStock', component: MenuCrepasStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepasSales', component: MenuCrepasSalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepasSalesGlobal', component: MenuCrepasSalesGlobalComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaDulce', component: MenuCrepaDulceComponent, canActivate: [AuthGuard]},
  {path: 'menuCrepaDulceStock', component: MenuCrepaDulceStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaDulceSales', component: MenuCrepaDulceSalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaDulceSalesGlobal', component: MenuCrepaDulceSalesGlobalComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaSalada', component: MenuCrepaSaladaComponent, canActivate: [AuthGuard]},
  {path: 'menuCrepaSaladaStock', component: MenuCrepaSaladaStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaSaladaSales', component: MenuCrepaSaladaSalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuCrepaSaladaSalesGlobal', component: MenuCrepaSaladaSalesGlobalComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuWafles', component: MenuWaflesComponent, canActivate: [AuthGuard]},  
  {path: 'menuWaffleStock', component: MenuWaffleStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuWaffleSales', component: MenuWafflesSalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuWaffleSalesGlobal', component: MenuWafflesSalesGlobalComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'menuWaffleCanasta', component: MenuWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'menuWaffleCanastaStock', component: MenuWaffleCanastaStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'menuWaffleCanastaSales', component: MenuWafflesCanastaSalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'menuWaffleCanastaSalesGlobal', component: MenuWafflesCanastaSalesGlobalComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Bebidas Frias
  {path: 'bebidasFrias', component: BebidasFriasComponent, canActivate: [AuthGuard]},
  {path: 'editBebidasFrias/:id', component: EditFormBebidasFriasComponent, canActivate: [AuthGuard]},
  {path: 'createBebidasFrias', component: CreateFormBebidasFriasComponent, canActivate: [AuthGuard]},
  {path: 'bebidasFriasStock', component: BebidasFriasStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'bebidasFriasSales', component: BebidasFriasVentasComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'bebidasFriasSalesGlobal', component: BebidasFriasVentasGlobalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  // Bebidas Calientes
  {path: 'bebidasCalientes', component: BebidasCalientesComponent, canActivate: [AuthGuard]},
  {path: 'editBebidasCalientes/:id', component: EditFormBebidasCalientesComponent, canActivate: [AuthGuard]},
  {path: 'createBebidasCalientes', component: CreateFormBebidasCalientesComponent, canActivate: [AuthGuard]},
  {path: 'bebidasCalientesStock', component: BebidasCalientesStockComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'bebidasCalientesSales', component: BebidasCalientesVentasComponent, canActivate: [AuthGuard, AuthGuard1]},
  {path: 'bebidasCalientesSalesGlobal', component: BebidasCalientesVentasGlobalesComponent, canActivate: [AuthGuard, AuthGuard1]},
  // Crepa Dulce Harina
  {path: 'crepaDulceHarina', component:CrepaDulceHarinaComponent, canActivate: [AuthGuard]},
  {path: 'createCrepaDulceHarina', component:CreateFormCrepaDulceHarinaComponent, canActivate: [AuthGuard]},
  {path: 'editCrepaDulceHarina/:id', component: EditFormCrepaDulceHarinaComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceHarinaStock', component: CrepaDulceHarinasStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceHarinaSales', component: CrepaDulceHarinasVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceHarinaSalesGlobal', component: CrepaDulceHarinasVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Dulce Untable
  {path: 'createCrepaDulceUntable', component: CreateFormCrepaDulceUntableComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaDulceUntable/:id', component: EditFormCrepaDulceUntableComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceUntable', component: CrepaDulceUntableComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceUntableStock', component: CrepaDulceIngredientesUntablesStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceUntableSales', component: CrepaDulceIngredientesUntablesVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceUntableSalesGlobal', component: CrepaDulceIngredientesUntablesVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Dulce Complementario
  {path: 'crepaDulceComplementario', component: CrepaDulceComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaDulceComplementario/:id', component: EditFormCrepaDulceComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaDulceComplementario', component: CreateFormCrepaDulceComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceComplementarioStock', component: CrepaDulceIngredientesComplementariosStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceComplementarioSales', component: CrepaDulceIngredientesComplementariosVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceComplementarioSalesGlobal', component: CrepaDulceIngredientesComplementariosVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Dulce Nieve
  {path: 'createCrepaDulceNieve', component: CreateFormCrepaDulceNieveComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaDulceNieve/:id', component: EditFormCrepaDulceNieveComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceNieve', component: CrepaDulceNieveComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulceNieveStock', component: CrepaDulceNieveStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceNieveSales', component: CrepaDulceNieveVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaDulceNieveSalesGlobal', component: CrepaDulceNieveVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Dulce Precio
  {path: 'createCrepaDulcePrecio', component: CreateFormCrepaDulcePreciosComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaDulcePrecio/:id', component: EditFormCrepaDulcePreciosComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulcePrecio', component: CrepaDulcePreciosComponent, canActivate:[AuthGuard]},
  // Crepa Salada Adereso
  {path: 'crepaSaladaAdereso', component: CrepaSaladaAderesoComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaAdereso', component: CreateFromCrepaSaladaAderesoComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaAdereso/:id', component: EditFromCrepaSaladaAderesoComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaAderesoStock', component: CrepaSaladaAderesoStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaAderesoSales', component: CrepaSaladaAderesoVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaAderesoSalesGlobal', component: CrepaSaladaAderesoVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Ingrediente Principal
  {path: 'crepaSaladaIngredientePrincipal', component: CrepaSaladaIngredientePrincipalComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaIngredientePrincipal', component: CreateFormCrepaSaladaIngredientePrincipalComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaIngredientePrincipal/:id', component: EditFormCrepaSaladaIngredientePrincipalComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaIngredientePrincipalStock', component: CrepaSaladaIngredientePrincipalStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaIngredientePrincipalSales', component: CrepaSaladaIngredientePrincipalVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaIngredientePrincipalSalesGlobal', component: CrepaSaladaIngredientePrincipalVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Ensalada Individual
  {path: 'crepaSaladaEnsalada', component: CrepaSaladaEnsaladaIndividualComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaEnsalada', component: CreateFromCrepaSaladaEnsaladaIndividualComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaEnsalada/:id', component: EditFromCrepaSaladaEnsaladaIndividualComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaEnsaladaStock', component: CrepaSaladaEnsaladaIndividualStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaEnsaladaSales', component: CrepaSaladaEnsaladaIndividualVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaEnsaladaSalesGlobal', component: CrepaSaladaEnsaladaIndividualVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Botana
  {path: 'crepaSaladaBotana', component: CrepaSaladaBotanaComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaBotana', component: CreateFormCrepaSaladaBotanaComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaBotana/:id', component: EditFormCrepaSaladaBotanaComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaBotanaStock', component: CrepaSaladaBotanaStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaBotanaSales', component: CrepaSaladaBotanaVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaBotanaSalesGlobal', component: CrepaSaladaBotanaVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Ingredientes Base
  {path: 'crepaSaladaIngredientesBase', component: IngredientesBaseComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaIngredientesBase', component: IngredientesBaseCreateFormComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaIngredientesBase/:id', component: IngredientesBaseEditFormComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaIngredientesBaseStock', component: CrepaSaladaIngredienteBaseStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaIngredientesBaseSales', component: CrepaSaladaIngredienteBaseVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaIngredientesBaseSalesGlobal', component: CrepaSaladaIngredienteBaseVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Aderesos Base
  {path: 'crepaSaladaAderesosBase', component: AderesoBaseComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaAderesosBase', component: AderesoBaseCreateFormComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaAderesosBase/:id', component: AderesoBaseEditFormComponent, canActivate:[AuthGuard]},
  {path: 'crepaSaladaAderesosBaseStock', component: CrepaSaladaAderesoBaseStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaAderesosBaseSales', component: CrepaSaladaAderesoBaseVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'crepaSaladaAderesosBaseSalesGlobal', component: CrepaSaladaAderesoBaseVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Crepa Salada Precio
  {path: 'crepaSaladaPrecio', component: CrepaSaladaPrecioComponent, canActivate:[AuthGuard]},
  {path: 'createCrepaSaladaPrecio', component: CreateFormCrepaSaladaPrecioComponent, canActivate:[AuthGuard]},
  {path: 'editCrepaSaladaPrecio/:id', component: EditFormCrepaSaladaPrecioComponent, canActivate:[AuthGuard]},
  // Waffles Ingredienet Untable
  {path: 'wafflesIngredienteUntable', component: IngredienteUntableComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesIngredienteUntable', component: CreateFormIngredienteUntableComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesIngredienteUntable/:id', component: EditFormIngredienteUntableComponent, canActivate:[AuthGuard]},
  {path: 'wafflesIngredienteUntableStock', component: WafflesIngredienteUntableStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesIngredienteUntableSales', component: WafflesIngredienteUntableVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesIngredienteUntableSalesGlobal', component: WafflesIngredienteUntableVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Waffles Ingrediente Complementario
  {path: 'wafflesIngredienteComplementario', component: IngredienteComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesIngredienteComplementario', component: CreateFormIngredienteComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesIngredienteComplementario/:id', component: EditFormIngredienteComplementarioComponent, canActivate:[AuthGuard]},
  {path: 'wafflesIngredienteComplementarioStock', component: WafflesIngredienteComplementarioStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesIngredienteComplementarioSales', component: WafflesIngredienteComplementarioVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesIngredienteComplementarioSalesGlobal', component: WafflesIngredienteComplementarioVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Waffles Nieve
  {path: 'wafflesNieve', component: NieveComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesNieve', component: CreateFormNieveComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesNieve/:id', component: EditFormNieveComponent, canActivate:[AuthGuard]},
  {path: 'wafflesNieveStock', component: WafflesNieveStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesNieveSales', component: WafflesNieveVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesNieveSalesGlobal', component: WafflesNieveVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Waffles Precio
  {path: 'wafflesPrecio', component: PrecioComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesPrecio', component: CreateFormPrecioComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesPrecio/:id', component: EditFormPrecioComponent, canActivate:[AuthGuard]},
  // Usuarios de caja
  {path: 'usuarioCaja', component: UsuarioCajaComponent, canActivate:[AuthGuard]},
  {path: 'createUsuarioCaja', component: CreateFormUsuarioCajaComponent, canActivate:[AuthGuard]},
  {path: 'editUsuarioCaja/:id', component: EditFormUsuarioCajaComponent, canActivate:[AuthGuard]},
  {path: 'viewUsuarioCaja/:id', component: ViewUsuarioComponent, canActivate:[AuthGuard]},
  // Usuarios de ecommer
 // {path: 'usuarioEcommer', component: UsuarioEcommerComponent, canActivate:[AuthGuard]},
 // {path: 'createUsuarioEcommer', component: CreateFormUsuarioEcommerComponent, canActivate:[AuthGuard]},
 // {path: 'editUsuarioEcommer/:id', component: EditFormUsuarioEcommerComponent, canActivate:[AuthGuard]},
  // Menu Principal

 // {path: 'usuarios', component: MenuUsuariosComponent, canActivate:[AuthGuard]},

  // Sucursal 
  {path: 'sucursales', component: SucursalesComponent, canActivate:[AuthGuard]},
  {path: 'editSucursal/:id', component: SucursalesEditFormComponent, canActivate:[AuthGuard]},
  {path: 'createSucursal', component: SucursalesCreateFormComponent, canActivate:[AuthGuard]},
  {path: 'facturaSucursal', component: FacturasSucursalComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'viewFactura/:id', component: ViewFacturaComponent, canActivate:[AuthGuard]},
  {path: 'facturas', component: FacturasComponent, canActivate:[AuthGuard]},
  {path: 'adminSucursal', component: AdminSucursalMenuComponent, canActivate:[AuthGuard]},

  // Waffles Canasta Precio
  {path: 'wafflesCanastaPrecio', component: PrecioWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesCanastaPrecio', component: CreateFormPrecioWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesCanastaPrecio/:id', component: EditFormPrecioWaffleCanastaComponent, canActivate:[AuthGuard]},

  // Waffles Canasta Ingredienet Untable
  {path: 'wafflesCanastaIngredienteUntable', component: IngredientesUntablesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesCanastaIngredienteUntable', component: CreateFormIngredientesUntablesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesCanastaIngredienteUntable/:id', component: EditFormIngredientesUntablesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'wafflesCanastaIngredienteUntableStock', component: WaffleCanastaIngredienteUntableStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaIngredienteUntableSales', component: WaffleCanastaIngredienteUntableVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaIngredienteUntableSalesGlobal', component: WaffleCanastaIngredienteUntableVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Waffles Canasta Ingrediente Complementario
  {path: 'wafflesCanastaIngredienteComplementario', component: IngredientesComplementariosWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesCanastaIngredienteComplementario', component: CreateFormIngredientesComplementariosWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesCanastaIngredienteComplementario/:id', component: EditFormIngredientesComplementariosWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'wafflesCanastaIngredienteComplementarioStock', component: WaffleCanastaIngredienteComplementarioStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaIngredienteComplementarioSales', component: WaffleCanastaIngredienteComplementarioVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaIngredienteComplementarioSalesGlobal', component: WaffleCanastaIngredienteComplementarioVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  // Waffles Canasta Nieve
  {path: 'wafflesCanastaNieve', component: NivesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'createWafflesCanastaNieve', component: CreateFormNivesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'editWafflesCanastaNieve/:id', component: EditFormNivesWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'wafflesCanastaNieveStock', component: WaffleCanastaNievesStockComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaNieveSales', component: WaffleCanastaNievesVentasComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: 'wafflesCanastaNieveSalesGlobal', component: WaffleCanastaNievesVentasGlobalesComponent, canActivate:[AuthGuard, AuthGuard1]},
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
