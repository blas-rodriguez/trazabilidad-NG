<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackagingLine extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'packaging_line';

    //Relación de muchos a uno
    public function output_detail(){
        return $this->hasMany('App\Models\OutputDetail');
    }

    public function pale(){
        return $this->hasMany('App\Models\Pale');
    }
}
