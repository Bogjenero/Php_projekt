
<?php
$conn = oci_connect('Borna','oracle','192.168.56.50:1521/XEPDB1');
if(!$conn){
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}
function login($username, $password)
{
    global $conn;
    $s = oci_parse($conn, 'SELECT ID, USERNAME, PASSWORD,TIP_KORISNIKA FROM KORISNIK WHERE USERNAME = :username AND PASSWORD = :password');
    oci_bind_by_name($s, ":username", $username);
    oci_bind_by_name($s, ":password", $password);


    oci_execute($s);


    $row = oci_fetch_assoc($s);

    if ($row) {
        echo json_encode(['success' => true,
            'id' => $row['ID'],
            'tip' => $row['TIP_KORISNIKA'],
        ]);
    } else {
       echo json_encode(['success' => false]);
    }

    oci_free_statement($s);
    oci_close($conn);
}
function ispis()
{
   global $conn;
           $s = oci_parse($conn, 'SELECT ID, IME, PREZIME, USERNAME,TIP_KORISNIKA FROM KORISNIK ORDER BY ID');

   oci_execute($s);


   $korisnici = array();


   while ($row = oci_fetch_assoc($s)) {
         $korisnici[] = array(
         'ID' => $row['ID'],
         'IME' => $row['IME'],
         'PREZIME' => $row['PREZIME'],
         'USERNAME' => $row['USERNAME'],
             'TIP' => $row['TIP_KORISNIKA'],
         );
   }
   oci_free_statement($s);

   header('Content-Type: application/json');
   echo json_encode($korisnici);
   oci_close($conn);
}

function pisanje($ime,$prezime,$username,$password,$tip){
    global $conn;
    $s = oci_parse($conn, 'SELECT  id FROM KORISNIK WHERE USERNAME = :username AND PASSWORD = :password');

    oci_bind_by_name($s, ":username", $username);
    oci_bind_by_name($s, ":password", $password);

    oci_execute($s);
    $row = oci_fetch_assoc($s);
    if ($row) {
        echo "false";
    } else {

        $SE = oci_parse($conn,'SELECT kor_id.nextval FROM dual');
        oci_execute($SE);
        $r = oci_fetch_assoc($SE);
        $id = $r['NEXTVAL'];

        $w = oci_parse($conn,'INSERT INTO KORISNIK (id,ime,prezime,username,password,tip_korisnika) VALUES (:id,:ime,:prezime,:username,:password,:tip)');


        oci_bind_by_name($w, ":id", $id);
        oci_bind_by_name($w, ":ime", $ime);
        oci_bind_by_name($w, ":prezime", $prezime);
        oci_bind_by_name($w, ":username", $username);
        oci_bind_by_name($w, ":password", $password);
        oci_bind_by_name($w, ":tip", $tip);

        if (!oci_execute($w)) {
            $error = oci_error($w);
            echo "Greška pri izvršavanju INSERT upita: " . $error['message'];
            oci_close($conn);
            return "false";

        }else{
            oci_execute($w);
            oci_commit($conn);
            oci_close($conn);
        }
        echo "true";
    }

}

function brisanje($id){
    global $conn;

    $s = oci_parse($conn, 'DELETE FROM KORISNIK WHERE id = :id');
    oci_bind_by_name($s, ":id", $id);


    if (!oci_execute($s)) {
        $error = oci_error($s);
        $odgovor = array('status' => 'error', 'message' => $error['message']);
    }else{
        oci_commit($conn);
        $odgovor = array('status' => 'success', 'message' => 'Korisnik uspješno obrisan');
    }
    echo json_encode($odgovor);
    oci_free_statement($s);
    oci_close($conn);
}

function update($id,$ime,$prezime,$username,$tip){
    global $conn;
    $s = oci_parse($conn, 'UPDATE KORISNIK SET ime = :ime,prezime = :prezime,username = :username,tip_korisnika = :tip WHERE id = :id');
    oci_bind_by_name($s, ":id", $id);
    oci_bind_by_name($s, ":ime", $ime);
    oci_bind_by_name($s, ":prezime", $prezime);
    oci_bind_by_name($s, ":username", $username);
    oci_bind_by_name($s, ":tip", $tip);

    $korisnik = array(
        'id' => $id,
        'ime' => $ime,
        'prezime' => $prezime,
        'username' => $username,
        'tip' => $tip,
    );

    if (!oci_execute($s)) {
        $error = oci_error($s);
        $odgovor = array('status' => 'error', 'message' => $error['message']);
    }else{
        oci_commit($conn);
        $odgovor = array('status' => 'success', 'message' => 'Podaci uspjeno promjenjeni','korisnik' => $korisnik);
    }
    echo json_encode($odgovor);
    oci_free_statement($s);
    oci_close($conn);
}


function user($id,$username) {
    global $conn;


    $s = oci_parse($conn, 'SELECT ID, IME, PREZIME, USERNAME,TIP_KORISNIKA FROM KORISNIK WHERE USERNAME = :username AND id = :id');


    oci_bind_by_name($s, ":username", $username);
    oci_bind_by_name($s, ":id", $id);


    if (!oci_execute($s)) {
        $error = oci_error($s);
        oci_free_statement($s);
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'error', 'message' => $error['message']));
        return;
    }


    $row = oci_fetch_assoc($s);


    oci_free_statement($s);


    if (!$row) {
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'error', 'message' => 'Korisnik nije pronađen.'));
        oci_close($conn);
        return;
    }


    $korisnik = array(
        'ID' => $row['ID'],
        'IME' => $row['IME'],
        'PREZIME' => $row['PREZIME'],
        'USERNAME' => $row['USERNAME'],
        'TIP' => $row['TIP_KORISNIKA']
    );


    header('Content-Type: application/json');
    echo json_encode($korisnik);
    oci_close($conn);
}

function ispis_prodaja(){
    global $conn;

    $s = oci_parse($conn, 'SELECT ID_ARTIKLA, NAZIV, KOLICINA, IZNOS, DATUM,VRSTA_ARTIKLA,DATUM FROM PRODAJA ORDER BY ID_ARTIKLA');


    oci_execute($s);


    $artikli = array();


    while ($row = oci_fetch_assoc($s)) {
        $artikli[] = array(
            'ID_artikla' => $row['ID_ARTIKLA'],
            'Naziv' => $row['NAZIV'],
            'Kolicina' => $row['KOLICINA'],
            'Iznos' => $row['IZNOS'],
            'Vrsta' => $row['VRSTA_ARTIKLA'],
            'Datum' => $row['DATUM'],
        );
    }


    oci_free_statement($s);

    header('Content-Type: application/json');
    echo json_encode($artikli);
    oci_close($conn);
}
function grupiraj_prodaja(){
    global $conn;

    $s = oci_parse($conn, 'SELECT VRSTA_ARTIKLA,DATUM, SUM(KOLICINA) AS KOLICINA, SUM(IZNOS) AS IZNOS FROM PRODAJA GROUP BY VRSTA_ARTIKLA,DATUM');


    oci_execute($s);


    $artikli = array();


    while ($row = oci_fetch_assoc($s)) {
        $artikli[] = array(
            'Vrsta' => $row['VRSTA_ARTIKLA'],
            'Datum' => $row['DATUM'],
            'Kolicina' => $row['KOLICINA'],
            'Iznos' => $row['IZNOS']
        );
    }


    oci_free_statement($s);

    header('Content-Type: application/json');
    echo json_encode($artikli);
    oci_close($conn);
}
function filter_datuma($date1, $date2){
    global $conn;

    $s = oci_parse($conn, "SELECT ID_ARTIKLA, NAZIV, KOLICINA, IZNOS,VRSTA_ARTIKLA,DATUM FROM PRODAJA WHERE DATUM >= TO_DATE(:date1, 'YYYY-MM-DD') AND DATUM <= TO_DATE(:date2, 'YYYY-MM-DD') ORDER BY ID_ARTIKLA");
    oci_bind_by_name($s, ":date1", $date1);
    oci_bind_by_name($s, ":date2", $date2);

    oci_execute($s);


    $artikli = array();


    while ($row = oci_fetch_assoc($s)) {
        $artikli[] = array(
            'ID_artikla' => $row['ID_ARTIKLA'],
            'Naziv' => $row['NAZIV'],
            'Kolicina' => $row['KOLICINA'],
            'Iznos' => $row['IZNOS'],
            'Vrsta' => $row['VRSTA_ARTIKLA'],
            'Datum' => $row['DATUM'],
        );
    }

    oci_free_statement($s);
    header('Content-Type: application/json');
    echo json_encode($artikli);
    oci_close($conn);
}
function log_request_data($log_data) {

    $log_file = 'Log.txt';
    $log_message = "##### " . date("Y-m-d H:i:s") . " #####\n";
    $log_message .= "IP Adresa: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $log_message .= "HTTP Metoda: " . $_SERVER['REQUEST_METHOD'] . "\n";
    $log_message .= "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
    $log_message .= "Podaci (POST): " . json_encode($log_data) . "\n";
    $log_message .= "##### KRAJ #####\n\n";
    file_put_contents($log_file, $log_message, FILE_APPEND);
}


if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"])) {
    $action = $_GET["action"];
    log_request_data($_GET);
    if ($action == 'ispis') {
        ispis();
    }
   if($action == 'ispisProdaja')
    {
        ispis_prodaja();
    }
    if($action == 'grupirajProdaja')
    {
        grupiraj_prodaja();
    }
    if($action == 'filterDatuma')
    {
        $date1 = $_GET['date1'];
        $date2 = $_GET['date2'];
       filter_datuma($date1,$date2);
    }
    if($action == 'login')
    {
        $username = $_GET['username'];
        $password = base64_decode($_GET['password']);
        login($username,$password);
    }
}





if($_SERVER["REQUEST_METHOD"] == "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    log_request_data($data);
    $action = $_POST["action"];

    if($action == 'write') {
        pisanje($_POST["ime"],$_POST["prezime"],$_POST["username"],$_POST["password"],$_POST["tip"]);
    }
    if($data['action'] == 'delete') {
        $id = $data['id'];
        brisanje($id);
    }
    if($data['action'] == 'update') {
        update($data['id'],$data["ime"],$data["prezime"],$data["username"],$data['tip']);
    }
    if($data['action'] == 'korisnik'){
        user($data['id'],$data['username']);
    }
}

?>

