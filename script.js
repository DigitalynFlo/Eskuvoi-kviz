//Javascript for Esküvői album kvíz website

const mindenOldal = document.querySelectorAll('.oldal');
const inditGomb = document.getElementById('indit-gomb');
const mindenKepGomb = document.querySelectorAll('.kep-gomb');
const kuldesGomb = document.getElementById('kuldes-gomb');
const kilepesGomb = document.querySelector('.kilepes');
let aktualisOldal = 0;
const korok = [
        {
        parok: [
            {
                a: { kep: 'https://picsum.photos/seed/detail1/600/400', tag: 'detail' },
                b: { kep: 'https://picsum.photos/seed/pillanat1/600/400', tag: 'pillanat' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/detail2/600/400', tag: 'detail' },
                b: { kep: 'https://picsum.photos/seed/pillanat2/600/400', tag: 'pillanat' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/detail3/600/400', tag: 'detail' },
                b: { kep: 'https://picsum.photos/seed/pillanat3/600/400', tag: 'pillanat' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/detail4/600/400', tag: 'detail' },
                b: { kep: 'https://picsum.photos/seed/pillanat4/600/400', tag: 'pillanat' }
            }]
    },
    {
        parok: [
            {
                a: { kep: 'https://picsum.photos/seed/paros1/600/400', tag: 'paros' },
                b: { kep: 'https://picsum.photos/seed/csoport1/600/400', tag: 'csoport' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/paros2/600/400', tag: 'paros' },
                b: { kep: 'https://picsum.photos/seed/csoport2/600/400', tag: 'csoport' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/paros3/600/400', tag: 'paros' },
                b: { kep: 'https://picsum.photos/seed/csoport3/600/400', tag: 'csoport' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/paros4/600/400', tag: 'paros' },
                b: { kep: 'https://picsum.photos/seed/csoport4/600/400', tag: 'csoport' }
            }]
    },
            {
        parok: [
            {
                a: { kep: 'https://picsum.photos/seed/keszulodes1/600/400', tag: 'keszulodes' },
                b: { kep: 'https://picsum.photos/seed/buli1/600/400', tag: 'buli' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/keszulodes2/600/400', tag: 'keszulodes' },
                b: { kep: 'https://picsum.photos/seed/buli2/600/400', tag: 'buli' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/keszulodes3/600/400', tag: 'keszulodes' },
                b: { kep: 'https://picsum.photos/seed/buli3/600/400', tag: 'buli' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/keszulodes4/600/400', tag: 'keszulodes' },
                b: { kep: 'https://picsum.photos/seed/buli4/600/400', tag: 'buli' }
            }]
    },
            {
        parok: [
            {
                a: { kep: 'https://picsum.photos/seed/erzelmes1/600/400', tag: 'erzelmes' },
                b: { kep: 'https://picsum.photos/seed/osszeszedett1/600/400', tag: 'osszeszedett' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/erzelmes2/600/400', tag: 'erzelmes' },
                b: { kep: 'https://picsum.photos/seed/osszeszedett2/600/400', tag: 'osszeszedett' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/erzelmes3/600/400', tag: 'erzelmes' },
                b: { kep: 'https://picsum.photos/seed/osszeszedett3/600/400', tag: 'osszeszedett' }
            },
            {
                a: { kep: 'https://picsum.photos/seed/erzelmes4/600/400', tag: 'erzelmes' },
                b: { kep: 'https://picsum.photos/seed/osszeszedett4/600/400', tag: 'osszeszedett' }
            }
        ]
    }];

const valaszok = [];
let zarolva = false;
let varakozas;
const emailMezo = document.getElementById('email');
const hozzajarulas = document.getElementById('hozzajarulas');
const emailOldal = document.getElementById('oldal_5');
const emailHiba = document.getElementById('email-hiba');

function mutasdOldalt() {
    mindenOldal.forEach((oldal, index) => {
        if (index === aktualisOldal) {
            oldal.hidden = false
        } else {
            oldal.hidden = true
        }
    });
};

function betoltKor(korIndex) {
    const oldal = mindenOldal[korIndex + 1]; // az oldal_0 az intró, ezért +1
    const gombok = oldal.querySelectorAll('.kep-gomb');
    const parok = korok[korIndex].parok;
    const par = parok[Math.floor(Math.random() * parok.length)];
    const sorrend = Math.random() < 0.5 ? [par.a, par.b] : [par.b, par.a];

    sorrend.forEach((opcio, i) => {
        gombok[i].querySelector('img').src = opcio.kep;
        gombok[i].dataset.tag = opcio.tag;
    });
}

function ujJatek() {
    valaszok.length = 0;
    zarolva = false;
    clearTimeout(varakozas);
    mindenKepGomb.forEach((gomb) => gomb.classList.remove('kivalasztva'));
    korok.forEach((_, i) => betoltKor(i));

    document.querySelectorAll('input[type="radio"]').forEach((r) => { r.checked = false; });
    document.getElementById('email').value = '';
    document.getElementById('hozzajarulas').checked = false;
    emailHiba.hidden = true;

    ellenorizUrlapot();
}

function ellenorizUrlapot() {
    const ev = document.querySelector('input[name="ev"]:checked');
    const honap = document.querySelector('input[name="honap"]:checked');
    const emailRendben = emailMezo.value.trim() !== '' && emailMezo.checkValidity();

    kuldesGomb.disabled = !(emailRendben && ev && honap && hozzajarulas.checked);
}

function betoltEredmeny() {
    const kepek = document.querySelectorAll('.album-racs img');
    valaszok.forEach((valasz, i) => {
        kepek[i].src = valasz.kep;
    });
}

inditGomb.addEventListener('click', () => {
    aktualisOldal++;
    mutasdOldalt();
});

mindenKepGomb.forEach((gomb) => {
    gomb.addEventListener('click', () => {
        if (zarolva) return;
        zarolva = true;
        gomb.classList.add('kivalasztva');
        valaszok.push({ tag: gomb.dataset.tag, kep: gomb.querySelector('img').src });

        varakozas = setTimeout(() => {
            gomb.classList.remove('kivalasztva');
            aktualisOldal++;
            mutasdOldalt();
            zarolva = false;
        }, 500);
    });
});

emailOldal.addEventListener('input', ellenorizUrlapot);

emailMezo.addEventListener('blur', () => {
    const hibas = emailMezo.value.trim() !== '' && !emailMezo.checkValidity();
    emailHiba.hidden = !hibas;
});

emailMezo.addEventListener('input', () => {
    if (emailMezo.checkValidity()) {
        emailHiba.hidden = true;
    }
});

kuldesGomb.addEventListener('click', () => {
    betoltEredmeny();
    aktualisOldal++;
    mutasdOldalt();
});

kilepesGomb.addEventListener('click', () => {
    aktualisOldal = 0;
    mutasdOldalt();
    ujJatek()
});

ujJatek();
mutasdOldalt();

if (location.search.includes('debug')) {
    const dbg = document.createElement('div');
    dbg.style.cssText = 'position:fixed;bottom:4px;right:4px;background:#000;color:#fff;padding:4px 8px;font-size:12px;z-index:9999';
    document.body.appendChild(dbg);

    const frissitDbg = () => {
        dbg.textContent = `látható: ${window.innerWidth} × ${window.innerHeight} | keret: ${document.getElementById('keret').offsetHeight}`;
    };
    window.addEventListener('resize', frissitDbg);
    frissitDbg();
}

if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'PL5zoaQGQuYXigoQK'});
}