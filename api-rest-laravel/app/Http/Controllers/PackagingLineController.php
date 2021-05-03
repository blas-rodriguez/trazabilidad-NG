<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\PackagingLine;
use Illuminate\Support\Facades\Validator;

class PackagingLineController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todas las lineas de envasado
    public function index(){
        $packaging_lines = PackagingLine::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'packaging_lines' => $packaging_lines
        ]);
    }

    //Listar una unica linea de envasado
    public function show($id){
        $packaging_line = PackagingLine::find($id);

        if(is_object($packaging_line)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'packaging_line' => $packaging_line
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No existe la linea de envasado'
            ];
        }

        return response()->json($data, $data['code']);
    }

    //Guardar linea de envasado
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging_line' => 'required'
            ]);

            //Guardar una linea
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'La linea de envasado no se ha guardado'
                ];
            }else{
                $packaging_line = new PackagingLine();
                $packaging_line->packaging_line = $params_array['packaging_line'];
                $packaging_line->description = $params_array['description'];
                $packaging_line->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'packaging_line' => $packaging_line
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna linea de envasado'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }
    
    //Actualizar linea de envasado
    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'packaging_line' => 'required'
            ]);

            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar linea de envasado
            $packaging_line = PackagingLine::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'packaging_line' =>$params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna linea de envasado'
            ];
        }

        //Devolverr respuesta
        return response()->json($data, $data['code']);
    }

    //Borrar una linea de envasado
    public function delete($id, Request $request){
        //Conseguir una linea de envasado
        $packaging_line = PackagingLine::find($id);

        if(!empty($packaging_line)){
            //Borrarlo
            $packaging_line->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'packaging_line' => $packaging_line
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'La linea de envasado no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
