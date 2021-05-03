<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'process';

    //Relación de muchos a uno
    public function notebook(){
        return $this->belongsTo('App\Models\Notebook', 'notebook_id');
    }
}
