<?php
    header("Content-Type: application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    include_once("../clases/class-laboratorio.php");
    switch ($_SERVER['REQUEST_METHOD']) {
    
    // //id 	prueba_laboratorio 	Condiciones_paciente 	area 	dias 	precio 	muestra 
        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'), true);
            echo $_POST['prueba_laboratorio'];
            $lab= new Laboratorio($_POST['prueba_laboratorio'],$_POST['Condiciones_paciente'],$_POST['area'],$_POST['dias'],$_POST['precio'],$_POST['muestra']);
            $lab->saveLaboratorio();
            break;
        case 'GET':
            //$_GET = json_decode(file_get_contents('php://input'), true);
            
            if(isset($_GET["id"])){
                Laboratorio::getLaboratorio($_GET["id"]);
            } else {
                Laboratorio::getAllLaboratorio();
            }
            
            break;
        case 'PUT':
            $_PUT = json_decode(file_get_contents('php://input'), true);
            if(isset($_PUT["id"])){

                $lab= new Laboratorio($_PUT['prueba_laboratorio'],$_PUT['Condiciones_paciente'],$_PUT['area'],$_PUT['dias'],$_PUT['precio'],$_PUT['muestra']);
                $lab->updateLaboratorio($_PUT["id"]);

            } else {
                $result["message"] = "put: debe enviar un id";
                $result["status"] = "error";
                echo json_encode($result);
            }
            break;
        case 'DELETE':
            $_DELETE = json_decode(file_get_contents('php://input'), true);
            if(isset($_DELETE["id"])){
                Laboratorio::deleteLaboratorio($_DELETE["id"]);
            } else {
                $result["message"] = "delete: debe enviar un id";
                $result["status"] = "error";
                echo json_encode($result);
            }
            break;
        default:
            $result["message"] = "Error: metodo no soportado";
            $result["status"] = "error";
            echo json_encode($result);
            break;
    }

?>