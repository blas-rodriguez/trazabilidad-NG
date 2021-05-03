<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutputDetail extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'output_detail';

    //Relación de muchos a uno
    public function entry_lot(){
        return $this->belongsTo('App\Models\EntryLot', 'entry_lot_id');
    }

    public function packaging_line(){
        return $this->belongsTo('App\Models\PackagingLine', 'packaging_line_id');
    }
}
