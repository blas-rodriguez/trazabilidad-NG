<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\EntryLot;
use Illuminate\Support\Facades\Validator;

class EntryLotController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Listar todos los lotes de entrada
    public function index(){
        $entries_lots = EntryLot::all()->load('article')
                                       ->load('carrier')
                                       ->load('notebook');

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'entries_lots' => $entries_lots
        ]);
    }

    //Listar un unico lote de entrada
    public function show($id){
        $entry_lot = EntryLot::find($id)->load('article')
                                        ->load('carrier')
                                        ->load('notebook');

        if(is_object($entry_lot)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'entry_lot' => $entry_lot
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El lote de entrada no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Guardar un lote de entrada
    public function store(Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
               'article_id' => 'required',
               'notebook_id' => 'required',
               'carrier_id' => 'required',
               'gross' => 'required',
               'tare' => 'required' 
            ]);

            //Guardar lote entrada
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el lote de entrada, faltan datos'
                ];
            }else{
                $entry_lot = new EntryLot();
                $entry_lot->article_id = $params->article_id;
                $entry_lot->notebook_id = $params->notebook_id;
                $entry_lot->carrier_id = $params->carrier_id;
                $entry_lot->gross = $params->gross;
                $entry_lot->tare = $params->tare;
                $entry_lot->packaged = $params->packaged;
                $entry_lot->discount = $params->discount;
                $entry_lot->number_plate = $params->number_plate;
                $entry_lot->used = $params->used;
                $entry_lot->description = $params->description;
                $entry_lot->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'entry_lot' => $entry_lot
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

    //Actualizar lote de entrada
    public function update($id, Request $request){
        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'article_id' => 'required',
                'notebook_id' => 'required',
                'carrier_id' => 'required',
                'gross' => 'required',
                'tare' => 'required' 
            ]);

            //Quitar lo que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizar el lote de entrada
            $entry_lot = EntryLot::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'entry_lot' => $entry_lot,
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

    //Borrar lote de entrada
    public function delete($id, Request $request){
        //Conseguir lote de entrada
        $entry_lot = EntryLot::find($id);

        if(!empty($entry_lot)){
            //Borrarlo
            $entry_lot->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'entry_lot' => $entry_lot
            ];
        }else{
            $data = [
                'code' =>  404,
                'status' => 'error',
                'message' => 'El lote de entrada no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }
}
