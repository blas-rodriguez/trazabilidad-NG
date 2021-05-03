import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OutputDetail } from '../../models/outputdetail';
import { OutputDetailService } from '../../services/outputDetail.services';

@Component({
  selector: 'app-output-detail-detail',
  templateUrl: './output-detail-detail.component.html',
  styleUrls: ['./output-detail-detail.component.css'],
  providers: [OutputDetailService]
})
export class OutputDetailDetailComponent implements OnInit {
  public output_detail;

  constructor(
    private _outputDetailService: OutputDetailService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getOutputDetail();
  }

  getOutputDetail(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Petición AJAX
      this._outputDetailService.getOutputDetail(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.output_detail = response.output_detail;
          }else{
            this._router.navigate(['/gestion-detalles-salida']); 
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/gestion-detalles-salida']);
        }
      );
    });
  }

}
