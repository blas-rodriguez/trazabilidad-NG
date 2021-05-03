<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Container;
use Illuminate\Support\Facades\Validator;

class ContainerController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los envases
    public function index()
    {
        $containers = Container::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'containers' => $containers
        ]);
    }

    //Listar un unico envase
    public function show($id){
        $container = Container::find($id);

        if(is_object($container)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'container' => $container
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'El envase no existe'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }

    //Guardar un envase
    public function store(Request $request)
    {
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'container' => 'required',
                'weight' => 'required'
            ]);

            //Guardar envase
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El articulo no se ha guardado'
                ];
            }else{
                $container = new Container();
                $container->container = $params_array['container'];
                $container->weight = $params_array['weight'];
                $container->description = $params_array['description'];
                $container->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'container' => $container
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún envase'
            ];
        }

        //Devolver resultado
        return response()->json($data, $data['code']);
    }

    //Actualizar envase
    public function update($id, Request $request){
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            //Validar la información
            $validate = Validator::make($params_array, [
                'container' => 'required'
            ]);

            //Quitar lo  que no se desea actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo el envase
            $container = Container::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'container' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún envase'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }

    //Borrar un envase
    public function delete($id, Request $request){
        //Conseguir el envase
        $container = Container::find($id);

        if(!empty($container)){
            //Borrarlo
            $container->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'container' => $container
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El envase no existe'
            ];
        }

        //Devolver respuesta
        return response()->json($data, $data['code']);
    }
}
