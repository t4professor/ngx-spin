<div align="center">
  <h2>ngx-spin</h2>
  <br />
  A spinner for displaying loading state of a page or a section.
<br /><br />

</div>

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Table of contents

- [Getting started](#getting-started)
  - [1. Install ngx-spin](#1-install-ngx-spin)
  - [2. Import the installed libraries](#2-import-the-installed-libraries)
  - [3. Include `ngx-spin` in your app component](#3-include-ngx-spin-in-your-app-component)
- [Examples](#xxamples)
  - [Basic usage](#basic-usage)
  - [Inside a container](#inside-a-container)
  - [Custom spinning indicator](#custom-spinning-indicator)
  - [Delay & Embedded mode](#delay-&-embedded-mode)
- [API](#api)


## Getting started

#### 1. Install ngx-spin:

```bash
  npm install ngx-spin --save
```

#### 2. Import the installed libraries:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxSpinModule } from 'ngx-spin';

import { AppComponent } from './app';

@NgModule({
  ...
  imports: [
    ...
    NgxSpinModule
  ],
})
export class AppModule {}
```

#### 3. Include `ngx-spin` in your app component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-spin [simple]="true"></ngx-spin>
  `,
})
export class AppComponent {}
```
## Examples

### Basic usage

A simple loading status.

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'demo-spin-basic',
    template: ` <ngx-spin [simple]="true"></ngx-spin> `,
})
export class DemoSpinBasicComponent {}
```

### Inside a container

Spin in a container.

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'demo-spin-inside',
    template: `
        <div class="example">
            <ngx-spin [simple]="true"></ngx-spin>
        </div>
    `,
    styles: [
        `
            .example {
                text-align: center;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                margin-bottom: 20px;
                padding: 30px 50px;
                margin: 20px 0;
            }
        `,
    ],
})
export class DemoSpinInsideComponent {}
```

### Custom spinning indicator

Use custom loading indicator.

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'demo-spin-custom-indicator',
    template: `
        <ng-template #indicatorTemplate><i class="fas fa-spinner"></i></ng-template>
        <ngx-spin [simple]="true" [indicator]="indicatorTemplate"> </ngx-spin>
    `,
    styles: [
        `
            i {
                font-size: 24px;
            }
        `,
    ],
})
export class DemoSpinCustomIndicatorComponent {}
```

### Delay & Embedded mode

Specifies a delay for loading state. If spinning ends during delay, loading status won't appear.

Embedding content into ngx-spin will alter it into loading state.

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'demo-spin-delay-and-debounce',
    template: `
        <ngx-spin [spinning]="isSpinning" [delay]="500">
            <div class="example">Something here</div>
        </ngx-spin>
    `,
    styles: [
        `
            .example {
                text-align: center;
                height: 100px;
                width: 100%;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                padding: 40px 20px;
            }
        `,
    ],
})
export class DemoSpinDelayAndDebounceComponent {
    isSpinning = true;
}
```

## API

#### Selector: `<ngx-spin></ngx-spin>`

| Property      | Description                                                                             | Type                              | Default Value |
| ------------- | --------------------------------------------------------------------------------------- | --------------------------------- | ------------- |
| `[delay]`     | specifies a delay in milliseconds for loading state (prevent flush), unit: milliseconds | `number`                          | -             |
| `[duration]`  | specifies a duration in milliseconds, if set 1000ms loading indicator will show for at least 1 second to prevent screen flash, unit: milliseconds | `number`                          | 100ms             |
| `[indicator]` | the spinning indicator                                                                  | `TemplateRef<void>`               | -             |
| `[size]`      | size of Spin                                                                            | `'large' \| 'small' \| 'default'` | `'default'`   |
| `[spinning]`  | whether Spin is spinning                                                                | `boolean`                         | `true`        |
| `[simple]`    | whether Spin has no children                                                            | `boolean`                         | `false`       |

## Build

Run `npm run build:lib` to build the project. The build artifacts will be stored in the `dist/` directory.
