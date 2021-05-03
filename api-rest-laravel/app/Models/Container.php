<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'container';

    //Relación de uno a muchos
    public function pale(){
        return $this->hasMany('App\Models\Pale');
    }
}
