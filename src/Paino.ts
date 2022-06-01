type ScaleNote = {
    chroma: number;
    color: "black" | "white";
    note: string;
    enharmonics?: string[];
};

type ScaleNoteWithOctave = ScaleNote & {
    octave: number;
    noteWithOctave: string;
};

const CHROMATIC_SCALE: ScaleNote[] = [
    {
        chroma: 0,
        color: "white",
        note: "C",
        enharmonics: ["B#"],
    },
    {
        chroma: 1,
        color: "black",
        note: "C#",
        enharmonics: ["Db"],
    },
    {
        chroma: 2,
        color: "white",
        note: "D",
        enharmonics: [],
    },
    {
        chroma: 3,
        color: "black",
        note: "D#",
        enharmonics: ["Eb"],
    },
    {
        chroma: 4,
        color: "white",
        note: "E",
        enharmonics: ["Fb"],
    },
    {
        chroma: 5,
        color: "white",
        note: "F",
        enharmonics: ["E#"],
    },
    {
        chroma: 6,
        color: "black",
        note: "F#",
        enharmonics: ["Gb"],
    },
    {
        chroma: 7,
        color: "white",
        note: "G",
        enharmonics: [],
    },
    {
        chroma: 8,
        color: "black",
        note: "G#",
        enharmonics: ["Ab"],
    },
    {
        chroma: 9,
        color: "white",
        note: "A",
        enharmonics: [],
    },
    {
        chroma: 10,
        color: "black",
        note: "A#",
        enharmonics: ["Bb"],
    },
    {
        chroma: 11,
        color: "white",
        note: "B",
        enharmonics: ["Cb"],
    },
];

function parseNote(note: string): {
    chroma: number;
    note: string;
    octave: number;
} {
    let octave;
    const maybeOctave = note.slice(-1);
    if (Number.isInteger(+maybeOctave)) {
        octave = +maybeOctave;
        note = note.slice(0, -1);
    }
    const chroma = CHROMATIC_SCALE.find(
        (x) => x.note === note || x.enharmonics.includes(note)
    )?.chroma;

    return {
        chroma,
        note,
        octave,
    };
}

export type Options = {
    el: string | HTMLElement;
    startOctave: number;
    octaves: number;
    withFinalC: boolean;
};

export const DEFAULT_PAINO_OPTIONS = {
    el: "#paino",
    startOctave: 3,
    octaves: 2,
    withFinalC: true,
};

type SetNotesParams =
    | string[]
    | {
          right: string[];
          left: string[];
      };

class Paino {
    private options: Options;
    private wrapper: HTMLElement;
    constructor(options = {}) {
        this.options = Object.assign({}, DEFAULT_PAINO_OPTIONS, options);
    }
    setNotes(notes: SetNotesParams): Paino {
        this.clearNotes();
        if (Array.isArray(notes)) {
            this._setNotes(notes);
        } else {
            this._setNotes(notes.right, "right");
            this._setNotes(notes.left, "left");
        }
        return this;
    }
    clearNotes(): Paino {
        this.wrapper
            .querySelectorAll(".key-on")
            .forEach((el: HTMLElement) => el.classList.remove("key-on"));
        return this;
    }
    render(): Paino {
        this.baseRender();
        return this;
    }
    destroy(): void {
        this.wrapper?.remove();
    }
    private baseRender(): void {
        if (this.wrapper) {
            return;
        }
        const { el, withFinalC, startOctave, octaves } = this.options;

        this.wrapper = typeof el === "string" ? document.querySelector(el) : el;
        this.wrapper.classList.add("paino");

        const createKey = (note: ScaleNoteWithOctave): void => {
            const span = document.createElement("span");
            span.classList.add("key");

            Object.entries(note).forEach(([key, value]) => {
                span.dataset[key] = `${value}`;
                span.classList.add(`${key}-${value}`);
            });

            this.wrapper.append(span);
        };

        Array.from({ length: octaves }, (_, octave) =>
            CHROMATIC_SCALE.forEach((x) =>
                createKey({
                    ...x,
                    octave: startOctave + octave,
                    noteWithOctave: `${x.note}${startOctave + octave}`,
                })
            )
        );

        if (withFinalC) {
            createKey({
                ...CHROMATIC_SCALE[0],
                octave: startOctave + octaves,
                noteWithOctave: `C${startOctave + octaves}`,
            });
        }
    }
    private getMiddleOctave(): number {
        const { startOctave, octaves } = this.options;
        return Math.round((startOctave + octaves) / 2) + 1;
    }
    private _setNotes(notes: string[], hand?: string): void {
        const middleOctave = this.getMiddleOctave();
        const keys = [...this.wrapper.querySelectorAll(".key")];
        notes.forEach((n) => {
            const foundKey = keys.find((el: HTMLElement) => {
                const { chroma: dataChroma, octave: dataOctave } = el.dataset;
                const parsed = parseNote(n);
                const octave = parsed.octave || middleOctave;
                return +dataChroma === parsed.chroma && +dataOctave === octave;
            });
            if (!foundKey) {
                return;
            }
            foundKey.classList.add("key-on");
            if (hand) {
                foundKey.classList.add(`${hand}-hand`);
            }
        });
    }
}

export default Paino;
