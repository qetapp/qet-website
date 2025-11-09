---
layout: layout.njk
title: Install qet
---

<div style="background-color: #ffdddd; border-left: 6px solid #f44336; margin-bottom: 1em; padding: 0.5em 1em;">
  <strong>Warning:</strong> `qet` is currently a work-in-progress project. It is highly recommended to test it on a non-critical machine or in a virtual environment.
</div>

<h1 title="Install qet">Install qet</h1>

This page provides instructions on how to download and install the `qet` command-line application.

## Prerequisites

Before installing `qet`, ensure you have the following installed on your system:

*   **Python 3.8+**: `qet` is a Python application.
*   **Git**: For cloning the repository.

## Installation

The `qet` application can be installed directly from its GitHub repository. This method ensures you get the latest version of the application.

1.  **Clone the repository:**
    First, clone the `qet-cli` repository from GitHub to your local machine:

    ```bash
    git clone https://github.com/qetapp/qet-cli.git
    cd qet-cli
    ```

2.  **Install dependencies and `qet`:**
    `qet` is a Python application. You can install it and its dependencies using `pip` in editable mode. This is useful for development and ensures that any changes you make to the source code are immediately reflected.

    ```bash
    pip install -e .
    ```

    If you only want to install the dependencies without installing `qet` in editable mode, you can use:

    ```bash
    pip install .
    ```

3.  **Verify installation:**
    After installation, you should be able to run `qet` from your terminal:

    ```bash
    qet --version
    ```

## Post-Installation Setup

After installing `qet`, you might want to:

*   **Configure `conf.toml`**: Customize `qet`'s behavior by editing the `conf.toml` file. Refer to the [Documentation](/docs) for details.
*   **Update Definitions**: Run `qet update` to fetch the latest package definitions.

If you encounter any issues during installation, please refer to the [troubleshooting guide](#troubleshooting) or open an issue on the [GitHub repository](https://github.com/qetapp/qet-cli/issues).

## Troubleshooting

### `qet: command not found`

If you see this error, it means the `qet` executable is not in your system's PATH. This often happens when `pip` installs packages to a user-specific directory (e.g., `~/.local/bin`).

**Solution:** Add the `pip` user base directory to your PATH. You can find this directory by running:

```bash
python -m site --user-base
```

Then, add the `bin` subdirectory of that path to your shell's configuration file (e.g., `.bashrc`, `.zshrc`). For example:

```bash
export PATH="$PATH:/home/youruser/.local/bin"
```

Remember to `source` your shell's configuration file after editing it (e.g., `source ~/.bashrc`).