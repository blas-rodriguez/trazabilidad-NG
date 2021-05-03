<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BatchOutput;

class PruebasController extends Controller
{
    //Pruebas de las tablas
    public function testOrm(){
        $posts = BatchOutput::all();
        var_dump($posts);

        die();
    }
}
