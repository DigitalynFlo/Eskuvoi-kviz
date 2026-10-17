//Javascript for Esküvői album kvíz website

const mindenOldal = document.querySelectorAll('.oldal');
const inditGomb = document.getElementById('indit-gomb');
const mindenKepGomb = document.querySelectorAll('.kep-gomb');
const kuldesGomb = document.getElementById('kuldes-gomb');
const kilepesGomb = document.querySelector('.kilepes');
let aktualisOldal = 0;
const valaszok = [];
let zarolva = false;
let varakozas;
const emailMezo = document.getElementById('email');
const hozzajarulas = document.getElementById('hozzajarulas');
const emailOldal = document.getElementById('oldal_5');
const emailHiba = document.getElementById('email-hiba');
const EMAILJS_SERVICE = 'service_wgj7x2v';
const EMAILJS_TEMPLATE = 'template_kxauvbv';
let kuldesFolyamatban = false;
const korok = [
    kor('detail', 'pillanat', 4),
    kor('paros', 'csoport', 4),
    kor('keszulodes', 'buli', 4),
    kor('erzelmes', 'osszeszedett', 4)
];
const szovegek = {
    erzelmes: 'Szeretnénk megmutatni az érzelmeket: az első pillantást, a szerelmesen csillogó szemeket. Titeket, életetek egyik legboldogabb napján.',
    osszeszedett: 'Szeretnénk, ha magabiztosan és nyugodtan állnátok a kamera elé. Ha kell, adunk egy-egy ötletet, de a lényeg, hogy a képeken ti látszódjatok.',
    detail: 'A legszemélyesebb képek a részletekből állnak össze: kézzel készített dekorációk, kedves tárgyak és személyes apróságok.',
    pillanat: 'A legőszintébb képek azokból a pillanatokból születnek, amikre ti sem számítotok: egy lopott csók, egy összenevetés, egy könnycsepp.',
    paros: 'A nap tele lesz emberekkel, de gondoskodunk róla, hogy a forgatagban is ti ketten legyetek a történet középpontjában.',
    csoport: 'Szeretteitek körében tölteni ezt a napot csodálatos érzés. A baráti nevetések és a családi ölelések is megkapják a helyüket az albumotokban.',
    keszulodes: 'A nagy nap reggele: a készülődés izgalma, a remegő kezek, az utolsó simítások; mi már ekkor veletek vagyunk, hogy semmi ne maradjon ki.',
    buli: 'Az estét is megörökítjük: a nyitótáncot, a közös éneklést és a parketten töltött perceket.'
};
const emailSorrend = [
    ['erzelmes', 'osszeszedett'],
    ['detail', 'pillanat'],
    ['paros', 'csoport'],
    ['keszulodes', 'buli']
];
let visszaLepesIdozito;
let albumMegjelenes = 0;
const progressBar = document.getElementById('progress-bar');
const progressSzegmensek = document.querySelectorAll('#progress-bar span');
const INAKTIV_MS = 90000; // teszthez 5000
let inaktivitasIdozito;


function mutasdOldalt() {
    mindenOldal.forEach((oldal, index) => {
        if (index === aktualisOldal) {
            oldal.hidden = false
        } else {
            oldal.hidden = true
        }
    });
    progressSzegmensek.forEach((szegmens, index) => {
        szegmens.classList.toggle('kesz', index <= aktualisOldal);
    });
    progressBar.classList.toggle('rejtett', aktualisOldal === mindenOldal.length - 1);
    inaktivitasUjraindit();
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

function kor(tagA, tagB, darab) {
    const parok = [];
    for (let i = 1; i <= darab; i++) {
        parok.push({
            a: { kep: `img/${tagA}-${i}.jpg`, tag: tagA },
            b: { kep: `img/${tagB}-${i}.jpg`, tag: tagB }
        });
    }
    return { parok };
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
    kuldesGomb.textContent = 'Küldés';
    kuldesFolyamatban = false;
    clearTimeout(visszaLepesIdozito);
    document.getElementById('kuldve-ide').textContent = '';

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

function visszaAzIntrohoz() {
    aktualisOldal = 0;
    mutasdOldalt();
    ujJatek();
}

function inaktivitasUjraindit() {
    clearTimeout(inaktivitasIdozito);
    if (aktualisOldal === 0) return;
    inaktivitasIdozito = setTimeout(() => {
        if (kuldesFolyamatban || document.hidden) { inaktivitasUjraindit(); return; }
        visszaAzIntrohoz();
    }, INAKTIV_MS);
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
    if (kuldesFolyamatban) return;

    if (typeof emailjs === 'undefined') {
        kuldesGomb.textContent = 'Hiba – próbáld újra';
        return;
    }

    kuldesFolyamatban = true;
    kuldesGomb.disabled = true;
    kuldesGomb.textContent = 'Küldés...';

    const email = emailMezo.value.trim();
    const ev = document.querySelector('input[name="ev"]:checked').value;
    const honapSzam = document.querySelector('input[name="honap"]:checked').value;
    const honapNev = document.querySelector('input[name="honap"]:checked + label')
        .textContent.toLowerCase();
    const kesobb = Number(ev) * 100 + Number(honapSzam) >= 202703;

    const blokkok = emailSorrend.map((par) => {
        const valasz = valaszok.find((v) => par.includes(v.tag));
        return valasz ? szovegek[valasz.tag] : '';
    });

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        to_email: email,
        ev: ev,
        honap: honapNev,
        kesobb: kesobb,
        blokk_1: blokkok[0],
        blokk_2: blokkok[1],
        blokk_3: blokkok[2],
        blokk_4: blokkok[3]
    }).then(
        () => {
            document.getElementById('kuldve-ide').textContent = 'Ide küldtük a nektek szóló ajánlatot: ' + email;
            betoltEredmeny();
            aktualisOldal++;
            albumMegjelenes = Date.now();
            visszaLepesIdozito = setTimeout(visszaAzIntrohoz, 15000);
            mutasdOldalt();
            kuldesFolyamatban = false;
        },
        () => {
            kuldesGomb.textContent = 'Hiba – próbáld újra';
            kuldesGomb.disabled = false;
            kuldesFolyamatban = false;
        }
    );
});

kilepesGomb.addEventListener('click', visszaAzIntrohoz);

document.querySelector('.album-racs').addEventListener('click', () => {
    if (Date.now() - albumMegjelenes < 1500) return;
    visszaAzIntrohoz();
});

['pointerdown', 'input'].forEach((e) => document.addEventListener(e, inaktivitasUjraindit));

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
    emailjs.init({ publicKey: 'PL5zoaQGQuYXigoQK' });
}