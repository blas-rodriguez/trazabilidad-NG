<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //Comprobamos si el usuario esta identificado, enviando el token por la cabecera Authorization
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth;
        $checkToken = $jwtAuth->checkToken($token);

        if($checkToken){
            return $next($request);   
        }else{
            $data = array(
                'code'=> 400,
                'status' => 'error',
                'message' => 'El usuario no está identificado'
            );

            return response()->json($data, $data['code']);
        }
        
    }
}
