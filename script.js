//Javascript for Esküvői album kvíz website

const mindenOldal = document.querySelectorAll('.oldal');
const inditGomb = document.getElementById('indit-gomb');
const mindenKepGomb = document.querySelectorAll('.kep-gomb');
const kuldesGomb = document.getElementById('kuldes-gomb');
const kilepesGomb = document.querySelector('.kilepes');
let aktualisOldal = 0;

function mutasdOldalt() {
    mindenOldal.forEach((oldal, index) => {
        if (index === aktualisOldal) {
            oldal.hidden = false
        } else {
            oldal.hidden = true
        }
    });
};

inditGomb.addEventListener('click', () => {
    aktualisOldal++;
    mutasdOldalt();
});

mindenKepGomb.forEach((gomb) => {
    gomb.addEventListener('click', () => {
        aktualisOldal++;
        mutasdOldalt();
    });
});

kuldesGomb.addEventListener('click', () => {
    aktualisOldal++;
    mutasdOldalt();
});

kilepesGomb.addEventListener('click', () => {
    aktualisOldal = 0;
    mutasdOldalt();
});

mutasdOldalt();