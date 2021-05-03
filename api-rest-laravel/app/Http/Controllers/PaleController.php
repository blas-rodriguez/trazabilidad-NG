<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Pale;
use Illuminate\Support\Facades\Validator;

class PaleController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todos los pales
    public function index(){
        $pales = Pale::all()->load('packaging_line')
                            ->load('container')
                            ->load('batch_output');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'pales' => $pales
        ]);
    }

    //Listar un unico pale
    public function show($id){
        $pale = Pale::find($id)->load('packaging_line')
                               ->load('container')
                               ->load('batch_output');

        if(is_object($pale)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'pale' => $pale
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El pale no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un pale
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging_line_id' => 'required',
                'container_id' => 'required',
                'batch_output_id' => 'required',
                'gross' => 'required',
                'tare' => 'required'
            ]);

            //Guardar pale
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el pale, faltan datos'
                ];
            }else{
                $pale = new Pale();
                $pale->packaging_line_id = $params->packaging_line_id;
                $pale->container_id = $params->container_id;
                $pale->batch_output_id = $params->batch_output_id;
                $pale->gross = $params->gross;
                $pale->tare = $params->tare;
                $pale->packaged = $params->packaged;
                $pale->pieces = $params->pieces;
                $pale->description = $params->description;
                $pale->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'pale' => $pale
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

    //Actualizar pales
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging_line_id' => 'required',
                'container_id' => 'required',
                'batch_output_id' => 'required',
                'gross' => 'required',
                'tare' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar pale
            $pale = Pale::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'changes' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún pale'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar pale
    public function delete($id, Request $request){
        //Conseguir pale
        $pale = Pale::find($id);

        if(!empty($pale)){
            //Borrarlo
            $pale->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'pale' => $pale
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El pale no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
