# Introduction

## What is petter-init?

petter-init is a [npm package](https://www.npmjs.com/package/petter-init) that scaffolds projects, with TailwindCSS configured, and ready-to-code. The tool is supposed to be a better initializer when you want to use TailwindCSS in your projects.

## Why petter-init?

TailwindCSS is great for styling your website quickly. However, there are several steps to setting up TailwindCSS before you can start using it. This can be cumbersome in smaller projects, where you might just want to test something.

I decided to create petter-init after getting sick of setting up TailwindCSS for simple applications where I just wanted to try something. To my surprise, [Fireship is also tired of configuring TailwindCSS](https://youtu.be/lHZwlzOUOZ4?si=MsXA5NBZohrFK_b_&t=200).

## How does it work?

petter-init will do the steps listed on [tailwindcss framework guides](https://tailwindcss.com/docs/installation/framework-guides) for the selected framework and package manager.

1. React and Vue projects are initialized with:

::: code-group

```npm
npm create vite@latest
```

```pnpm
pnpm create vite@latest
```

```yarn
yarn create vite
```

:::

SvelteKit projects are initialized with:

::: code-group

```npm
npm create svelte@latest
```

```pnpm
pnpm create svelte@latest
```

```yarn
yarn create svelte
```

:::

2. In your new project, petter-init runs:

::: code-group

```npm
npm install tailwindcss postcss autoprefixer
```

```pnpm
pnpm install tailwindcss postcss autoprefixer
```

```yarn
yarn install tailwindcss postcss autoprefixer
```

:::

3. Copying necessary template files using `fs.copyFileSync` and removing boilerplate files.
