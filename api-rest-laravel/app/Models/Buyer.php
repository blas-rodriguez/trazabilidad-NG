<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'buyer';

    //Relacion de uno a muchos
    public function batch_output(){
        return $this->hasMany('App\Models\BatchOutput');
    }
    
}
