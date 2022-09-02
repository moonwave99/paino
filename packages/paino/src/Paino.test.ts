import test from "ava";
import Paino from "./Paino";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import browserEnv from "browser-env";

test.beforeEach(() => {
    browserEnv();
    document.body.innerHTML = '<div id="paino"></div>';
});
test.afterEach(() => {
    browserEnv();
    document.body.innerHTML = "";
});

test.serial("Paino - default options", (t) => {
    const piano = new Paino();
    piano.render();

    const wrapper = document.querySelector("#paino");

    t.truthy(wrapper);

    t.is(wrapper.querySelectorAll(".key.color-white").length, 7 + 7 + 1);
    t.is(wrapper.querySelectorAll(".key.color-black").length, 5 + 5);
});

test.serial("Paino - with options", (t) => {
    const piano = new Paino({
        octaves: 3,
        withFinalC: false,
    });
    piano.render();

    const wrapper = document.querySelector("#paino");

    t.truthy(wrapper);
    t.is(wrapper.querySelectorAll(".key.color-white").length, 7 + 7 + 7);
    t.is(wrapper.querySelectorAll(".key.color-black").length, 5 + 5 + 5);
});

test.serial("Paino - setNotes", (t) => {
    const piano = new Paino();

    piano.render().setNotes(["C4", "E4", "G4"]);

    const wrapper = document.querySelector("#paino");
    t.deepEqual(
        [...wrapper.querySelectorAll(".key-on")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                midi: '60',
                note: "C",
                noteWithOctave: "C4",
                octave: "4",
            },
            {
                chroma: "4",
                color: "white",
                midi: '64',
                note: "E",
                noteWithOctave: "E4",
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
        ]
    );
});

test.serial("Paino - setNotes - enharmonics", (t) => {
    const piano = new Paino();

    piano.render().setNotes(["Fb", "Gb", "Abb", "Cb"]);

    const wrapper = document.querySelector("#paino");

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

test.serial("Paino - setNotes - without octave", (t) => {
    const piano = new Paino();

    piano.render().setNotes(["C", "E", "G"]);

    const wrapper = document.querySelector("#paino");

    t.deepEqual(
        [...wrapper.querySelectorAll(".key-on")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                midi: '60',
                note: "C",
                noteWithOctave: "C4",
                octave: "4",
            },
            {
                chroma: "4",
                color: "white",
                midi: '64',
                note: "E",
                noteWithOctave: "E4",
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
        ]
    );
});

test.serial("Paino - setNotes - hands", (t) => {
    const piano = new Paino();

    piano.render().setNotes({
        right: ["Eb4", "Bb4"],
        left: ["C3", "G3"],
    });

    const wrapper = document.querySelector("#paino");

    t.is(wrapper.querySelectorAll(".right").length, 2);
    t.is(wrapper.querySelectorAll(".left").length, 2);

    t.deepEqual(
        [...wrapper.querySelectorAll(".right")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "3",
                color: "black",
                midi: '63',
                note: "D#",
                noteWithOctave: "D#4",
                octave: "4",
            },
            {
                chroma: "10",
                color: "black",
                midi: '70',
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
                midi: '48',
                note: "C",
                noteWithOctave: "C3",
                octave: "3",
            },
            {
                chroma: "7",
                color: "white",
                midi: '55',
                note: "G",
                noteWithOctave: "G3",
                octave: "3",
            },
        ]
    );
});

// test.serial("Paino - clearNotes", (t) => {
//     const piano = new Paino();

//     piano.render().setNotes(["C4", "E4", "G4"]);
//     piano.clearNotes();

//     const wrapper = document.querySelector("#paino");

//     t.is(wrapper.querySelectorAll(".key-on").length, 0);
// });
