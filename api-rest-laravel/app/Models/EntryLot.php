<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntryLot extends Model
{
    use HasFactory;

    //Definimos  la tabla que estará en el modelo
    protected $table = 'entry_lot';

    //Relación de muchos a uno
    public function article(){
        return $this->belongsTo('App\Models\Article', 'article_id');
    }

    public function carrier(){
        return $this->belongsTo('App\Models\Carrier', 'carrier_id');
    }

    public function notebook(){
        return $this->belongsTo('App\Models\Notebook', 'notebook_id');
    }

    //Relación de uno a muchos
    public function report(){
        return $this->hasMany('App\Models\Report');
    }

    public function output_detail(){
        return $this->hasMany('App\Models\OutputDetail');
    }
}
