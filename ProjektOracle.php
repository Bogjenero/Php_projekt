<?php
$conn = oci_connect('EskulapBI_VZ','EskulapBI_VZPWD#','10.146.0.21:1521/orcl');
if(!$conn){
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}
global $Ukupni_broj_podataka_oracle,$Dohvaceni_broj_podataka_oracle;
function grupiraj_prodaja($tip_grupiranja,$date1,$date2){
        global $conn;
        if ($date1 == '' && $date2 == '') {
            $dateCondition = "1 = 1";
        } else {
            $dateCondition = "datum_izdavanja_dt  >= TO_CHAR(TO_DATE(:date1, 'YYYY-MM-DD'), 'DD-MON-YYYY') AND datum_izdavanja_dt  <= TO_CHAR(TO_DATE(:date2, 'YYYY-MM-DD'), 'DD-MON-YYYY') ";
        }
        $sql_poslovnice = "SELECT month_short_desc,NAZIV_POSLOVNICE,ROUND(SUM(prihod),2)  AS Ukupni_prihod,ROUND(SUM(razlika_u_cijeni),2) AS razlika_u_cijeni,ROUND(SUM(kolicina),2) AS suma_kolicina,ROUND(SUM(neto1),2) AS suma_neto,COUNT(DISTINCT id_d_artikli) as BROJ_ARTIKLA
                                    FROM f_prodaja_stavke f
                                    INNER JOIN d_poslovnice p ON f.id_d_poslovnice = p.id
                                    INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id
                                    WHERE ($dateCondition) GROUP BY NAZIV_POSLOVNICE, MONTH_SHORT_DESC  ORDER BY MONTH_SHORT_DESC";
        $sql_artikli= "SELECT  naziv_artikla,ROUND(SUM(prihod),2) AS UKUPNI_PRIHOD, month_short_desc,ROUND(SUM(razlika_u_cijeni),2) AS RAZLIKA_U_CIJENI,ROUND(SUM(kolicina),2)   AS suma_kolicina,ROUND(SUM(neto1),2) AS suma_neto
                            FROM f_prodaja_stavke f
                            INNER JOIN d_poslovnice p ON f.id_d_poslovnice = p.id
                            INNER JOIN d_artikli a ON f.id_d_artikli = a.id
                            INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id
                            WHERE ($dateCondition) GROUP BY naziv_artikla, month_short_desc ORDER BY naziv_artikla";
    if ($tip_grupiranja == "grupirajPoslovniceProdajaOracle") {
            $sql = oci_parse($conn, "SELECT * FROM ($sql_poslovnice)  WHERE rownum <= (2000)");
        }
        else if ($tip_grupiranja == "grupirajArtikleProdajaOracle") {
            $sql = oci_parse($conn, "SELECT * FROM ($sql_artikli) WHERE rownum <= (1000)");
        }
        oci_bind_by_name($sql, ":date1", $date1);
        oci_bind_by_name($sql, ":date2", $date2);
        if (!oci_execute($sql)) {
            $error = oci_error($sql);
            echo json_encode(['error' => $error['message']]);
            exit;
        }
        $broj_rezultata = 0;
        $artikli = array();
        if ($tip_grupiranja == "grupirajArtikleProdajaOracle") {
            while ($row = oci_fetch_assoc($sql)) {
               ++$broj_rezultata;
                $artikli[] = [
                    'Artikl' => $row['NAZIV_ARTIKLA'],
                    'Datum' => $row['MONTH_SHORT_DESC'],
                    'Ukupni_prihod' => (float)$row['UKUPNI_PRIHOD'],
                    'Razlika_cijena' => (float)$row['RAZLIKA_U_CIJENI'],
                    'Kolicina' => $row['SUMA_KOLICINA'],
                    'Neto' => (float)$row['SUMA_NETO'],
                    'Ukupni_broj_podataka' => $broj_rezultata];
            }
        } else {
            while ($row = oci_fetch_assoc($sql)) {
                ++$broj_rezultata;
                $artikli[] = [
                    'Poslovnica' => $row['NAZIV_POSLOVNICE'],
                    'Datum' => $row['MONTH_SHORT_DESC'],
                    'Ukupni_prihod' => (float)$row['UKUPNI_PRIHOD'],
                    'Razlika_cijena' => (float)$row['RAZLIKA_U_CIJENI'],
                    'Kolicina' => (float)$row['SUMA_KOLICINA'],
                    'Neto' => (float)$row['SUMA_NETO'],
                    'Broj_artikla' => (float)$row['BROJ_ARTIKLA'],
                    'Ukupni_broj_podataka' => $broj_rezultata];
            }
        }
        oci_free_statement($sql);
        header('Content-Type: application/json');
        echo json_encode($artikli);
        oci_close($conn);
}
function ispis_prodaja($br_stranice,$date1,$date2){
    global $conn,$Ukupni_broj_podataka_oracle,$Dohvaceni_broj_podataka_oracle;
    $vece_od = ($br_stranice-1)*100;
    $manje_od = $br_stranice*100;
    if ($date1 == '' && $date2 == '') {
      $dateCondition = "1 = 1";
    } else {
        $dateCondition = "datum_izdavanja_dt  >= TO_CHAR(TO_DATE(:date1, 'YYYY-MM-DD'), 'DD-MON-YYYY') AND datum_izdavanja_dt  <= TO_CHAR(TO_DATE(:date2, 'YYYY-MM-DD'), 'DD-MON-YYYY') ";
    }
    $sql_ispis = "SELECT MONTH_SHORT_DESC,NAZIV_ARTIKLA,NAZIV_POSLOVNICE,KOLICINA,ROUND(NETO1,2) AS NETO1,RBR,ROUND(PRIHOD,2) AS PRIHOD FROM f_prodaja_stavke f INNER JOIN d_poslovnice p
                ON f.id_d_poslovnice = p.id  INNER JOIN d_artikli a ON f.id_d_artikli = a.id INNER JOIN d_time_calendar c ON f.datum_izdavanja_dt = c.day_id WHERE ($dateCondition) ORDER BY load_id,rbr";

    $sql = oci_parse($conn,"select * from (select rslts.*, rownum as rec_no from ($sql_ispis) rslts where  rownum <= ($manje_od)) where  rec_no > ($vece_od)");
    oci_bind_by_name($sql, ":date1", $date1);
    oci_bind_by_name($sql, ":date2", $date2);
    if($br_stranice == 1)
    {
        $sql2 = oci_parse($conn, "SELECT COUNT(*) AS TOTAL_COUNT FROM ($sql_ispis)");
        oci_execute($sql2);
        $row = oci_fetch_assoc($sql2);
        $Ukupni_broj_podataka_oracle = $row['TOTAL_COUNT'];
    }
    if (!oci_execute($sql)) {
        $error = oci_error($sql);
        echo json_encode(['error' => $error['message']]);
        exit;
    }
    $Dohvaceni_broj_podataka_oracle = 0;
    $artikli = array();
    while ($row = oci_fetch_assoc($sql)) {
        ++$Dohvaceni_broj_podataka_oracle;
        $artikli[] = array(
            'Datum' => $row['MONTH_SHORT_DESC'],
            'Naziv_artikla' => $row['NAZIV_ARTIKLA'],
            'Naziv_poslovnice' => $row['NAZIV_POSLOVNICE'],
            'Kolicina' => (float)$row['KOLICINA'],
            'Neto' => (float)$row['NETO1'],
            'Rbr' => (float)$row['RBR'],
            'Prihod' => (float)$row['PRIHOD'],
            'Ukupni_broj_podataka' => $Ukupni_broj_podataka_oracle,
            'Dohvaceni_broj_podataka' => $Dohvaceni_broj_podataka_oracle
        );
    }
    oci_free_statement($sql);
    header('Content-Type: application/json');
    echo json_encode($artikli);
    oci_close($conn);
}
function log_request_data($log_data) {
    $log_file = 'LogOracle.txt';
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
        $tip_grupiranja = $_GET['tip_grupiranja'];
        $date1 = $_GET['date1'];
        $date2 = $_GET['date2'];
        ispis_prodaja($br_stranice,$date1,$date2);
    }
}
