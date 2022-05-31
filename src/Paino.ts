type ScaleNote = {
    chroma: number;
    color: "black" | "white";
    note: string;
    enharmonics?: string[];
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

export const defaultOptions = {
    el: "#paino",
    startOctave: 3,
    octaves: 2,
    withFinalC: true,
};

class Paino {
    private options: Options;
    private wrapper: HTMLElement;
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
    }
    setNotes(notes: string[]): Paino {
        const keys = [...this.wrapper.querySelectorAll(".key")];
        notes.forEach((n) =>
            keys
                .find((el: HTMLElement) => {
                    const { chroma, octave } = el.dataset;
                    const parsed = parseNote(n);
                    return (
                        +chroma === parsed.chroma && +octave === parsed.octave
                    );
                })
                ?.classList.add("key-on")
        );
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

        const createKey = (
            note: ScaleNote & { octave: number; noteWithOctave: string }
        ): void => {
            const span = document.createElement("span");
            span.classList.add("key");

            Object.entries(note).forEach(([key, value]) => {
                span.dataset[key] = `${value}`;
                span.classList.add(`${key}-${value}`);
            });

            this.wrapper.append(span);
        };

        Array.from({ length: octaves }, (_, octave) => {
            CHROMATIC_SCALE.forEach((x) =>
                createKey({
                    ...x,
                    octave: startOctave + octave,
                    noteWithOctave: `${x.note}${startOctave + octave}`,
                })
            );
        });

        if (withFinalC) {
            createKey({
                chroma: 0,
                note: "C",
                color: "white",
                octave: startOctave + octaves,
                noteWithOctave: `C${startOctave + octaves}`,
            });
        }
    }
}

export default Paino;
