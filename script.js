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
    osszeszedett: 'Szeretnénk, ha magabiztosan és nyugodtan állnátok a kamera elé. Ha kell, adunk egy-egy ötletet, de a lényeg, hogy mindvégig önmagatok legyetek.',
    detail: 'A legszemélyesebb felvételek a részletekből állnak össze: kézzel készített dekorációk, kedves tárgyak és személyes apróságok.',
    pillanat: 'A legőszintébb felvételek azokból a pillanatokból születnek, amikre ti sem számítotok: egy lopott csók, egy összenevetés, egy könnycsepp.',
    paros: 'A nap tele lesz emberekkel, de gondoskodunk róla, hogy a forgatagban is ti ketten legyetek a történet középpontjában.',
    csoport: 'Szeretteitek körében tölteni ezt a napot csodálatos érzés. A baráti nevetések és a családi ölelések is méltó helyet kapnak a nagy napotok történetében.',
    keszulodes: 'A nagy nap reggele: a készülődés izgalma, a remegő kezek, az utolsó simítások; mi már ekkor veletek vagyunk, hogy semmi ne maradjon ki.',
    buli: 'Az estét is megörökítjük: a nyitótáncot, a közös éneklést és a parketten töltött perceket.'
};
const emailSorrend = [
    ['erzelmes', 'osszeszedett'],
    ['detail', 'pillanat'],
    ['paros', 'csoport'],
    ['keszulodes', 'buli']
];
// "HaKesobb": esküvő több mint 4 hónap múlva, "HaKozeli": 4 hónapon belüli esküvő
const szolgaltatasAdatok = {
    'foto': {
        nev: 'fotós',
        arKedvezmenyes: '250.000 Ft',
        arTeljes: '300.000 Ft',
        ajandekCimHaKesobb: '📸Ajándék jegyes fotózás📸',
        ajandekCimHaKozeli: '📸Ajándék jegyes fotózás📸',
        ajandekHaKesobb: 'Egész napos esküvői fotózási csomag foglalása esetén egy romantikus, meghitt jegyesfotózást is ajándékba kaptok. Így még időben rákerülhetnek a képek a meghívóitokra!',
        ajandekHaKozeli: 'Egész napos esküvői fotózási csomag foglalása esetén egy romantikus, meghitt jegyesfotózást is ajándékba kaptok, hogy már az esküvőtök előtt közös, gyönyörű emlékekkel gazdagodjatok.',
        kiegeszites: 'Mozgóképen is megőrizzük a nagy napotokat: videós szolgáltatásunkról kérésre szívesen mesélünk.'
    },
    'video': {
        nev: 'videós',
        arKedvezmenyes: '250.000 Ft',
        arTeljes: '300.000 Ft',
        ajandekCimHaKesobb: '🎥Ajándék Save the date videó🎥',
        ajandekCimHaKozeli: '🎥Ajándék jegyes kisfilm🎥',
        ajandekHaKesobb: 'Egész napos esküvői videós csomag foglalása esetén egy romantikus Save the date videót is ajándékba kaptok. Így még időben megoszthatjátok vendégeitekkel, és már jó előre ráhangolhatjátok őket a nagy napra!',
        ajandekHaKozeli: 'Egész napos esküvői videós csomag foglalása esetén egy rövid, romantikus jegyes kisfilmet is ajándékba kaptok, amelyben megmutathatjátok, mennyire várjátok már a nagy napot.',
        kiegeszites: 'Fotókon is megörökítjük a nagy napotokat: fotós szolgáltatásunkról kérésre szívesen mesélünk.'
    },
    'foto-video': {
        nev: 'fotós és videós',
        arKedvezmenyes: '500.000 Ft',
        arTeljes: '600.000 Ft',
        ajandekCimHaKesobb: '📸Ajándék jegyes fotózás vagy Save the date videó🎥',
        ajandekCimHaKozeli: '📸Ajándék jegyes fotózás vagy jegyes kisfilm🎥',
        ajandekHaKesobb: 'Egész napos esküvői fotós és videós csomag foglalása esetén ajándékba kaptok egy romantikus jegyesfotózást vagy egy Save the date videót, rátok bízzuk, melyiket választjátok. Így még időben rákerülhetnek a képek a meghívóitokra, vagy megoszthatjátok a videót vendégeitekkel!',
        ajandekHaKozeli: 'Egész napos esküvői fotós és videós csomag foglalása esetén ajándékba kaptok egy romantikus jegyesfotózást vagy egy rövid jegyes kisfilmet, rátok bízzuk, melyiket választjátok, hogy már az esküvőtök előtt közös, gyönyörű emlékekkel gazdagodjatok.',
        kiegeszites: ''
    }
};
let visszaLepesIdozito;
let albumMegjelenes = 0;
const progressBar = document.getElementById('progress-bar');
const progressSzegmensek = document.querySelectorAll('#progress-bar span');
const INAKTIV_MS = 90000; // teszthez 5000
let inaktivitasIdozito;
const KIALLITAS = 'Őszi Menyegző Kiállítás Szeged'; // minden kiállítás előtt át kell írni
const NAPLO_URL = 'https://script.google.com/macros/s/AKfycbwxuFzNzUa4kQB4C0YLD1FPShDVAyzyT2OGALtTYPQ06bIo3sF7PyuyXuom0UAcS2tKfw/exec'; // a Google Apps Script webapp URL-je

function naploz(sor) {
    if (!NAPLO_URL) return;
    fetch(NAPLO_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(sor)
    }).catch(() => {});
}


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

function beallitEveket() {
    const aktEv = new Date().getFullYear();
    document.querySelectorAll('input[name="ev"]').forEach((r, i) => {
        r.value = aktEv + i;
        document.querySelector(`label[for="${r.id}"]`).textContent = aktEv + i;
    });
}

function frissitHonapokat() {
    const most = new Date();
    const aktEv = most.getFullYear();
    const aktHonap = most.getMonth() + 1;
    const ev = document.querySelector('input[name="ev"]:checked');

    document.querySelectorAll('input[name="honap"]').forEach((r) => {
        r.disabled = ev !== null && Number(ev.value) === aktEv && Number(r.value) < aktHonap;
        if (r.disabled) r.checked = false;
    });
}

function ellenorizUrlapot() {
    frissitHonapokat();
    const ev = document.querySelector('input[name="ev"]:checked');
    const honap = document.querySelector('input[name="honap"]:checked');
    const szolgaltatas = document.querySelector('input[name="szolgaltatas"]:checked');
    const emailRendben = emailMezo.value.trim() !== '' && emailMezo.checkValidity();

    kuldesGomb.disabled = !(emailRendben && ev && honap && szolgaltatas && hozzajarulas.checked);
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
    const most = new Date();
    const kesobb = Number(ev) * 12 + Number(honapSzam) > most.getFullYear() * 12 + most.getMonth() + 1 + 4;
    const szolgaltatas = document.querySelector('input[name="szolgaltatas"]:checked').value;
    const adat = szolgaltatasAdatok[szolgaltatas];

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
        blokk_4: blokkok[3],
        szolgaltatas: adat.nev,
        ar_kedvezmenyes: adat.arKedvezmenyes,
        ar_teljes: adat.arTeljes,
        ajandek_cim: kesobb ? adat.ajandekCimHaKesobb : adat.ajandekCimHaKozeli,
        ajandek_szoveg: kesobb ? adat.ajandekHaKesobb : adat.ajandekHaKozeli,
        kiegeszites: adat.kiegeszites
    }).then(
        () => {
            naploz({
                kiallitas: KIALLITAS,
                ev: ev,
                honap: honapSzam,
                szolgaltatas: szolgaltatas,
                korok: valaszok.map((v) => v.tag)
            });
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

beallitEveket();
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