<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Farmer;
use Illuminate\Support\Facades\Validator;

class FarmerController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todos los agricultores
    public function index(){
        $farmers = Farmer::all()->load('zone');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'farmers' => $farmers
        ]);
    }

    //Listar un unico agricultor
    public function show($id){
        $farmer = Farmer::find($id)->load('zone');

        if(is_object($farmer)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'farmer' => $farmer
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El agricultor no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un agricultor
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'zone_id' => 'required',
                'nif' => 'required',
                'name' => 'required',
                'surname' => 'required'
            ]);

            //Guardar agricultor
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el agricultor, faltan datos'
                ];
            }else{
                $farmer = new Farmer();
                $farmer->zone_id = $params->zone_id;
                $farmer->nif = $params->nif;
                $farmer->name = $params->name;
                $farmer->surname = $params->surname;
                $farmer->direction = $params->direction;
                $farmer->location = $params->location;
                $farmer->province = $params->province;
                $farmer->postcode = $params->postcode;
                $farmer->description = $params->description;
                $farmer->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'farmer' => $farmer
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

    //Actualizar agricultor
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la informacion
            $validate = Validator::make($params_array, [
                'zone_id' => 'required',
                'nif' => 'required',
                'name' => 'required',
                'surname' => 'required'
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar el agricultor
            $farmer = Farmer::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'changes' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún agricultor'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }

    //Borrar agricultor
    public function delete($id, Request $request){
        //Conseguir agricultor
        $farmer = Farmer::find($id);

        if(!empty($farmer)){
            //Borrarlo
            $farmer->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'farmer' => $farmer
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
