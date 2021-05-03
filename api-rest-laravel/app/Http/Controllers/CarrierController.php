<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Carrier;
use Illuminate\Support\Facades\Validator;

class CarrierController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los transportistas
    public function index()
    {
        $carriers = Carrier::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'carriers' => $carriers
        ]);
    }

    //Lsitar un unico transportista
    public function show($id)
    {
        $carrier = Carrier::find($id);

        if(is_object($carrier)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'carrier' => $carrier
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El transportista no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar transportista
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array =json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'company' => 'required'
            ]);

            //Guardar transportista
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El transportista no se ha guardado'
                ];
            }else{
                $carrier = new Carrier();
                $carrier->company = $params_array['company'];
                $carrier->description = $params_array['description'];
                $carrier->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'carrier' => $carrier
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún transportista'
            ]; 
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'company' => 'required'
            ]);

            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo el articulo
            $carrier = Carrier::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'carrier' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún transportista'
            ];
        }

        //Devolver ressultado
        return response()->json($data, $data['code']);
    }

    //Borrar un transportista
    public function delete($id, Request $request){
        //Conseguir el transportista
        $carrier = Carrier::find($id);

        if(!empty($carrier)){
            //Borrarlo
            $carrier->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'carrier' => $carrier
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El transportista no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
