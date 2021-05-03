<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Report;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todos los reportes
    public function index(){
        $reports = Report::all()->load('batch_output')
                                ->load('entry_lot');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'reports' => $reports
        ]);
    }

    //Listar un unico reporte
    public function show($id){
        $report = Report::find($id)->load('batch_output')
                                   ->load('entry_lot');
                                   
        if(is_object($report)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'report' => $report
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El reporte no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar reportes
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'batch_output_id' => 'required',
                'entry_lot_id' => 'required',
                'incidence' => 'required'
            ]);

            //Guardar reporte
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el reporte, faltan datos'
                ];
            }else{
                $report = new Report();
                $report->batch_output_id = $params->batch_output_id;
                $report->entry_lot_id = $params->entry_lot_id;
                $report->incidence = $params->incidence;
                $report->solution = $params->solution;
                $report->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'report' => $report
                ];
            }
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'Envia los datos correctamente'
            ];  
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Actualizar reportes
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'batch_output_id' => 'required',
                'entry_lot_id' => 'required',
                'incidence' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar reporte
            $report = Report::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'changes' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún reporte'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar reporte
    public function delete($id, Request $request){
        //Conseguir el reporte
        $report = Report::find($id);

        if(!empty($report)){
            //Borrarlo
            $report->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'report' => $report
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El reporte no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
