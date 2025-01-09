<?php
require 'vendor/autoload.php';
$config = [
    'host' => '10.146.0.23',
    'port' => '8123',
    'username' => 'Borna',
    'password' => 'Borna123',
    'https' => false
];
global $db;
global $broj_podataka_clickhouse;
global $Ukupni_broj_podataka_clickhouse;
$db= new ClickHouseDB\Client($config);
$db->setTimeout(6000000);
$db->database('bazadb');
function grupiraj_prodaja($tip_grupiranja,$date1,$date2)
{
    global $db;
    $sql = "SELECT naziv_poslovnice,month_short_desc,round(Ukupni_prihod, 2) AS Ukupni_prihod,round(razlika_u_cijeni, 2) AS razlika_u_cijeni,round(suma_kolicina,2) AS suma_kolicina, round(suma_neto,2) AS suma_neto,broj_artikla
                        FROM (SELECT naziv_poslovnice,SUM(prihod) AS Ukupni_prihod,month_short_desc,SUM(razlika_u_cijeni) AS razlika_u_cijeni,SUM(kolicina) AS suma_kolicina,SUM(neto1) AS suma_neto,COUNT(DISTINCT id_d_artikli) as broj_artikla
                            FROM f_prodaja_stavke f
                            INNER JOIN d_poslovnice p ON f.id_d_poslovnice = p.id
                            INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id
                            WHERE  (datum_izdavanja_dt >= :date1 AND datum_izdavanja_dt <= :date2) OR (:date1 = '' AND :date2 = '')
                            GROUP BY naziv_poslovnice, month_short_desc LIMIT 2000) AS subquery";
    $results = null;

    $sql3 = "SELECT naziv_artikla, month_short_desc,round(Ukupni_prihod, 2) AS Ukupni_prihod,round(razlika_u_cijeni, 2) AS razlika_u_cijeni,round(suma_kolicina,2) as suma_kolicina, round(suma_neto,2) as suma_neto
                        FROM (SELECT naziv_artikla, SUM(prihod) AS Ukupni_prihod,month_short_desc, SUM(razlika_u_cijeni) AS razlika_u_cijeni, SUM(kolicina) AS suma_kolicina, SUM(neto1) AS suma_neto
                            FROM f_prodaja_stavke f
                            INNER JOIN d_poslovnice p ON f.id_d_poslovnice = p.id
                            INNER JOIN d_artikli a ON f.id_d_artikli = a.id
                            INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id
                            WHERE (datum_izdavanja_dt >= :date1 AND datum_izdavanja_dt <= :date2) OR (:date1 = '' AND :date2 = '') GROUP BY naziv_artikla, month_short_desc LIMIT 1000) AS subquery";
    if ($tip_grupiranja == "grupirajPoslovniceProdaja") {
            $results = $db->select($sql, ['date1' => $date1, 'date2' => $date2])->rows();
        }
    else if ($tip_grupiranja == "grupirajArtikleProdaja") {
        $results = $db->select($sql3, ['date1' => $date1, 'date2' => $date2])->rows();
    }
    $artikli = [];
    $broj_rezultata = count($results);
    if ($tip_grupiranja == "grupirajArtikleProdaja") {
        foreach ($results as $row) {
        $artikli[] = [
              'Artikl' => $row['naziv_artikla'],
              'Datum' => $row['month_short_desc'],
              'Ukupni_prihod' => $row['Ukupni_prihod'],
              'Razlika_cijena' => $row['razlika_u_cijeni'],
              'Kolicina' => $row['suma_kolicina'],
              'Neto' => $row['suma_neto'],
              'Ukupni_broj_podataka' => $broj_rezultata];
            }
    } else {
      foreach ($results as $row) {
           $artikli[] = [
             'Poslovnica' => $row['naziv_poslovnice'],
             'Datum' => $row['month_short_desc'],
             'Ukupni_prihod' => $row['Ukupni_prihod'],
             'Razlika_cijena' => $row['razlika_u_cijeni'],
             'Kolicina' => $row['suma_kolicina'],
             'Neto' => $row['suma_neto'],
             'Broj_artikla' => $row['broj_artikla'],
             'Ukupni_broj_podataka' => $broj_rezultata];
            }
        }
        header('Content-Type: application/json');
        echo json_encode($artikli);
}
function ispis_prodaja($br_stranice,$date1,$date2){
                global $db, $Ukupni_broj_podataka_clickhouse;

                $vece_od = ($br_stranice - 1) * 100;
                $manje_od = $br_stranice * 100;
                $sql_ispis = "SELECT month_short_desc, naziv_artikla, naziv_poslovnice, kolicina, round(neto1,2) as neto1, rbr, round(prihod,2) as prihod
                  FROM f_prodaja_stavke f
                  INNER JOIN d_poslovnice p ON f.id_d_poslovnice = p.id
                  INNER JOIN d_artikli a ON f.id_d_artikli = a.id
                  INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id
                  WHERE (datum_izdavanja_dt >= :date1 AND datum_izdavanja_dt <= :date2) 
                     OR (:date1 = '' AND :date2 = '') ";

                if ($br_stranice == 1) {
                    $sql2 = "SELECT COUNT(*) AS total_count FROM($sql_ispis) AS total_count";
                    $result = $db->select($sql2, ['manje_od' => $manje_od, 'vece_od' => $vece_od, 'date1' => $date1, 'date2' => $date2])->rows();
                    $Ukupni_broj_podataka_clickhouse = $result[0]['total_count'];
                }
                $sql = "SELECT * FROM (SELECT rslts.*, row_number() OVER () AS rec_no FROM ($sql_ispis) rslts) AS filtered_rslts WHERE rec_no <= ($manje_od) AND rec_no > ($vece_od) ORDER BY rec_no";

                $results = $db->select($sql, ['date1' => $date1, 'date2' => $date2])->rows();

                $artikli = [];
                foreach ($results as $row) {
                    $artikli[] = [
                        'Datum' => $row['month_short_desc'],
                        'Naziv_artikla' => $row['naziv_artikla'],
                        'Naziv_poslovnice' => $row['naziv_poslovnice'],
                        'Kolicina' => $row['kolicina'],
                        'Neto' => $row['neto1'],
                        'Rbr' => $row['rbr'],
                        'Prihod' => $row['prihod'],
                        'Ukupni_broj_podataka' => $Ukupni_broj_podataka_clickhouse,
                        'Dohvaceni_broj_podataka' => count($results)];
                }
                header('Content-Type: application/json');
                echo json_encode($artikli);
}
function log_request_data($log_data) {
    $log_file = 'LogClickHouse.txt';
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
    if ($action == 'grupirajProdaja') {
        $br_stranice = $_GET['br_stranice'];
        $tip_grupiranja = $_GET['tip_grupiranja'];
        $date1 = $_GET['date1'];
        $date2 = $_GET['date2'];
        grupiraj_prodaja($tip_grupiranja,$date1,$date2);
    }
    if ($action == 'ispisProdaja') {
        $br_stranice = $_GET['br_stranice'];
        $date1 = $_GET['date1'];
        $date2 = $_GET['date2'];
        ispis_prodaja($br_stranice,$date1,$date2);
    }
}
