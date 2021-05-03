<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class UserController extends Controller{

    public function pruebas(Request $request)
    {
        return "Acción de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request){
        
        //Recoger los datos del usuario por post
        $json = $request->input('json', null);

        //Decodificar el json para obtener un objeto o un array
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); //array

        if (!empty($params) && !empty($params_array)){

            //Limpiar datos
            $params_array = array_map('trim', $params_array);

            //Validar datos
            $validate = Validator::make($params_array, [
                'name'     => 'required|alpha',
                'surname'  => 'required|alpha',
                'nick'     => 'required|alpha |unique:users', //Comprobar si el usuario existe (duplicado)
                'password' => 'required'
            ]);

            if ($validate->fails()) {
                //La validación ha fallado
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se ha creado',
                    'errors' => $validate->errors()
                );
            }else{
                //Validación pasada correctamente

                //Cifrar la contraseña
                $pwd = hash('sha256', $params->password);

                //Crear el usuario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->nick = $params_array['nick'];
                $user->password = $pwd;
                $user->role = 'ROLE_USER';

                //Guardar el usuario
                $user->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se ha creado correctamente'
                ); 
            }
        }else{
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Los datos enviados no son correctos'
            );
        }

        return response()->json($data, $data['code']);
    }

    public function login(Request $request){

        $jwtAuth = new JwtAuth;

        //Recibir datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        //Validar esos datos
        $validate = Validator::make($params_array, [
            'nick'     => 'required|alpha',
            'password' => 'required'
        ]);

        if($validate->fails()){
            //La validación ha fallado
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha podido identificar',
                'errors' => $validate->errors()
            );
        }else{
            //Cifrar la password
            $pwd = hash('sha256', $params->password);

            //Devolver token o datos
            $signup = $jwtAuth->signUp($params->nick, $pwd);

            //Comprobamos si getToken esta vacio
            if(!empty($params->gettoken)){
                $signup = $jwtAuth->signUp($params->nick, $pwd, true);
            }
        }

        //Devolvemos un objeto json
        return response()->json($signup, 200);
    }

    public function update(Request $request){
        
        //Comprobamos si el usuario esta identificado, enviando el token por la cabecera Authorization
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth;
        $checkToken = $jwtAuth->checkToken($token);

        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if($checkToken && !empty($params_array)){
            //Sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);

            //Validar los datos
            $validate = Validator::make($params_array, [
                'name'    => 'required|alpha',
                'surname' => 'required|alpha',
                'nick'    => 'required|alpha|unique:users,'.$user->sub
            ]);

            //Quitar los campos que no queremos actualizar
            unset($params_array['id']);
            unset($params_array['role']);
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remember_token']);

            //Actualizar usuario en bbdd
            $user_update = User::where('id', $user->sub)->update($params_array);

            //Devolver array con resultado
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user,
                'changes' => $params_array
            );
        }else{
            $data = array(
                'code' => 400,
                'status' => 'error',
                'messagge' => 'El usuario no está identificado.'
            ); 
        }

        return response()->json($data, $data['code']);
    }

    public function upload(Request $request){
        //Recoger datos de la petición
        $image = $request->file('file0');

        //Validación de la imagen
        $validate = Validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);

        //Guardar imagen
        if (!$image || $validate->fails()){
            
            $data = array(
                'code' => 400,
                'status' => 'error',
                'messagge' => 'Error al subir imagen'
            );
           
        }else{

            $image_name = time() . $image->getClientOriginalName();
            Storage::disk('users')->put($image_name, \File::get($image));

            $data = array(
                'code' => 200,
                'status' => 'success',
                'image' => $image_name
            );            
        }

        return response()->json($data, $data['code']);
    }

    public function getImage($filename){
        //Comprobar si existe la imagen
        $isset = Storage::disk('users')->exists($filename);

        if($isset){
            $file = Storage::disk('users')->get($filename);

            return new Response($file, 200);
        }else{
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'La imagen no existe'
            ); 
            
            return response()->json($data, $data['code']);
        }
        
    }

    public function detail($id){
        //Buscar por el ORM el usuario por el id
        $user = User::find($id);

        if(is_object($user)){
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user
            );
        }else{
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'El usuario no existe'
            ); 
        }

        return response()->json($data, $data['code']);
    }
}
