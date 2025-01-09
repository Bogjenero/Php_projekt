let broj_stranica_tablice_oracle = 1;
let broj_stranica_tablice_clickhouse = 1;
let ukupni_broj_podataka_oracle = 0;
let ukupni_broj_podataka_clickhouse = 0;
localStorage.clear();
sessionStorage.setItem('tip_prikaza','ispisProdaja');
window.onload = function () {
    document.getElementById('filterPodataka').style.display='none';
    document.getElementById('DeleteMessageSucces').style.display='none';
    document.getElementById('DeleteMessageError').style.display='none';
    document.getElementById('DeleteMessage').style.display='none';
    document.getElementById('popupForm').style.display = 'none';
    document.getElementById('popupMessage').style.display = 'none';
    document.getElementById('popupMessageError').style.display = 'none';
    document.getElementById('NoDate').style.display = 'none';
    document.getElementById('NoUser').style.display = 'none';
    document.getElementById('promjeni').style.display = 'none';
    document.getElementById('ime').value = '';
    document.getElementById('prezime').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('OdDatum').value = '';
    document.getElementById('DoDatuma').value = '';
}
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (!user ||  user.isLogged !== true) {
        window.location.href = 'Login.html';
    }
})
window.addEventListener('load',()=> {
    const hash = window.location.hash;
    if(hash==='#first'){
        IspisSvihKorisnika()
    }
    if(hash === '#second'){
        document.getElementById('ClickhouseSelect').selectedIndex = 0;
        document.getElementById('OdDatumClickHouse').value = "";
        document.getElementById('DoDatumaClickHouse').value = "";
        showDataClickhouse(document.getElementById('ClickhouseSelect').value,1,"ispisProdaja")

    }
    if(hash === '#third'){
        document.getElementById('OracleSelect').selectedIndex = 0;
        document.getElementById('OdDatum').value = "";
        document.getElementById('DoDatuma').value = "";
        showDataOracle(document.getElementById('OracleSelect').value,1,"ispisProdaja");
    }
})
document.getElementById('dodaj').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('popupForm').style.display = 'block';
})
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'none'
})
document.getElementById('closeBtn2').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('closeBtn3').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('closeBtn4').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('closeBtn5').addEventListener('click', () => {
    document.getElementById('DeleteMessage').style.display = 'none'
})
document.getElementById('closeBtn6').addEventListener('click', () => {
    document.getElementById('DeleteMessageError').style.display = 'none'
})
document.getElementById('closeBtn7').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('closeBtn8').addEventListener('click', () => {
    document.getElementById('NoDeleteMessage').style.display = 'none'
})
document.getElementById('closeBtnEdit').addEventListener('click', () => {
    document.getElementById('EditpopupForm').style.display = 'none'
})
document.getElementById('closeBtn9').addEventListener('click', () => {
    document.getElementById('filterPodataka').style.display = 'none'
})
document.getElementById('closeBtn10').addEventListener('click', () => {
    document.getElementById('NoDate').style.display = 'none'
})
document.getElementById('closeBtn11').addEventListener('click', () => {
    document.getElementById('NoUser').style.display = 'none'
})
document.getElementById('closeBtn12').addEventListener('click', () => {
    document.getElementById('filterPodatakaClickHouse').style.display = 'none'
})
document.getElementById('closeBtn13').addEventListener('click', () => {
    document.getElementById('WrongDate').style.display = 'none'
})
document.getElementById('closeBtn14').addEventListener('click', () => {
    document.getElementById('NoData').style.display = 'none'
})

document.getElementById('closeBtnEdit3').addEventListener('click', () => {
    document.getElementById('EditpopupForm2').style.display = 'none'
})

document.getElementById('ok').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('ok2').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('ok3').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('ok3').addEventListener('click', () => {
    document.getElementById('DeleteMessageError').style.display = 'none'
})
document.getElementById('ok4').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('ok5').addEventListener('click', () => {
    window.location.reload();
})
document.getElementById('ok6').addEventListener('click', () => {
    document.getElementById('NoDeleteMessage').style.display = 'none'
})
document.getElementById('ok7').addEventListener('click', () => {
    document.getElementById('NoDate').style.display = 'none'
})
document.getElementById('ok8').addEventListener('click', () => {
    document.getElementById('NoUser').style.display = 'none'
})
document.getElementById('ok9').addEventListener('click', () => {
    document.getElementById('WrongDate').style.display = 'none'
})
document.getElementById('ok10').addEventListener('click', () => {
    document.getElementById('NoData').style.display = 'none'
})
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    let ime = document.getElementById('ime').value;
    let prezime = document.getElementById('prezime').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let role = document.getElementById('role').value;
    fetch('Projekt.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            action: 'write',
            ime: ime,
            prezime: prezime,
            username: username,
            password: password,
            tip: role
        })
    }).then(response => response.text())
        .then(data => {
            if (data.trim() === "true") {
                document.getElementById('popupForm').style.display = 'none';
                document.getElementById('popupMessage').style.display = 'block';
            } else {
                document.getElementById('popupForm').style.display = 'none';
                document.getElementById('popupMessageError').style.display = 'block';
                document.getElementById('ime').value = '';
                document.getElementById('prezime').value = '';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        })
})
document.addEventListener("DOMContentLoaded", function () {
    const welcomeSection = document.getElementById("welcome");
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            welcomeSection.style.display = "none";
        });
    });
});
document.getElementById('odjava').addEventListener('click',()=>{
    sessionStorage.removeItem('user');
    window.location.href = 'Login.html';
})
document.getElementById('dohvacanje_korisnika').addEventListener('click',()=>{
    IspisSvihKorisnika();
})
function IspisSvihKorisnika() {
            let url = 'Projekt.php?action=ispis';
            document.getElementById('spinnerContainer').style.display = 'flex';
            document.body.classList.add('blocked');
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('spinnerContainer').style.display = 'none';
                    document.body.classList.remove('blocked');
                    if (data.length === 0) {
                        document.getElementById('NoUser').style.display ='block';
                    } else {
                        const user = JSON.parse(sessionStorage.getItem('user'));
                        if(user.tip === 'Admin'){
                            document.getElementById('table-container3').style.display = 'none';
                                let tbody = document.querySelector('#Tablica tbody');
                                tbody.innerHTML = '';
                                let id = 0;
                                let tip = '';
                                data.forEach(row => {
                                    let tr = document.createElement('tr');
                                    Object.values(row).forEach(value => {
                                        let td = document.createElement('td');
                                        td.textContent = value;
                                        if (!/[a-zA-Z]/.test(value)) {
                                            td.style.textAlign = 'right';
                                        }
                                        else {
                                            td.style.textAlign = 'left';
                                        }
                                        tr.appendChild(td);
                                    });
                                    let deleteButton = document.createElement('button');
                                    deleteButton.textContent = 'Izbriši';
                                    deleteButton.classList.add('delete-btn');

                                    let editButton = document.createElement('button');
                                    editButton.textContent = 'Promjeni';
                                    editButton.classList.add('edit-btn');

                                    let thActions = document.createElement('th');
                                    thActions.id = 'actions-header';

                                    let tdActions = document.createElement('td');
                                    tdActions.id = 'actions-column';

                                    tdActions.appendChild(deleteButton);
                                    tdActions.appendChild(editButton);

                                    tr.appendChild(tdActions);

                                    tbody.appendChild(tr);

                                    editButton.addEventListener('click', ()=> {
                                        document.getElementById('EditpopupForm').style.display = 'block';
                                        id = row['ID'];
                                        document.getElementById('Eime').value = row['IME'];
                                        document.getElementById('Eprezime').value = row['PREZIME'];
                                        document.getElementById('Eusername').value = row['USERNAME'];
                                        document.getElementById('Erole').value = row['TIP'];
                                    });
                                    deleteButton.addEventListener('click', () => {
                                        const user = sessionStorage.getItem('user');
                                        const data = JSON.parse(user);
                                        const id_kor = data.id;
                                        const id_korisnika = row['ID'];
                                        if (id_korisnika === id_kor) {
                                            document.getElementById('NoDeleteMessage').style.display = 'block';
                                        }else {
                                            document.getElementById('DeleteMessage').style.display = 'block';
                                            id = row['ID'];
                                        }
                                    })
                                    tbody.appendChild(tr);
                                });
                        document.getElementById('da').addEventListener('click', function(event) {
                            event.preventDefault();
                            document.getElementById('DeleteMessage').style.display = 'none';
                            fetch('Projekt.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    action: 'delete',
                                    id: id
                                })
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Greška pri brisanju korisnika');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    if(data.status === 'success') {
                                        document.getElementById('DeleteMessageSucces').style.display = 'block';
                                    }
                                })
                                .catch(error => {
                                    console.error('Greška u fetch zahtjevu:', error);
                                });
                        });
                        document.getElementById('Esubmit').addEventListener('click',function (event){
                            event.preventDefault();
                            const ime = document.getElementById('Eime').value;
                            const prezime = document.getElementById('Eprezime').value;
                            const username = document.getElementById('Eusername').value;
                            const tip = document.getElementById('Erole').value;
                            fetch('Projekt.php',{
                                method:'POST',
                                headers: {
                                    'Content-Type': 'aplication/json',
                                },
                                body: JSON.stringify({
                                    action:'update',
                                    id: id,
                                    ime: ime,
                                    prezime: prezime,
                                    username: username,
                                    tip: tip
                                })
                            }) .then(response =>{
                                if(!response.ok)
                                {
                                    throw new Error('Greška prilikom promjene podataka');
                                }
                                return response.json();
                            }).then(data =>{
                                document.getElementById('UpdateMessage').style.display = 'block';
                                const user = sessionStorage.getItem('user');
                                const userData = JSON.parse(user);
                                const currentUserId = userData.id;
                                if(currentUserId === data.korisnik.id ){
                                    const user = {id:data.korisnik.id, username: username, password: password,isLogged: true,tip:data.korisnik.tip};
                                    sessionStorage.setItem('user',JSON.stringify(user))
                                }
                            }).catch(error=>{
                                if (error instanceof TypeError) {
                                    console.error('Network issue or invalid URL.');
                                } else {
                                    console.error('Other error:', error.message);
                                }
                            })
                        })
                        }else{
                            document.getElementById('dodaj').style.display = 'none';
                            document.getElementById('table-container3').style.display = 'none';
                            let tbody = document.querySelector('#Tablica tbody');
                            tbody.innerHTML = '';

                            const user = sessionStorage.getItem('user');
                            const userData = JSON.parse(user);
                            const currentUserId = userData.id;
                            data.forEach(row => {
                                let tr = document.createElement('tr');
                                Object.values(row).forEach(value => {
                                    let td = document.createElement('td');
                                    td.textContent = value;
                                    tr.appendChild(td);
                                });
                                if (row['ID'] === currentUserId) {
                                    let editButton = document.createElement('button');
                                    editButton.textContent = 'Promjeni';
                                    editButton.classList.add('edit-btn');
                                    let tdActions = document.createElement('td');
                                    tdActions.classList.add('actions-column');
                                    tdActions.appendChild(editButton);
                                    tr.appendChild(tdActions);
                                    editButton.addEventListener('click', ()=> {
                                        document.getElementById('EditpopupForm2').style.display = 'block';
                                        id = row['ID'];
                                        tip = row['TIP'];
                                        document.getElementById('Eime2').value = row['IME'];
                                        document.getElementById('Eprezime2').value = row['PREZIME'];
                                        document.getElementById('Eusername2').value = row['USERNAME'];
                                    })
                                }
                                tbody.appendChild(tr);
                            });
                            document.getElementById('Esubmit2').addEventListener('click',function (event){
                                event.preventDefault();
                                const ime = document.getElementById('Eime2').value;
                                const prezime = document.getElementById('Eprezime2').value;
                                const username = document.getElementById('Eusername2').value;
                                fetch('Projekt.php',{
                                    method:'POST',
                                    headers: {
                                        'Content-Type': 'aplication/json',
                                    },
                                    body: JSON.stringify({
                                        action:'update',
                                        id: id,
                                        ime: ime,
                                        prezime: prezime,
                                        username: username,
                                        tip: tip
                                    })
                                }) .then(response =>{
                                    if(!response.ok)
                                    {
                                        throw new Error('Greška prilikom promjene podataka');
                                    }
                                    return response.json();
                                }).then(data =>{
                                    document.getElementById('UpdateMessage').style.display = 'block';
                                }).catch(error=>{
                                    console.error('Greška u fetch zahtjevu:', error);
                                })
                            })
                        }
                    }
                })
                .catch(error => {
                    console.error('Greška:', error);
                });
}
document.getElementById('Prikazi').addEventListener('click',()=>{
    var selectedValue = document.getElementById('ClickhouseSelect').value;
    document.getElementById('pagination').style.display = 'none';
    broj_stranica_tablice_clickhouse = 1;
    if(selectedValue === "ispisProdaja"){
        showDataClickhouse(selectedValue,broj_stranica_tablice_clickhouse,"ispisProdaja");
        sessionStorage.setItem('tip_prikaza',selectedValue);
    }else {
        showDataClickhouse(selectedValue,broj_stranica_tablice_clickhouse,"grupirajProdaja");
        sessionStorage.setItem('tip_prikaza',selectedValue);
    }
})
document.getElementById('PrikaziOracle').addEventListener('click',()=>{
        var selectedValue = document.getElementById('OracleSelect').value;
        document.getElementById('paginationOracle').style.display = 'none';
        broj_stranica_tablice_oracle = 1;
        if(selectedValue === "ispisProdaja"){
            showDataOracle(selectedValue,broj_stranica_tablice_oracle,"ispisProdaja");
            sessionStorage.setItem('tip_prikaza',selectedValue);
        }else {
            showDataOracle(selectedValue,broj_stranica_tablice_oracle,"grupirajProdaja");
            sessionStorage.setItem('tip_prikaza',selectedValue);
        }
})

document.getElementById('FilterPoDatumuClickhouse').addEventListener('click',()=>{
    document.getElementById('filterPodatakaClickHouse').style.display= 'block';
})
document.getElementById('filtriranjeClickHouse').addEventListener('click',()=>{
    if(document.getElementById('OdDatumClickHouse').value > document.getElementById('DoDatumaClickHouse').value)
    {
        document.getElementById('WrongDate').style.display = 'block';
        document.getElementById('OdDatumClickHouse').value = '';
        document.getElementById('DoDatumaClickHouse').value = '';
    }else {
        document.getElementById('filterPodatakaClickHouse').style.display = 'none';
    }
})
document.getElementById('FilterPoDatumuOracle').addEventListener('click',()=>{
    document.getElementById('filterPodataka').style.display= 'block';
})
document.getElementById('filtriranje').addEventListener('click',()=>{
    if(document.getElementById('OdDatum').value > document.getElementById('DoDatuma').value)
    {
        document.getElementById('WrongDate').style.display = 'block';
        document.getElementById('OdDatum').value = '';
        document.getElementById('DoDatuma').value = '';
    }else {
        document.getElementById('filterPodataka').style.display = 'none';
    }
})
function showDataKorisnika(){
    const user = sessionStorage.getItem('user');
    if (!user) {
        console.log('Nema korisničkih podataka u sessionStorage');
        return;
    }
    const data = JSON.parse(user);
    const id = data.id;
    const username = data.username;
    fetch('Projekt.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            action: 'korisnik',
            id: id,
            username: username,
        })
    }).then(response => {
        if(!response.ok){
            throw new Error('Greška pri dohvaćanju korisnika');
        } return response.json();
    }).then(data => {
        document.getElementById('korisnikId').textContent = data.ID;
        document.getElementById('korisnikIme').textContent = data.IME;
        document.getElementById('korisnikPrezime').textContent = data.PREZIME;
        document.getElementById('korisnikUsername').textContent = data.USERNAME;
        document.getElementById('tipKorisnika').textContent = data.TIP;
    })
}
document.getElementById('nextButtonClickhouse').addEventListener('click',()=>{
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    broj_stranica_tablice_clickhouse +=1;
    if(sessionStorage.getItem('tip_prikaza') === "ispisProdaja"){
        console.log(broj_stranica_tablice_clickhouse);
        showDataClickhouse(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_clickhouse,"ispisProdaja");
    }else {
        console.log(broj_stranica_tablice_clickhouse);
        showDataClickhouse(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_clickhouse,"grupirajProdaja");
    }
})
document.getElementById('prevButtonClickhouse').addEventListener('click',()=>{
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    if(broj_stranica_tablice_clickhouse !== 1)
    {
        broj_stranica_tablice_clickhouse -=1;
        if(sessionStorage.getItem('tip_prikaza') === "ispisProdaja"){
            showDataClickhouse(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_clickhouse,"ispisProdaja");
        }else {
            showDataClickhouse(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_clickhouse,"grupirajProdaja");
        }
    }
})
document.getElementById("ClickhouseSelect").addEventListener("change", function() {
    document.getElementById('OdDatumClickHouse').value = "";
    document.getElementById('DoDatumaClickHouse').value = "";
})
document.getElementById("OracleSelect").addEventListener("change", function() {
    document.getElementById('OdDatum').value = "";
    document.getElementById('DoDatuma').value = "";

})
document.getElementById('nextButtonOracle').addEventListener('click',()=>{
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    broj_stranica_tablice_oracle +=1;
    if(sessionStorage.getItem('tip_prikaza') === "ispisProdaja"){
        showDataOracle(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_oracle,"ispisProdaja");
    }else {
        showDataOracle(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_oracle,"grupirajProdaja");
    }
})

document.getElementById('prevButtonOracle').addEventListener('click',()=>{
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    if(broj_stranica_tablice_oracle !== 1)
    {
        broj_stranica_tablice_oracle -=1;
        if(document.getElementById('OracleSelect').value === "ispisProdaja"){
            showDataOracle(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_oracle,"ispisProdaja");
        }else {
            showDataOracle(sessionStorage.getItem('tip_prikaza'),broj_stranica_tablice_oracle,"grupirajProdaja");
        }
    }
})
function showDataClickhouse(tip_podatka,broj_stranice,vrst_upita){
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    let url = `ProjektClickHouse.php?action=${vrst_upita}&br_stranice=${broj_stranice}&tip_grupiranja=${tip_podatka}&date1=${document.getElementById('OdDatumClickHouse').value}&date2=${document.getElementById('DoDatumaClickHouse').value}`;
    const startTime = performance.now();
    if(broj_stranice === 1)
    {
        dohvaceni_podaci_clickhouse = 0;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(broj_stranice === 1){
                sessionStorage.setItem('broj_clickhouse',data[0]['Ukupni_broj_podataka']);
            }
            if (data.length === 0) {
                let tbody = document.querySelector('#TablicaClickHouse tbody');
                tbody.innerHTML = '';
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.textContent ='';
                tr.appendChild(td);
                tbody.appendChild(tr);
                document.getElementById('br_podataka_clickhouse').value = 0;
                document.getElementById('Ukupan_broj_podataka_clickhouse').value = 0;
                document.getElementById('Vrijeme_transakcije_clickhouse').value = 0 + "s";
                document.getElementById('spinnerContainer').style.display = 'none';
                document.body.classList.remove('blocked');
                document.getElementById('NoData').style.display = 'block';
            }
            else {
                const endTime = performance.now();
                let seconds = (endTime - startTime) / 1000;
                let formattedSeconds = seconds.toFixed(2);
                document.getElementById('br_podataka_clickhouse').value = data.length;
                document.getElementById('Ukupan_broj_podataka_clickhouse').value = sessionStorage.getItem('broj_clickhouse');
                document.getElementById('Vrijeme_transakcije_clickhouse').value = formattedSeconds + "s";
                document.getElementById('Informacije_o_transakciji_ClickHouse').style.display = 'block';
                document.getElementById('pagination').style.display = 'block';
                let header1 = [];
                if(tip_podatka === "ispisProdaja"){
                    header1 = ['Mjesec', 'Artikl', 'Poslovnica','Kolicina','Neto1','Rbr','Prihod'];
                }
                else if (tip_podatka === "grupirajPoslovniceProdaja")
                {
                    header1 = ['Poslovnica', 'Mjesec', 'Prihod','Razlika u cijeni','Kolicina','Nabavna vrijednost','Broj artikla'];
                }else if(tip_podatka === "grupirajArtikleProdaja")
                {
                    header1 = ['Artikl', 'Mjesec', 'Prihod','Razlika u cijeni','Kolicina','Nabavna vrijednost'];
                }
                kreirajzaglavlje(header1,"Clickhouse");
                let tbody = document.querySelector('#TablicaClickHouse tbody');
                tbody.innerHTML = '';
                data.forEach(row => {
                    let tr = document.createElement('tr');
                    Object.entries(row).forEach(([key, value]) => {
                        if (key === 'Ukupni_broj_podataka') {
                            ukupni_broj_podataka_clickhouse = value;
                            return;
                        }
                        if(key === 'Dohvaceni_broj_podataka')
                        {
                            return;
                        }
                        if(key === 'Ukupni_prihod' || key === 'Kolicina' || key === 'Neto' || key === 'Razlika_cijena' || key === 'Prihod') {
                            value = value.toLocaleString('hr-HR');
                        }
                        let td = document.createElement('td');
                        td.textContent = value;
                        if (typeof value === 'number') {
                            td.style.textAlign = 'right';
                        }
                        else if (value.charAt(2) === '.' && value.charAt(5) === '.') {
                            td.style.textAlign = 'right';
                        }else if (!/[a-zA-Z]/.test(value)) {
                            td.style.textAlign = 'right';
                        }
                        else {
                            td.style.textAlign = 'left';
                        }
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                })
                if(data.length === parseInt(ukupni_broj_podataka_clickhouse))
                {
                    document.getElementById('nextButtonClickhouse').disabled = true;
                }
                else{
                    document.getElementById('nextButtonClickhouse').disabled = false;
                }
                if(broj_stranice === 1)
                {
                    document.getElementById('prevButtonClickhouse').disabled = true;
                }
                else{
                    document.getElementById('prevButtonClickhouse').disabled = false;
                }
                let naslovElement = document.getElementById("naslov-clickhouse");
                switch (tip_podatka) {
                    case "ispisProdaja":
                        naslovElement.innerText = "Dohvat detaljnih podataka iz baze ClickHouse";
                        break;
                    case "grupirajPoslovniceProdaja":
                        naslovElement.innerText = "Grupirano po poslovnicama iz baze ClickHouse";
                        break;
                    case "grupirajArtikleProdaja":
                        naslovElement.innerText = "Grupirano po artiklu iz baze ClickHouse";
                        break;
                    default:
                        naslovElement.innerText = "Izvještaj Clickhouse";
                }
                document.getElementById('spinnerContainer').style.display = 'none';
                document.body.classList.remove('blocked');
                document.getElementById('currentPage').textContent = `Stranica ${broj_stranice}`;
            }
        })
}
function showDataOracle(tip_podatka,broj_stranice,vrst_upita){
    document.getElementById('spinnerContainer').style.display = 'flex';
    document.body.classList.add('blocked');
    let url = `ProjektOracle.php?action=${vrst_upita}&tip_grupiranja=${tip_podatka}&br_stranice=${broj_stranice}&date1=${document.getElementById('OdDatum').value}&date2=${document.getElementById('DoDatuma').value}`;
    const startTime = performance.now();
    if(broj_stranice === 1)
    {
        dohvaceni_podaci_oracle = 0;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(broj_stranice === 1){
                sessionStorage.setItem('broj_oracle',data[data.length -1]['Ukupni_broj_podataka']);
            }
            if (data.length ===  0) {
                let tbody = document.querySelector('#Tablica2 tbody');
                tbody.innerHTML = '';
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.textContent ='';
                tr.appendChild(td);
                tbody.appendChild(tr);
                document.getElementById('br_podataka_clickhouse').value = 0;
                document.getElementById('Ukupan_broj_podataka_oracle').value = 0;
                document.getElementById('Vrijeme_transakcije_clickhouse').value = 0 + "s";
                document.getElementById('spinnerContainer').style.display = 'none';
                document.body.classList.remove('blocked');
                document.getElementById('NoData').style.display = 'block';
            }
            else{
                const endTime = performance.now();
                document.getElementById('spinnerContainer').style.display = 'none';
                document.body.classList.remove('blocked');
                let seconds = (endTime - startTime) / 1000;
                let formattedSeconds = seconds.toFixed(2);
                document.getElementById('br_podataka_Oracle').value = data.length;
                document.getElementById('Vrijeme_transakcije_Oracle').value = formattedSeconds +"s";
                document.getElementById('Ukupan_broj_podataka_oracle').value = sessionStorage.getItem('broj_oracle');
                document.getElementById('Informacije_o_transakciji_Oracle').style.display = 'block';
                document.getElementById('paginationOracle').style.display = 'block';
                let header = [];
                if(tip_podatka === "ispisProdaja"){
                    header = ['Mjesec', 'Artikl', 'Poslovnica','Kolicina','Neto','Rbr','Prihod'];
                }
                else if (tip_podatka === "grupirajPoslovniceProdajaOracle")
                {
                    header = ['Poslovnica', 'Mjesec', 'Prihod','Razlika u cijeni','Kolicina','Nabavna vrijednost','Broj artikla'];
                }else if(tip_podatka === "grupirajArtikleProdajaOracle")
                {
                    header = ['Artikl', 'Mjesec', 'Prihod','Razlika u cijeni','Kolicina','Nabavna vrijednost'];
                }
                kreirajzaglavlje(header,"Oracle");
                let tbody = document.querySelector('#Tablica2 tbody');
                tbody.innerHTML = '';
                data.forEach(row => {
                    let tr = document.createElement('tr');
                    Object.entries(row).forEach(([key, value]) => {
                        if (key === 'Ukupni_broj_podataka') {
                            ukupni_broj_podataka_oracle = value;
                            return;
                        }
                        if(key==='Dohvaceni_broj_podataka'){
                            return;
                        }
                        if(key === 'Ukupni_prihod' || key === 'Kolicina' || key === 'Neto' || key === 'Razlika_cijena' || key === 'Prihod') {
                            value = value.toLocaleString('hr-HR');
                        }
                        let td = document.createElement('td');
                        td.textContent = value;
                        if (typeof value === 'number') {
                            td.style.textAlign = 'right';
                        }
                        else if (value.charAt(2) === '.' && value.charAt(5) === '.') {
                            td.style.textAlign = 'right';
                        }else if (!/[a-zA-Z]/.test(value)) {
                            td.style.textAlign = 'right';
                        }
                        else {
                            td.style.textAlign = 'left';
                        }
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                })
                if(data.length=== parseInt(ukupni_broj_podataka_oracle))
                {
                    document.getElementById('nextButtonOracle').disabled = true;
                }
                else{
                    document.getElementById('nextButtonOracle').disabled = false;
                }
                if(broj_stranice === 1)
                {
                    document.getElementById('prevButtonOracle').disabled = true;
                }
                else{
                    document.getElementById('prevButtonOracle').disabled = false;
                }
                let naslovElement = document.getElementById("naslov-oracle");
                switch (document.getElementById('OracleSelect').value) {
                    case "ispisProdaja":
                        naslovElement.innerText = "Detaljan dohvat podataka iz baze Oracle";
                        break;
                    case "grupirajPoslovniceProdajaOracle":
                        naslovElement.innerText = "Grupirano po poslovnicama iz baze Oracle";
                        break;
                    case "grupirajArtikleProdajaOracle":
                        naslovElement.innerText = "Grupirano po artiklu iz baze Oracle";
                        break;
                    default:
                        naslovElement.innerText = "Izvještaj Clickhouse";
                }
                document.getElementById('spinnerContainer').style.display = 'none';
                document.body.classList.remove('blocked');
                document.getElementById('currentPageOracle').textContent = `Stranica ${broj_stranice}`;

            }
        })
}
document.getElementById('detaljiKorisnika').addEventListener('click',()=>{
    showDataKorisnika()
})
document.getElementById('Clickhouse-tablica').addEventListener('click',()=>{
    document.getElementById('ClickhouseSelect').selectedIndex = 0;
    document.getElementById('OdDatumClickHouse').value = "";
    document.getElementById('DoDatumaClickHouse').value = "";
    broj_stranica_tablice_clickhouse = 1;
    sessionStorage.setItem('tip_prikaza','ispisProdaja');
    showDataClickhouse(document.getElementById('ClickhouseSelect').value,1,"ispisProdaja");
})

document.getElementById('Oracle-tablica').addEventListener('click',()=>{
    document.getElementById('OracleSelect').selectedIndex = 0;
    document.getElementById('OdDatum').value = "";
    document.getElementById('DoDatuma').value = "";
    sessionStorage.setItem('tip_prikaza','ispisProdaja');
    showDataOracle(document.getElementById('OracleSelect').value,1,"ispisProdaja")
})
function kreirajzaglavlje(zaglavlje,tablica) {
    let thead = "";
    if(tablica === "Oracle") {
        thead = document.querySelector('#Tablica2 thead');
    }
    else{
         thead = document.querySelector('#TablicaClickHouse thead');
    }
    if (thead) {
        thead.innerHTML = '';
    } else {
        thead = document.createElement('thead');
        if (tablica === "Oracle") {
             document.querySelector('#Tablica2').prepend(thead);
        }
        else{
            document.querySelector('#TablicaClickHouse').prepend(thead);
        }
    }
    let headerRow = document.createElement('tr');
    zaglavlje.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
}
