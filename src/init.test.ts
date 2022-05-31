import test from "ava";
import init from "./init";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import browserEnv from "browser-env";

test.beforeEach(() => {
    browserEnv();
    document.body.innerHTML = `
    <main>
        <div data-paino></div>
        <div data-paino
            data-octaves="1"
            data-with-final-C="false"></div>
    </main>`;
});
test.afterEach(() => {
    browserEnv();
    document.body.innerHTML = "";
});

test.serial("init", (t) => {
    init();

    const pianos = document.querySelectorAll(".paino");

    t.is(pianos.length, 2);
    t.is(pianos[1].querySelectorAll(".key").length, 12);
    t.is(
        pianos[1].querySelector<HTMLElement>(".key:last-child").dataset.note,
        "B"
    );
});
