<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pale extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'pale';

    //Relación de muchos a uno
    public function packaging_line(){
        return $this->belongsTo('App\Models\PackagingLine', 'packaging_line_id');
    }

    public function container(){
        return $this->belongsTo('App\Models\Container', 'container_id');
    }
    
    public function batch_output(){
        return $this->belongsTo('App\Models\BatchOutput', 'batch_output_id');
    }
}
