<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Article;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);    
    }

    //Lista todos los articulos
    public function index()
    {
        $articles = Article::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'articles' => $articles
        ]);
    }

    //Lista una unica categoria
    public function show($id)
    {
        $article = Article::find($id);

        if (is_object($article)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'article' => $article
            ];
        } else {
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El articulo no existe'
            ];
        }

        return response()->json($data, $data['code']);
    }

    //Guardar un articulo
    public function store(Request $request)
    {
        //Recoger datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if (!empty($params_array)) {
            //Validar la información
            $validate = Validator::make($params_array, [
                'article' => 'required'
            ]);

            //Guardar articulo
            if ($validate->fails()) {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'El articulo no se ha guardado'
                ];
            } else {
                $article = new Article();
                $article->article = $params_array['article'];
                $article->description = $params_array['description'];
                $article->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'article' => $article
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún articulo'
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
                'article' => 'required'
            ]);

            //Quitar lo que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //Actualizo el articulo
            $article = Article::where('id', $id)->update($params_array);

            $data = [
                'code' => 200,
                'status' => 'success',
                'article' => $params_array
            ];
        }else{
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'No has enviado ningún articulo'
            ]; 
        }

        //Devolver el resultado
        return response()->json($data, $data['code']);
    }

    //Borrar un articulo
    public function delete($id, Request $request){
        //Conseguir el articulo
        $article = Article::find($id);

        if(!empty($article)){
            //Borrarlo
            $article->delete();

            $data = [
                'code' => 200,
                'status' => 'success',
                'article' => $article
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'El articulo no existe'
            ];
        }
        
        //Devolver resultado
        return response()->json($data, $data['code']);
    }

}
