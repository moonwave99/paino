import Paino, { Options, DEFAULT_PAINO_OPTIONS } from "./Paino";

type InitOptions = {
    elements: string | NodeList;
};

function parseOptions(el: HTMLElement): Options {
    const options = {} as Record<string, string | number | boolean>;

    Object.entries(DEFAULT_PAINO_OPTIONS).forEach(([key, sample]) => {
        const value = el.dataset[key];
        switch (typeof sample) {
            case "number":
                if (value) {
                    options[key] = +value;
                }
                break;
            case "boolean":
                if (value) {
                    options[key] = value !== "false";
                }
                break;
        }
    });

    return options as Options;
}

const DEFAULT_INIT_OPTIONS = {
    elements: "[data-paino]",
};

export default function init(
    options: InitOptions = DEFAULT_INIT_OPTIONS
): void {
    options = Object.assign({}, DEFAULT_INIT_OPTIONS, options);
    const elements =
        typeof options.elements === "string"
            ? document.querySelectorAll(options.elements)
            : options.elements;

    elements.forEach((el: HTMLElement) => {
        const options = parseOptions(el);
        const piano = new Paino({ el, ...options });
        piano.render();

        function getFromDataset(key: string) {
            try {
                return el.dataset && JSON.parse(el.dataset[key]);
            } catch (error) {
                return null;
            }
        }

        const notes = getFromDataset("notes");
        if (notes) {
            piano.setNotes(notes);
            return;
        }

        const right = getFromDataset("rightHand");
        const left = getFromDataset("leftHand");

        if (left && right) {
            piano.setNotes({ left, right });
        }
    });
}
