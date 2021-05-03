<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\OutputDetail;
use Illuminate\Support\Facades\Validator;

class OutputDetailController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los detalles de salida
    public function index(){
        $output_details = OutputDetail::all()->load('entry_lot')
                                             ->load('packaging_line');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'output_details' => $output_details
        ]);
    }

    //Listar un unico detalle de salida
    public function show($id){
        $output_detail = OutputDetail::find($id)->load('entry_lot')
                                                ->load('packaging_line');

        if(is_object($output_detail)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'output_detail' => $output_detail
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El detalle de salida no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un detalle de salida
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging_line_id' => 'required',
                'entry_lot_id' => 'required'
            ]);

            //Guardar detalle de salida
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el detalle de salida, faltan datos'
                ];
            }else{
                $output_detail = new OutputDetail();
                $output_detail->packaging_line_id = $params->packaging_line_id;
                $output_detail->entry_lot_id = $params->entry_lot_id;
                $output_detail->kg_used = $params->kg_used;
                $output_detail->description = $params->description;
                $output_detail->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'output_detail' => $output_detail
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

    //Actualizar detalles de salida
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging:line_id' => 'required',
                'entry_lot_id' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar el detalle de salida
            $output_detail = OutputDetail::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'changes' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún lote'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar detalle de salida
    public function delete($id, Request $request){
        //Conseguir detalle de salida
        $output_detail = OutputDetail::find($id);

        if(!empty($output_detail)){
            //Borrarlo
            $output_detail->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'output_detail' => $output_detail
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El detalle de salida no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
