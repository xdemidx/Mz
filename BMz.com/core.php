<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'init':
        init();
        break;

         case 'loadGoods':
        loadGoods("all");
        break;

        case 'halo':
        loadGoods("halo");
        break;
        
        case 'fc':
        loadGoods("fc");
        break;   

}