window.onload =function() {
    document.getElementById('iznimka').style.display = 'none';
    document.getElementById('username').value = '';
};
var current = null;
document.querySelector('#username').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: 0,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
});
document.querySelector('#password').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: -336,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
});
document.querySelector('#submit').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: -730,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '530 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
});
document.getElementById('submit').addEventListener('click',function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const iznimkaDiv = document.getElementById('iznimka');
    if (!username && !password) {
        iznimkaDiv.textContent = 'Unesite podatke.';
        iznimkaDiv.classList.add('error');
        iznimkaDiv.style.display = 'block';

    }else if (!username && password){
        iznimkaDiv.textContent = 'Unesite username.';
        iznimkaDiv.classList.add('error');
        iznimkaDiv.style.display = 'block';

    }else if(username && !password)
    {
        iznimkaDiv.textContent = 'Unesite password.';
        iznimkaDiv.classList.add('error');
        iznimkaDiv.style.display = 'block';

    }else {
        document.getElementById('iznimka').style.display = 'none';
        let url = `Projekt.php?action=${'login'}&username=${username}&password=${btoa(password)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    const user = {id:data.id, username: username,isLogged: true,tip:data.tip};
                    sessionStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'http://localhost:63342/Php_proba/Home.html';
                } else {

                    iznimkaDiv.textContent = 'Nepostojeći korisnik.';
                    iznimkaDiv.classList.add('error');
                    iznimkaDiv.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Greška:', error);
            });
    }
})