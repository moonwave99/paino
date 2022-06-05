import test from "ava";
import init from "./init";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import browserEnv from "browser-env";

test.beforeEach(() => {
    browserEnv();
});

test.afterEach(() => {
    browserEnv();
    document.body.innerHTML = "";
});

test.serial("init", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino></div>
        <div data-paino
            data-octaves="1"
            data-with-final-C="false"></div>
    </main>`;

    init();

    const pianos = document.querySelectorAll(".paino");

    t.is(pianos.length, 2);
    t.is(pianos[1].querySelectorAll(".key").length, 12);
    t.is(
        pianos[1].querySelector<HTMLElement>(".key:last-child").dataset.note,
        "B"
    );
});

test.serial("init - with notes", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino data-notes="Fb Gb Abb Cb" data-octaves="3"></div>
    </main>`;
    init();

    const wrapper = document.querySelector(".paino");

    t.deepEqual(
        [...wrapper.querySelectorAll(".key-on")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "4",
                color: "white",
                midi: '64',
                note: "E",
                noteWithOctave: "E4",
                octave: "4",
            },
            {
                chroma: "6",
                color: "black",
                midi: '66',
                note: "F#",
                noteWithOctave: "F#4",
                octave: "4",
            },
            {
                chroma: "7",
                color: "white",
                midi: '67',
                note: "G",
                noteWithOctave: "G4",
                octave: "4",
            },
            {
                chroma: "11",
                color: "white",
                midi: '71',
                note: "B",
                noteWithOctave: "B4",
                octave: "4",
            },
        ]
    );
});

test.serial("init - with enrharmonic notes", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino data-notes="C3 G3 Eb4 Bb4" data-octaves="3"></div>
    </main>`;
    init();

    const wrapper = document.querySelector(".paino");

    t.deepEqual(
        [...wrapper.querySelectorAll(".key-on")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                midi: "48",
                note: "C",
                noteWithOctave: "C3",
                octave: "3",
            },
            {
                chroma: "7",
                color: "white",
                midi: "55",
                note: "G",
                noteWithOctave: "G3",
                octave: "3",
            },
            {
                chroma: "3",
                color: "black",
                midi: "63",
                note: "D#",
                noteWithOctave: "D#4",
                octave: "4",
            },
            {
                chroma: "10",
                color: "black",
                midi: "70",
                note: "A#",
                noteWithOctave: "A#4",
                octave: "4",
            },
        ]
    );
});

test.serial("init - with hands", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino data-notes-hands="C3 G3, Eb4 Bb4" data-octaves="3"></div>
    </main>`;
    init();

    const wrapper = document.querySelector(".paino");
    t.deepEqual(
        [...wrapper.querySelectorAll(".right")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "3",
                color: "black",
                midi: "63",
                note: "D#",
                noteWithOctave: "D#4",
                octave: "4",
            },
            {
                chroma: "10",
                color: "black",
                midi: "70",
                note: "A#",
                noteWithOctave: "A#4",
                octave: "4",
            },
        ]
    );

    t.deepEqual(
        [...wrapper.querySelectorAll(".left")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                midi: "48",
                note: "C",
                noteWithOctave: "C3",
                octave: "3",
            },
            {
                chroma: "7",
                color: "white",
                midi: "55",
                note: "G",
                noteWithOctave: "G3",
                octave: "3",
            },
        ]
    );
});

test.serial("init - with SATB", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino data-notes-satb="C3, G3, Eb4, Bb4" data-octaves="3"></div>
    </main>`;
    init();

    const wrapper = document.querySelector(".paino");

    t.deepEqual(
        ["soprano", "alto", "tenor", "bass"].map((x) => ({
            ...(wrapper.querySelector(`.${x}`) as HTMLElement).dataset,
        })),
        [
            {
                chroma: "10",
                color: "black",
                midi: "70",
                note: "A#",
                noteWithOctave: "A#4",
                octave: "4",
            },
            {
                chroma: "3",
                color: "black",
                midi: "63",
                note: "D#",
                noteWithOctave: "D#4",
                octave: "4",
            },
            {
                chroma: "7",
                color: "white",
                midi: "55",
                note: "G",
                noteWithOctave: "G3",
                octave: "3",
            },
            {
                chroma: "0",
                color: "white",
                midi: "48",
                note: "C",
                noteWithOctave: "C3",
                octave: "3",
            },
        ]
    );
});

test.serial("init - with custom note", (t) => {
    document.body.innerHTML = `
    <main>
        <div data-paino data-notes-custom="C3 G3"></div>
    </main>`;
    init();

    const wrapper = document.querySelector(".paino");

    t.deepEqual(
        [...wrapper.querySelectorAll(".custom")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                midi: "48",
                note: "C",
                noteWithOctave: "C3",
                octave: "3",
            },
            {
                chroma: "7",
                color: "white",
                midi: "55",
                note: "G",
                noteWithOctave: "G3",
                octave: "3",
            },
        ]
    );
});
