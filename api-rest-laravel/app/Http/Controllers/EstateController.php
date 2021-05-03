<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Estate;
use Illuminate\Support\Facades\Validator;

class EstateController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos las fincas
    public function index(){
        $estates = Estate::all();

        return response()->json([
            'code'=> 200,
            'status'=> 'success',
            'estates' => $estates
        ]);
    }

    //Listar una unica finca
    public function show($id){
        $estate = Estate::find($id);

        if(is_object($estate)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'estate' => $estate
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'La finca no existe'
            ]; 
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar una finca
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'place' => 'required',
                'route' => 'required',
                'province' => 'required'
            ]);

            //Guardar la finca
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'La finca no se ha guardado'
                ];
            }else{
                $estate = new Estate();
                $estate->place = $params_array['place'];
                $estate->route = $params_array['route'];
                $estate->province = $params_array['province'];
                $estate->industrial_park = $params_array['industrial_park'];
                $estate->plot = $params_array['plot'];
                $estate->gps = $params_array['gps'];
                $estate->description = $params_array['description'];
                $estate->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'estate' => $estate
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna finca'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Actualizar finca
    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
           //Validar la información
            $validate = Validator::make($params_array, [
                'place' => 'required',
                'route' => 'required',
                'province' => 'required'
            ]); 

            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo la finca
            $estate = Estate::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'estate' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna finca'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar una finca
    public function delete($id, Request $request){
        //Conseguir la finca
        $estate = Estate::find($id);

        if(!empty($estate)){
            //Borrarla
            $estate->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'estate' => $estate
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'La finca no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
