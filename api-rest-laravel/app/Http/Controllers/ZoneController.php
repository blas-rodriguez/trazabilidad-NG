<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Zone;
use Illuminate\Support\Facades\Validator;

class ZoneController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todas las zonas
    public function index(){
        $zones = Zone::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'zones' => $zones
        ]);
    }

    //Listar una unica zona
    public function show($id){
        $zone = Zone::find($id);

        if(is_object($zone)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'zone' => $zone
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'La zona no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar una zona
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'zone' => 'required'
            ]);

            //Guardar zona
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'La zona no se ha guardado'
                ];
            }else{
                $zone = new Zone();
                $zone->zone = $params_array['zone'];
                $zone->description = $params_array['description'];
                $zone->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'zone' => $zone
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna categoria'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Actualizar la zona
    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'zone' => 'required'
            ]);

            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo la zona
            $zone = Zone::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'zone' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ninguna zona'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar el resultado
    public function delete($id, Request $request){
        //Conseguir la zona
        $zone = Zone::find($id);

        if(!empty($zone)){
            //Borrarlo
            $zone->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'zone' => $zone
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'La zona no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
