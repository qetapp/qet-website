---
layout: layout.njk
title: Install qet
---

<h1 title="Install qet">Install qet</h1>

This page provides instructions on how to download and install the `qet` command-line application.

## Prerequisites

Before installing `qet`, ensure you have the following installed on your system:

*   **Python 3.8+**: `qet` is a Python application.
*   **pip**: Python's package installer.

## Installation Methods

### 1. Using pip (Recommended)

The easiest way to install `qet` is via `pip`, Python's package installer. This method ensures you get the latest stable release and handles dependencies automatically.

```bash
pip install qet-cli
```

After installation, you should be able to run `qet` from your terminal:

```bash
qet --version
```

### 2. From Source (for Developers)

If you want to contribute to `qet` or need the very latest development version, you can install it directly from the source code.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/qetapp/qet-cli.git
    cd qet-cli
    ```

2.  **Install in editable mode:**
    ```bash
    pip install -e .
    ```

    This installs `qet` in "editable" mode, meaning any changes you make to the source code will be immediately reflected when you run `qet`.

3.  **Verify installation:**
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
