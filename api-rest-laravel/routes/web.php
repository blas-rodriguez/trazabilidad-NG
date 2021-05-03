<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BatchOutputController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\CarrierController;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\EntryLotController;
use App\Http\Controllers\EstateController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\NotebookController;
use App\Http\Controllers\OutputDetailController;
use App\Http\Controllers\PackagingLineController;
use App\Http\Controllers\PaleController;
use App\Http\Controllers\ProcessController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PruebasController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZoneController;
use App\Models\BatchOutput;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Ruta de prueba
Route::get('/test-orm', [PruebasController::class, 'testOrm']);
Route::get('/usuario/pruebas', [UserController::class, 'pruebas']);

//Rutas API

    //Rutas controlador de usuarios
    Route::post('/api/register', [UserController::class, 'register']);
    Route::post('/api/login', [UserController::class, 'login']);
    Route::put('/api/user/update', [UserController::class, 'update']);
    Route::post('/api/user/upload',  [UserController::class, 'upload'])->middleware('api.auth');
    Route::get('/api/user/avatar/{filename}',  [UserController::class, 'getImage']);
    Route::get('/api/user/detail/{id}',  [UserController::class, 'detail']);

    //Rutas controlador de articulos
    Route::get('/api/article', [ArticleController::class, 'index']);
    Route::get('/api/article/{id}', [ArticleController::class, 'show']);
    Route::post('/api/article', [ArticleController::class, 'store']);
    Route::put('/api/article/{id}', [ArticleController::class, 'update']);
    Route::delete('/api/article/{id}', [ArticleController::class, 'delete']);
    

    //Rutas controlador de compradores
    Route::get('/api/buyer', [BuyerController::class, 'index']);
    Route::get('/api/buyer/{id}', [BuyerController::class, 'show']);
    Route::post('/api/buyer', [BuyerController::class, 'store']);
    Route::put('/api/buyer/{id}', [BuyerController::class, 'update']);
    Route::delete('/api/buyer/{id}', [BuyerController::class, 'delete']);

    //Rutas controlador de transportistas
    Route::get('/api/carrier', [CarrierController::class, 'index']);
    Route::get('/api/carrier/{id}', [CarrierController::class, 'show']);
    Route::post('/api/carrier', [CarrierController::class, 'store']);
    Route::put('/api/carrier/{id}', [CarrierController::class, 'update']);
    Route::delete('/api/carrier/{id}', [CarrierController::class, 'delete']);

    //Rutas controlador de envase
    Route::get('/api/container', [ContainerController::class, 'index']);
    Route::get('/api/container/{id}', [ContainerController::class, 'show']);
    Route::post('/api/container', [ContainerController::class, 'store']);
    Route::put('/api/container/{id}', [ContainerController::class, 'update']);
    Route::delete('/api/container/{id}', [ContainerController::class, 'delete']);

    //Rutas controlador de finca
    Route::get('/api/estate', [EstateController::class, 'index']);
    Route::get('/api/estate/{id}', [EstateController::class, 'show']);
    Route::post('/api/estate', [EstateController::class, 'store']);
    Route::put('/api/estate/{id}', [EstateController::class, 'update']);
    Route::delete('/api/estate/{id}', [EstateController::class, 'delete']);

    //Rutas controlador de linea de envasado
    Route::get('/api/packaging_line', [PackagingLineController::class, 'index']);
    Route::get('/api/packaging_line/{id}', [PackagingLineController::class, 'show']);
    Route::post('/api/packaging_line', [PackagingLineController::class, 'store']);
    Route::put('/api/packaging_line/{id}', [PackagingLineController::class, 'update']);
    Route::delete('/api/packaging_line/{id}', [PackagingLineController::class, 'delete']);

    //Rutas controlador de zona
    Route::get('/api/zone', [ZoneController::class, 'index']);
    Route::get('/api/zone/{id}', [ZoneController::class, 'show']);
    Route::post('/api/zone', [ZoneController::class, 'store']);
    Route::put('/api/zone/{id}', [ZoneController::class, 'update']);
    Route::delete('/api/zone/{id}', [ZoneController::class, 'delete']);

    //Rutas contronlador de lotes de salida
    Route::get('/api/batch_output', [BatchOutputController::class, 'index']);
    Route::get('/api/batch_output/{id}', [BatchOutputController::class, 'show']);
    Route::post('/api/batch_output', [BatchOutputController::class, 'store']);
    Route::put('/api/batch_output/{id}', [BatchOutputController::class, 'update']);
    Route::delete('/api/batch_output/{id}', [BatchOutputController::class, 'delete']);

    //Rutas controlador de lotes de entrada
    Route::get('/api/entry_lot', [EntryLotController::class, 'index']);
    Route::get('/api/entry_lot/{id}', [EntryLotController::class, 'show']);
    Route::post('/api/entry_lot', [EntryLotController::class, 'store']);
    Route::put('/api/entry_lot/{id}', [EntryLotController::class, 'update']);
    Route::delete('/api/entry_lot/{id}', [EntryLotController::class, 'delete']);

    //Rutas controlador agricultor
    Route::get('/api/farmer', [FarmerController::class, 'index']);
    Route::get('/api/farmer/{id}', [FarmerController::class, 'show']);
    Route::post('/api/farmer', [FarmerController::class, 'store']);
    Route::put('/api/farmer/{id}', [FarmerController::class, 'update']);
    Route::delete('/api/farmer/{id}', [FarmerController::class, 'delete']);

    //Rutas controlador cuaderno de campo
    Route::get('/api/notebook', [NotebookController::class, 'index']);
    Route::get('/api/notebook/{id}', [NotebookController::class, 'show']);
    Route::post('/api/notebook', [NotebookController::class, 'store']);
    Route::put('/api/notebook/{id}', [NotebookController::class, 'update']);
    Route::delete('/api/notebook/{id}', [NotebookController::class, 'delete']);

    //Rutas controlador detalles de salida
    Route::get('/api/output_detail', [OutputDetailController::class, 'index']);
    Route::get('/api/output_detail/{id}', [OutputDetailController::class, 'show']);
    Route::post('/api/output_detail', [OutputDetailController::class, 'store']);
    Route::put('/api/output_detail/{id}', [OutputDetailController::class, 'update']);
    Route::delete('/api/output_detail/{id}', [OutputDetailController::class, 'delete']);

    //Rutas controlador pale
    Route::get('/api/pale', [PaleController::class, 'index']);
    Route::get('/api/pale/{id}', [PaleController::class, 'show']);
    Route::post('/api/pale', [PaleController::class, 'store']);
    Route::put('/api/pale/{id}', [PaleController::class, 'update']);
    Route::delete('/api/pale/{id}', [PaleController::class, 'delete']);

    //Rutas controlador procesos
    Route::get('/api/process', [ProcessController::class, 'index']);
    Route::get('/api/process/{id}', [ProcessController::class, 'show']);
    Route::post('/api/process', [ProcessController::class, 'store']);
    Route::put('/api/process/{id}', [ProcessController::class, 'update']);
    Route::delete('/api/process/{id}', [ProcessController::class, 'delete']);

    //Rutas controlador de reportes
    Route::get('/api/report', [ReportController::class, 'index']);
    Route::get('/api/report/{id}', [ReportController::class, 'show']);
    Route::post('/api/report', [ReportController::class, 'store']);
    Route::put('/api/report/{id}', [ReportController::class, 'update']);
    Route::delete('/api/report/{id}', [ReportController::class, 'delete']);