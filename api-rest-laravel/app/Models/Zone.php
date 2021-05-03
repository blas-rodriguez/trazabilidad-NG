<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'zone';

    //Relación de muchos a uno
    public function farmer(){
        return $this->hasMany('App\Models\Farmer');
    }
}
