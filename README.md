# qet-website

This repository contains the source code for the `qet` project website.

## Technical Stack

*   **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/)
    *   Eleventy is a simpler static site generator that transforms various template files into static HTML.
*   **Templating Language:** [Nunjucks](https://mozilla.github.io/nunjucks/)
    *   Nunjucks is used for templating HTML files, allowing for reusable components (layouts, includes) and dynamic content generation during the build process.
*   **Styling:** Pure CSS
    *   The website uses plain CSS for styling, located in `style.css`.
*   **JavaScript:** Vanilla JavaScript
    *   Minimal JavaScript is used for interactive elements, located in `main.js`.

## Project Structure

*   `.eleventy.js`: Eleventy configuration file.
*   `_includes/`: Contains Nunjucks layout files (e.g., `layout.njk`).
*   `_site/`: This directory is where Eleventy outputs the generated static website files. It should not be committed to version control.
*   `.gitignore`: Specifies files and directories that Git should ignore, including `node_modules/` and `_site/`.
*   `package.json` & `package-lock.json`: Node.js package manager files, listing project dependencies.
*   `style.css`: Main stylesheet for the website.
*   `main.js`: Main JavaScript file for client-side interactivity.
*   `.md` files (e.g., `index.md`, `about.md`, `docs.md`): Markdown files that Eleventy processes into HTML pages.

## Getting Started

To set up and run the project locally, follow these steps:

### 1. Install Dependencies

Make sure you have Node.js and npm (or yarn) installed. Then, install the project dependencies:

```bash
npm install
```

### 2. Run Locally

To start the Eleventy development server and view the website locally:

```bash
npm start
```

This command will:
*   Build the website into the `_site` directory.
*   Start a local development server (usually at `http://localhost:8080`).
*   Watch for changes in source files and automatically rebuild/reload the browser.

### 3. Build for Production

To generate a production-ready build of the website:

```bash
npm run build
```

This command will compile all source files into static HTML, CSS, and JS in the `_site` directory, ready for deployment.

## Maintainability Notes

*   **Content Management:** Most page content is written in Markdown (`.md` files), making it easy to edit and update.
*   **Layouts:** Global page structure and common elements are managed in Nunjucks templates within `_includes/`.
*   **Styling:** Keep `style.css` organized and consider using CSS variables for consistent theming if the project grows.
*   **JavaScript:** `main.js` is for general site-wide interactivity. For page-specific scripts, consider adding them directly to the Markdown files or creating separate JS files and including them conditionally in Nunjucks templates.
