<?php
    include_once("conexion.php");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    class Laboratorio{
        //id 	prueba_laboratorio 	Condiciones_paciente 	area 	dias 	precio 	muestra 	
        private $prueba_laboratorio;
        private $Condiciones_paciente;
        private $area;
        private $dias;
        private $precio;
        private $muestra;

        public function __construct($prueba_laboratorio, $Condiciones_paciente, $area, $dias, $precio, $muestra){
            $this->prueba_laboratorio = $prueba_laboratorio;
            $this->Condiciones_paciente = $Condiciones_paciente;
            $this->area = $area;
            $this->dias = $dias;
            $this->precio = $precio;
            $this->muestra = $muestra;
        }
        //doc https://www.php.net/manual/es/book.pdo.php
        public static function getLaboratorio($id){
            $con = new Conection("localhost","lagenesis","root","","");
            $conection=$con->dbConection();
            $sql = "SELECT * FROM laboratorio where id = $id";
            $result = $conection->query($sql);
            $rows = $result->fetch();
            $result_["message"] = "get laboratorio";
            $result_["status"] = "ok";
            $result_["data"] = $rows;

            echo json_encode($result_);
            $con->close();
            $result = null;
        }

        public static function getAllLaboratorio(){
            $con = new Conection("localhost","lagenesis","root","","");
            $conection=$con->dbConection();
            $sql = "SELECT * FROM laboratorio ORDER BY id DESC";
            $result = $conection->query($sql);
            $rows = $result->fetchAll();
            $result_["message"] = "Get All laboratorio";
            $result_["status"] = "ok";
            $result_["data"] = $rows;
            echo json_encode($result_);

            $con->close();
            $result = null;
        }

        public function saveLaboratorio(){
          
            $con = new Conection("localhost","lagenesis","root","","");
            $conection=$con->dbConection();
            //id 	prueba_laboratorio 	Condiciones_paciente 	area 	dias 	precio 	muestra 	
            $sql = "INSERT INTO laboratorio (prueba_laboratorio, Condiciones_paciente, area, dias, precio, muestra) VALUES ('$this->prueba_laboratorio', '$this->Condiciones_paciente', '$this->area', '$this->dias', '$this->precio', '$this->muestra')";
            $result = $conection->exec($sql);
            $result_["message"] = "new data added: ".$result;
            $result_["status"] = "ok";
            echo json_encode($result_);
            $con->close();
            $result = null;
           

        }

        public static function deleteLaboratorio($id){
            $con = new Conection("localhost","labgenesis","root","","");
            $conection=$con->dbConection();
            $sql = "DELETE FROM laboratorio WHERE id = $id";
            $result = $conection->exec($sql);
            $result_["message"] = "deleted data : ".$result;
            $result_["status"] = "ok";
            echo json_encode($result_);

            $con->close();
            $result = null;
        }

        public function updateLaboratorio($id){
            //url	nombre	descripcion	categoria	visible	fecha
            $con = new Conection("localhost","lagenesis","root","","");
            $conection=$con->dbConection();
            $sql = "UPDATE laboratorio SET url = '$this->url', nombre = '$this->name',  descripcion = '$this->description', categoria='$this->category', visible='$this->visibility' WHERE id = $id";
            $result = $conection->exec($sql);
            $result_["message"] = "updated data : ".$result;
            $result_["status"] = "ok";
            echo json_encode($result_);

            $con->close();
            $result = null;
        }

    }
?>