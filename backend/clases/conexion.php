<?php
    class Conection{
        private $host = "localhost";
        private $database = "labgenesis";
        private $user = "root";
        private $password = "";
        private $port = "";
        private $connection;

        public function __construct($host, $database, $user, $password, $port){
            $this->host = $host;
            $this->database = $database;
            $this->user = $user;
            $this->password = $password;
            $this->port = $port;
        }

        public function getHost(){
            return $this->host;

        }

        public function getDatabase(){
            return $this->database;
        }

        public function getUser(){
            return $this->user;
        }

        public function getPassword(){
            return $this->password;
        }

        public function getPort(){
            return $this->port;
        }

        public function setHost($host){
            $this->host = $host;
        }

        public function setDatabase($database){
            $this->database = $database;
        }

        public function setUser($user){
            $this->user = $user;
        }

        public function getConnection(){
            return $this->connection;
        }
/*
        public function dbConection(){
            try{
                $this->connection = new PDO("mysql:host=$this->host;dbname=$this->database", $this->user, $this->password);
                
            } catch (PDOExeption $e){
                echo "error de conexion a -> $this->database :: error:".$e->getMessage();
            }
            return $this->connection;
        }*/
        public function dbConection(){
            $dbname = "labgenesis";
            $dns = "mysql:host=localhost;dbname=$dbname";
            
            //$user= "notarteb_user";
            //$password="notarte-bolivia33";

            $user= "genesi_lab-genesis";
            $password="laboratoriogenesis";
            
            
            try {
                $this->connection = new PDO($dns, $user, $password);
                //echo "conecto";
            } catch(PDOExeption $e){
                echo $e->getMessage();
            }
            return $this->connection;
        }

        public function close(){
            $this->connection = null;
        }
    }
?>