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
    korok.forEach((_, i) => betoltKor(i));
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
        valaszok.push({ tag: gomb.dataset.tag, kep: gomb.querySelector('img').src });
        aktualisOldal++;
        mutasdOldalt();
    });
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