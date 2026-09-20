<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Loaded by RouteServiceProvider with 'api' middleware group.
|--------------------------------------------------------------------------
*/

$featureRoutes = glob(base_path('app/Features/*/Routes/*.php'));

foreach ($featureRoutes as $routeFile) {
    require $routeFile;
}
