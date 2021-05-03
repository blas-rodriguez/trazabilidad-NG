<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Process;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Support\Facades\Validator;

class ProcessController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los procesos
    public function index(){
        $processes = Process::all()->load('notebook');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'processes' => $processes
        ]);
    }

    //Listar un unico proceso
    public function show($id){
        $process = Process::find($id)->load('notebook');

        if(is_object($process)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'process' => $process
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El proceso no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un proceso
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'notebook_id' => 'required',
                'process' => 'required',
                'dated' => 'required'
            ]);

            //Guardar proceso
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el proceso, faltan datos'
                ];
            }else{
                $process = new Process();
                $process->notebook_id = $params->notebook_id;
                $process->process = $params->process;
                $process->dated = $params->dated;
                $process->description = $params->description;
                $process->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'process' => $process
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

    //Actualizar procesos
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'notebook_id' => 'required',
                'proccess' => 'required',
                'dated' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar proceso
            $process = Process::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'changes' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún proceso'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar el proceso
    public function delete($id, Request $request){
        //Conseguir proceso
        $process = Process::find($id);

        if(!empty($process)){
            //Borrarlo
            $process->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'process' => $process
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El proceso no existe'
            ];
        }

        //Devolver proceso
        return response()->json($data, $data['code']);
    }
}
