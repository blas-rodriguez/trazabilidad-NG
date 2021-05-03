<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notebook extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'notebook';

    //Relación de muchos a uno
    public function estate(){
        return $this->belongsTo('App\Models\Estate', 'estate_id');
    }

    public function farmer(){
        return $this->belongsTo('App\Models\Farmer', 'farmer_id');
    }

    //Relación de uno a muchos
    public function entry_lot(){
        return $this->hasMany('App\Models\EntryLot');
    }

    public function process(){
        return $this->hasMany('App\Models\Process');
    }
}
