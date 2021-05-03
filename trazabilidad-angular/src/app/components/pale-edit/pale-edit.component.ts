import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Pale } from '../../models/pale';
import { UserService } from '../../services/user.service';
import { PaleService } from '../../services/pale.service';
import { BatchOutputService } from '../../services/batchOutput.service';
import { ContainerService } from '../../services/container.service';
import { PackagingLineService } from '../../services/packagingLine.service';
import { PdfMakeWrapper } from 'pdfmake-wrapper';

@Component({
  selector: 'app-pale-edit',
  templateUrl: '../pale-new/pale-new.component.html',
  styleUrls: ['../pale-new/pale-new.component.css'],
  providers: [UserService, PaleService, BatchOutputService, ContainerService, PackagingLineService]
})
export class PaleEditComponent implements OnInit {
  public page_title: string;
  public pale: Pale;
  public batch_outputs;
  public containers;
  public packaging_lines;
  public identity;
  public token;
  public status: string;
  public edit: any;
  public froala_options: Object ={
    charCounterCount:true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _paleService: PaleService,
    private _containerService: ContainerService,
    private _batchOutputService: BatchOutputService,
    private _packagingLineService: PackagingLineService
  ) { 
    this.page_title = "Editar pale";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.pale = new Pale(1, 0, 0, 0, 0, 0, '', 0, '');
    this.edit = true;
  }

  ngOnInit(){
    this.getBatchOutputs();
    this.getContainers();
    this.getPackagingLines();
    this.getPale();
  }

  getBatchOutputs(){
    this._batchOutputService.getBatchOutputs().subscribe(
      response => {
        if(response.status == 'success'){
          this.batch_outputs = response.batch_outputs;console.log(this.batch_outputs);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getContainers(){
    this._containerService.getContainers().subscribe(
      response => {
        if(response.status == 'success'){
          this.containers = response.containers;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPackagingLines(){
    this._packagingLineService.getPackagingLines().subscribe(
      response => {
        if(response.status == 'success'){
          this.packaging_lines = response.packaging_lines;
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getPale(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._paleService.getPale(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.pale = response.pale;
          }else{
            this._router.navigate(['/gestion-pales']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-pales']);
        }
      );
    });
  }

  onSubmit(form){
    this._paleService.update(this.token, this.pale, this.pale.id).subscribe(
      response => {
        if(response.status = 'success'){
          this.status = 'success';
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  generatePDF(){
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A5');
    pdf.header('Trazabilidad-NG');

    pdf.add('Lote salida');
    pdf.add(this.pale.batch_output_id);

    pdf.add('Bruto');
    pdf.add(this.pale.gross+ ' kg');

    pdf.add('Tara');
    pdf.add(this.pale.tare+ ' kg');

    pdf.add('Bultos');
    pdf.add(this.pale.packaged);

    pdf.add('Piezas');
    pdf.add(this.pale.pieces);

    pdf.footer('Empresa Hortofrutícola');

    pdf.create().download();
  }
}
