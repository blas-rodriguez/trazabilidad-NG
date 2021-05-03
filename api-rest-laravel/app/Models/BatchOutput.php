<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchOutput extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'buyer_id',
        'carriers_id',
    ];

    //Definimos  la tabla que estará en el modelo
    protected $table = 'batch_output';

    //Relación de muchos a uno
    public function article(){
        return $this->belongsTo('App\Models\Article', 'article_id');
    }

    public function buyer(){
        return $this->belongsTo('App\Models\Buyer', 'buyer_id');
    }

    public function carrier(){
        return $this->belongsTo('App\Models\Carrier', 'carriers_id');
    }

    //Relacion de uno a muchos
    public function pale(){
        return $this->hasMany('App\Models\Pale');
    }

    public function report(){
        return $this->hasMany('App\Models\Report');
    }

}
