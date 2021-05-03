<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estate extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'estate';

    //Relacion de muchos a uno
    public function notebook(){
        return $this->hasMany('App\Models\Notebook');
    }
}
