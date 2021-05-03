<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class JwtAuth{

    public $key;

    public function __construct(){
        $this->key = 'el _contenido_puede_ser cualquier_cosa-99887766';
    }

    public function signUp($nick, $password, $getToken = null){

        //Buscar si existe el usuario con sus credenciales
        $user = User::where([
            'nick' => $nick,
            'password' => $password
        ])->first();

        //Comprobar si son correctas
        $signup = false;
        if(is_object($user)){
            $signup = true;
        }

        //Generar el token con los datos del usuario identificado
        if($signup){
            $token = array(
                'sub' => $user->id,
                'nick' => $user->nick,
                'name' => $user->name,
                'surname' => $user->surname,
                'description' => $user->description,
                'image' => $user->image,
                'iat' => time(), //para indicar cuando se a creado
                'exp' => time() + (7*24*60*60) //para indicar cuando caducara el token (en este caso indicamos una semana)
            );

            //Codificamos y descodificamos el token
            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);

            //Devolvemos los datos decodificados o el token en función de si el parametro getToken nos llega en nulo o no
            if(is_null($getToken)){
                $data = $jwt;
            }else{
                $data = $decoded;
            }

        }else{
            $data = array(
                'status' => 'error',
                'message' => 'Login incorrecto'
            );
        }

        return $data;
    }

    public function checkToken($jwt, $getIdentity = false){
        $auth = false;

        //Excepciones a posibles fallos
        try{
            //Quitaremos las comillas dobles en caso de que vayan en el token
            $jwt = str_replace('"', '', $jwt);

            //Descodificamos el token
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        }catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        }

        //Comprobamos que la variable decoded no esta vacia, es un objeto, y si esta definido el id del objeto
        if(!empty($decoded) && is_object($decoded) && isset($decoded->sub)){
            $auth = true;
        }else{
            $auth = false;
        }

        //Comprobamos si llega getIdentity y si es así devolver el token descodificado
        if($getIdentity){
            return $decoded;
        }

        return $auth;
    }

}