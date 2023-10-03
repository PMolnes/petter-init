# petter-init

## What is petter-init?

petter-init is a cmd-line tool you can use to easily scaffold projects with tailwindcss configured ready-to-go. It automatically does all the steps needed to start using tailwind in your framework.

You can immediately style your elements using tailwindcss, no configuration by yourself is needed.

## How do I use it?

1. Download the npm package globally as such `npm i petter-init -g`.
2. Type `petter-init` to initialize a new project with tailwindcss ready-to-go.

## Why petter-init?

Initializing projects and setting up tailwindcss everytime you have a new idea can be tiresome. I myself realized I spent 5 minutes just setting up tailwindcs everytime I created a new front-end project. Therefore, I decided to take it upon myself to create **petter-init**.

The name is a play on "better-init", because as it was taken on npm, I decided to use my own name, Petter.

## How does it work?

petter-init will do the steps listed on [tailwindcss framework guides](https://tailwindcss.com/docs/installation/framework-guides) for the selected framework. It does this by:

1. Initalizing a front-end project with `npm create vite@latest` and `npm create vue@latest`.
2. Installing `tailwindcss`, `autoprefixer`, and `postcss` using your selected package manager.
3. Copying necessary template files using `fs.copyFileSync`.

# Disclaimer

This project was solely created for learning purposes and hobby projects. I do not take any responibility if anything goes wrong when you use my package. **Use at your own risk**.
