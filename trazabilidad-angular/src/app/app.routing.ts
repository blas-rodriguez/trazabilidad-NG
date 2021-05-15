//IMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORTAR COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { BuyerNewComponent }from './components/buyer-new/buyer-new.component';
import { BuyerDetailComponent } from './components/buyer-detail/buyer-detail.component';
import { BuyerEditComponent } from './components/buyer-edit/buyer-edit.component';
import { ZoneComponent } from './components/zone/zone.component';
import { ZoneNewComponent } from './components/zone-new/zone-new.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
import { FarmerComponent } from './components/farmer/farmer.component';
import { FarmerNewComponent } from './components/farmer-new/farmer-new.component';
import { FarmerDetailComponent} from './components/farmer-detail/farmer-detail.component';
import { FarmerEditComponent } from './components/farmer-edit/farmer-edit.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerNewComponent } from './components/container-new/container-new.component';
import { ContainerDetailComponent } from './components/container-detail/container-detail.component';
import { ContainerEditComponent } from './components/container-edit/container-edit.component';
import { PackagingLineComponent } from './components/packaging-line/packaging-line.component';
import { PackagingLineNewComponent } from './components/packaging-line-new/packaging-line-new.component';
import { PackagingLineDetailComponent } from './components/packaging-line-detail/packaging-line-detail.component';
import { PackagingLineEditComponent} from './components/packaging-line-edit/packaging-line-edit.component';
import { EstateComponent } from './components/estate/estate.component';
import { EstateNewComponent } from './components/estate-new/estate-new.component';
import { EstateDetailComponent } from './components/estate-detail/estate-detail.component';
import { EstateEditComponent } from './components/estate-edit/estate-edit.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { NotebookNewComponent } from './components/notebook-new/notebook-new.component';
import { NotebookDetailComponent } from './components/notebook-detail/notebook-detail.component';
import { NotebookEditComponent } from './components/notebook-edit/notebook-edit.component';
import { CarrierComponent } from './components/carrier/carrier.component';
import { CarrierNewComponent } from './components/carrier-new/carrier-new.component';
import { CarrierDetailComponent } from './components/carrier-detail/carrier-detail.component';
import { CarrierEditComponent } from './components/carrier-edit/carrier-edit.component';
import { EntryLotComponent } from './components/entry-lot/entry-lot.component';
import { EntryLotNewComponent } from './components/entry-lot-new/entry-lot-new.component';
import { EntryLotDetailComponent } from './components/entry-lot-detail/entry-lot-detail.component';
import { EntryLotEditComponent } from './components/entry-lot-edit/entry-lot-edit.component';
import { OutputDetailComponent } from './components/output-detail/output-detail.component';
import { OutputDetailNewComponent } from './components/output-detail-new/output-detail-new.component';
import { OutputDetailDetailComponent } from './components/output-detail-detail/output-detail-detail.component';
import { OutputDetailEditComponent } from './components/output-detail-edit/output-detail-edit.component';
import { BatchOutputComponent } from './components/batch-output/batch-output.component';
import { BatchOutputNewComponent } from './components/batch-output-new/batch-output-new.component';
import { BatchOutputDetailComponent } from './components/batch-output-detail/batch-output-detail.component';
import { BatchOutputEditComponent } from './components/batch-output-edit/batch-output-edit.component';
import { ProcessComponent } from './components/process/process.component';
import { ProcessNewComponent } from './components/process-new/process-new.component';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { ProcessEditComponent } from './components/process-edit/process-edit.component';
import { ReportComponent } from './components/report/report.component';
import { ReportNewComponent } from './components/report-new/report-new.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { PaleComponent } from './components/pale/pale.component';
import { PaleNewComponent } from './components/pale-new/pale-new.component';
import { PaleDetailComponent } from './components/pale-detail/pale-detail.component';
import { PaleEditComponent } from './components/pale-edit/pale-edit.component';

//Cargo el Guard de angular
import { IdentityGuard } from './services/identity.guard';

//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'inicio', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'registro', component:RegisterComponent},
    {path: 'ajustes', component:UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-compradores', component:BuyerComponent, canActivate: [IdentityGuard]},
    {path: 'crear-comprador', component:BuyerNewComponent, canActivate: [IdentityGuard]},
    {path: 'comprador/:id', component:BuyerDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-comprador/:id', component:BuyerEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-zonas', component:ZoneComponent, canActivate: [IdentityGuard]},
    {path: 'crear-zona', component:ZoneNewComponent, canActivate: [IdentityGuard]},
    {path: 'zona/:id', component:ZoneDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-zona/:id', component:ZoneEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-agricultores', component:FarmerComponent, canActivate: [IdentityGuard]},
    {path: 'crear-agricultor', component:FarmerNewComponent, canActivate: [IdentityGuard]},
    {path: 'agricultor/:id', component:FarmerDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-agricultor/:id', component:FarmerEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-articulos', component:ArticleComponent, canActivate: [IdentityGuard]},
    {path: 'crear-articulo', component:ArticleNewComponent, canActivate: [IdentityGuard]},
    {path: 'articulo/:id', component:ArticleDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-articulo/:id', component:ArticleEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-formatos', component:ContainerComponent, canActivate: [IdentityGuard]},
    {path: 'crear-formato', component:ContainerNewComponent, canActivate: [IdentityGuard]},
    {path: 'formato/:id', component:ContainerDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-formato/:id', component:ContainerEditComponent},
    {path: 'gestion-lineas-envasado', component:PackagingLineComponent, canActivate: [IdentityGuard]},
    {path: 'crear-linea-envasado', component:PackagingLineNewComponent, canActivate: [IdentityGuard]},
    {path: 'linea-envasado/:id', component:PackagingLineDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-linea-envasado/:id', component:PackagingLineEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-fincas' ,component: EstateComponent, canActivate: [IdentityGuard]},
    {path: 'crear-finca', component:EstateNewComponent, canActivate: [IdentityGuard]},
    {path: 'finca/:id', component:EstateDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-finca/:id', component:EstateEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-cuaderno-campo', component:NotebookComponent, canActivate: [IdentityGuard]},
    {path: 'crear-cuaderno-campo', component:NotebookNewComponent, canActivate: [IdentityGuard]},
    {path: 'cuaderno-campo/:id', component:NotebookDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-cuaderno-campo/:id', component:NotebookEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-transportistas', component:CarrierComponent, canActivate: [IdentityGuard]},
    {path: 'crear-transportista', component:CarrierNewComponent, canActivate: [IdentityGuard]},
    {path: 'transportista/:id', component:CarrierDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-transportista/:id', component:CarrierEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-lotes-entrada', component:EntryLotComponent, canActivate: [IdentityGuard]},
    {path: 'crear-lote-entrada', component:EntryLotNewComponent, canActivate: [IdentityGuard]},
    {path: 'lote-entrada/:id', component:EntryLotDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-lote-entrada/:id', component:EntryLotEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-detalles-salida' ,component:OutputDetailComponent, canActivate: [IdentityGuard]},
    {path: 'crear-detalle-salida', component:OutputDetailNewComponent, canActivate: [IdentityGuard]},
    {path: 'detalle-salida/:id', component:OutputDetailDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-detalle-salida/:id', component:OutputDetailEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-lotes-salida', component:BatchOutputComponent, canActivate: [IdentityGuard]},
    {path: 'crear-lote-salida', component:BatchOutputNewComponent, canActivate: [IdentityGuard]},
    {path: 'lote-salida/:id', component:BatchOutputDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-lote-salida/:id', component:BatchOutputEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-tratamientos', component:ProcessComponent, canActivate: [IdentityGuard]},
    {path: 'crear-tratamiento', component:ProcessNewComponent, canActivate: [IdentityGuard]},
    {path: 'tratamiento/:id', component:ProcessDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-tratamiento/:id', component:ProcessEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-incidencias', component:ReportComponent, canActivate: [IdentityGuard]},
    {path: 'crear-incidencia', component:ReportNewComponent, canActivate: [IdentityGuard]},
    {path: 'incidencia/:id', component:ReportDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-incidencia/:id', component:ReportEditComponent, canActivate: [IdentityGuard]},
    {path: 'gestion-pales', component:PaleComponent, canActivate: [IdentityGuard]},
    {path: 'crear-pale', component:PaleNewComponent, canActivate: [IdentityGuard]},
    {path: 'pale/:id', component:PaleDetailComponent, canActivate: [IdentityGuard]},
    {path: 'editar-pale/:id', component:PaleEditComponent, canActivate: [IdentityGuard]},
    {path: '**', component:ErrorComponent}
];

//EXPORTAR RUTAS
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);