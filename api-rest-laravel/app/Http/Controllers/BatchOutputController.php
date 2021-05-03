<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\BatchOutput;
use Illuminate\Support\Facades\Validator;


class BatchOutputController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los lotes de salida
    public function index(){
        $batch_outputs = BatchOutput::all()->load('buyer')
                                            ->load('article')
                                            ->load('carrier');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'batch_outputs' => $batch_outputs
        ]);
    }

    //Listar un unico lote de salida
    public function show($id){
        $batch_output = BatchOutput::find($id)->load('buyer')
                                              ->load('article')
                                              ->load('carrier');

        if(is_object($batch_output)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'batch_output' => $batch_output
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El lote de salida no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un lote de salida
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'buyer_id' => 'required',
                'article_id' => 'required',
                'carriers_id' => 'required',
                'description' => 'required'
            ]);

            //Guardar lote salida
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el lote de salida, faltan datos'
                ];
            }else{
                $batch_output = new BatchOutput();
                $batch_output->buyer_id = $params->buyer_id;
                $batch_output->article_id = $params->article_id;
                $batch_output->carriers_id = $params->carriers_id;
                $batch_output->completed = $params->completed;
                $batch_output->loaded = $params->loaded;
                $batch_output->description = $params->description;
                $batch_output->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'batch_output' => $batch_output
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

    //Actualizar lote salida
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'buyer_id' => 'required',
                'article_id' => 'required',
                'carriers_id' => 'required',
                'description' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar el lote de salida
            $batch_output = BatchOutput::where('id', $id)->update($params_array);

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

    //Borrar lote de salida
    public function delete($id, Request $request){
        //Conseguir lote de salida
        $batch_output = BatchOutput::find($id);

        if(!empty($batch_output)){
            //Borrarlo
            $batch_output->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'batch_output' => $batch_output
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El lote de salida no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
