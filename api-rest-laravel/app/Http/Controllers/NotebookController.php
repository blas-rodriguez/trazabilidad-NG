<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Notebook;
use Illuminate\Support\Facades\Validator;

class NotebookController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los cuadernos de campo
    public function index(){
        $notebooks = Notebook::all()->load('estate')
                                    ->load('farmer');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'notebooks' => $notebooks
        ]);
    }

    //Listar un unico cuaderno
    public function show($id){
        $notebook = Notebook::find($id)->load('estate')
                                       ->load('farmer');

        if(is_object($notebook)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'notebook' => $notebook
            ];
        }else{
            $data = [
                'code' => 400,
                'error' => 'error',
                'message' => 'El cuaderno no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un cuaderno
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'estate_id' => 'required',
                'farmer_id' => 'required'
            ]);

            //Guardar cuaderno
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el cuaderno, faltan datos'
                ];
            }else{
                $notebook = new Notebook();
                $notebook->estate_id = $params->estate_id;
                $notebook->farmer_id = $params->farmer_id;
                $notebook->description = $params->description;
                $notebook->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'notebook' => $notebook
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

    //Actualizar cuaderno
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'estate_id' => 'required',
                'farmer_id' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar el cuaderno
            $notebook = Notebook::where('id', $id)->update($params_array);

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

    //Borrar cuaderno
    public function delete($id, Request $request){
        //Conseguir cuaderno
        $notebook = Notebook::find($id);

        if(!empty($notebook)){
            //Borrarlo
            $notebook->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'notebook' => $notebook
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'success',
                'message' => 'El cuaderno no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
