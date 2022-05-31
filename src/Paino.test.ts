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
                enharmonics: "B#",
                note: "C",
                noteWithOctave: "C4",
                octave: "4",
            },
            {
                chroma: "4",
                color: "white",
                enharmonics: "Fb",
                note: "E",
                noteWithOctave: "E4",
                octave: "4",
            },
            {
                chroma: "7",
                color: "white",
                enharmonics: "",
                note: "G",
                noteWithOctave: "G4",
                octave: "4",
            },
        ]
    );
});

test.serial("Paino - setNotes - enharmonics", (t) => {
    const piano = new Paino();

    piano.render().setNotes(["C4", "Eb4", "G4"]);

    const wrapper = document.querySelector("#paino");

    t.deepEqual(
        [...wrapper.querySelectorAll(".key-on")].map((el: HTMLElement) => ({
            ...el.dataset,
        })),
        [
            {
                chroma: "0",
                color: "white",
                enharmonics: "B#",
                note: "C",
                noteWithOctave: "C4",
                octave: "4",
            },
            {
                chroma: "3",
                color: "black",
                enharmonics: "Eb",
                note: "D#",
                noteWithOctave: "D#4",
                octave: "4",
            },
            {
                chroma: "7",
                color: "white",
                enharmonics: "",
                note: "G",
                noteWithOctave: "G4",
                octave: "4",
            },
        ]
    );
});

test.serial("Paino - clearNotes", (t) => {
    const piano = new Paino();

    piano.render().setNotes(["C4", "E4", "G4"]);
    piano.clearNotes();

    const wrapper = document.querySelector("#paino");

    t.is(wrapper.querySelectorAll(".key-on").length, 0);
});
