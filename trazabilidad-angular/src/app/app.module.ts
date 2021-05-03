import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';

//Cargamos el creador de PDF
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { BuyerNewComponent } from './components/buyer-new/buyer-new.component';
import { BuyerDetailComponent } from './components/buyer-detail/buyer-detail.component';
import { BuyerEditComponent } from './components/buyer-edit/buyer-edit.component';
import { FarmerComponent } from './components/farmer/farmer.component';
import { FarmerDetailComponent } from './components/farmer-detail/farmer-detail.component';
import { FarmerNewComponent } from './components/farmer-new/farmer-new.component';
import { ZoneComponent } from './components/zone/zone.component';
import { ZoneNewComponent } from './components/zone-new/zone-new.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
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
import { PackagingLineEditComponent } from './components/packaging-line-edit/packaging-line-edit.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    BuyerComponent,
    BuyerNewComponent,
    BuyerDetailComponent,
    BuyerEditComponent,
    FarmerComponent,
    FarmerDetailComponent,
    FarmerNewComponent,
    ZoneComponent,
    ZoneNewComponent,
    ZoneDetailComponent,
    ZoneEditComponent,
    FarmerEditComponent,
    ArticleComponent,
    ArticleNewComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ContainerComponent,
    ContainerNewComponent,
    ContainerDetailComponent,
    ContainerEditComponent,
    PackagingLineComponent,
    PackagingLineNewComponent,
    PackagingLineDetailComponent,
    PackagingLineEditComponent,
    EstateComponent,
    EstateNewComponent,
    EstateDetailComponent,
    EstateEditComponent,
    NotebookComponent,
    NotebookNewComponent,
    NotebookDetailComponent,
    NotebookEditComponent,
    CarrierComponent,
    CarrierNewComponent,
    CarrierDetailComponent,
    CarrierEditComponent,
    EntryLotComponent,
    EntryLotNewComponent,
    EntryLotDetailComponent,
    EntryLotEditComponent,
    OutputDetailComponent,
    OutputDetailNewComponent,
    OutputDetailDetailComponent,
    OutputDetailEditComponent,
    BatchOutputComponent,
    BatchOutputNewComponent,
    BatchOutputDetailComponent,
    BatchOutputEditComponent,
    ProcessComponent,
    ProcessNewComponent,
    ProcessDetailComponent,
    ProcessEditComponent,
    ReportComponent,
    ReportNewComponent,
    ReportDetailComponent,
    ReportEditComponent,
    PaleComponent,
    PaleNewComponent,
    PaleDetailComponent,
    PaleEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    NgxPaginationModule,
    MomentModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
