<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Buyer;
use Illuminate\Support\Facades\Validator;

class BuyerController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    //Lista todos los compradores
    public function index()
    {
        $buyers = Buyer::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'buyers' => $buyers
        ]);

    }

    //Lista un unico comprador
    public function show($id)
    {
        $buyer = Buyer::find($id);

        if (is_object($buyer)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'buyer' => $buyer
            ];
        } else {
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El comprador no existe'
            ];
        }

        return response()->json($data, $data['code']);
    }

    //Guardar un comprador
    public function store(Request $request)
    {
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if (!empty($params_array)) {
            //Validar la información
            $validate = Validator::make($params_array, [
                'cif' => 'required',
                'company' => 'required',
                'direction' => 'required',
                'location' => 'required',
                'province' => 'required',
                'country' => 'required'
            ]);

            //Guardar comprador
            if ($validate->fails()) {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El comprador no se ha guardado'
                ];
            } else {
                $buyer = new Buyer();
                $buyer->cif = $params_array['cif'];
                $buyer->company = $params_array['company'];
                $buyer->direction = $params_array['direction'];
                $buyer->location = $params_array['location'];
                $buyer->province = $params_array['province'];
                $buyer->postcode = $params_array['postcode'];
                $buyer->country = $params_array['country'];
                $buyer->storehouse = $params_array['storehouse'];
                $buyer->description = $params_array['description'];
                $buyer->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'buyer' => $buyer
                ];
            }
        } else {
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'No se ha enviado ningún comprador'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'cif' => 'required',
                'company' => 'required'
            ]);

            //Quitar los datos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo el comprador
            $buyer = Buyer::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'buyer' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún comprador'
            ];
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar comprador
    public function delete($id, Request $request){
        //Conseguir el comprador
        $buyer = Buyer::find($id);

        if(!empty($buyer)){
            //Borrarlo
            $buyer->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'buyer' => $buyer
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'No existe el comprador'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }
    
}
