<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farmer extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'farmer';

    //Relacion de uno a muchos
    public function notebook(){
        return $this->hasMany('App\Models\Notebook');
    }

    //Relación de muchos a uno
    public function zone(){
        return $this->belongsTo('App\Models\Zone', 'zone_id');
    }
}
