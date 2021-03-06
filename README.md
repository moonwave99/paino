# Paino

[Painless piano diagrams.][examples]

## Installation

```bash
npm i @moonwave99/paino --save
```

## Easy usage

```html
<p>This is a standard <strong>Cm7</strong> voicing:</p>
<figure data-paino data-notes="C Eb G Bb"></figure>
```

```js
import "node_modules/@moonwave99/paino/src/styles.paino.css";
import { init } from "@moonwave99/paino";

init();
```

`init` will look for all the `[data-paino]` elements on the page. Alternatively one can call:

```js
init({
    elements: '<selector>' | document.querySelectorAll(...)
});
```

## Two hands

```html
<p>This is a <strong>Cm7</strong> voicing played with both hands:</p>
<figure
    data-paino
    data-octaves="4"
    data-notes-hands="C4 G4, Eb5 Bb5"
></figure>
```

## SATB

```html
<p>This is a <strong>Cm7</strong> highlighted in four part harmony fashion:</p>
<figure
    data-paino
    data-octaves="4"
    data-notes-satb="C4, G4, Eb5, Bb5"
></figure>
```

[See examples][examples]

## Programmatical usage

```html
<figure id="my-element"></figure>
```

```js
import { Paino } from "@moonwave99/paino";

const piano = new Paino({ el: "#my-element", octaves: 4 });
piano.render();
piano.setNotes(["C", "Eb", "G", "Bb"]);
```

---

## MIT License

Copyright (c) 2022 Diego Caponera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[examples]: https://codepen.io/moonwave99/pen/yLvjLKe
