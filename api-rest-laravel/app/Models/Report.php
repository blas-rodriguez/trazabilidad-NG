<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    
    //Definimos  la tabla que estará en el modelo
    protected $table = 'report';

    //Relación de muchos a uno
    public function batch_output(){
        return $this->belongsTo('App\Models\BatchOutput', 'batch_output_id');
    }

    public function entry_lot(){
        return $this->belongsTo('App\Models\BatchOutput', 'entry_lot_id');
    }
}
