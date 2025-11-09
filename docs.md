---
layout: layout.njk
title: qet Documentation
---

<h1 title="qet Documentation">qet Documentation</h1>
###### qet: A Unified Package Manager for Linux

###### 1. Introduction

Welcome to the `qet` documentation! `qet` is a powerful command-line meta package manager designed for Linux, offering a unified and user-configurable abstraction layer over various software installation systems. Whether you're a developer, power user, or system administrator, `qet` provides a consistent, reproducible, and efficient way to manage your software across diverse Linux environments.

This documentation will guide you through `qet`'s core philosophy, its internal architecture, detailed command-line interface usage, and how it intelligently handles software installations and updates.

###### 2. Core Philosophy and Design Principles

`qet` is built upon a set of core principles that guide its design and functionality:

*   **Unification:** `qet` aims to provide a single, consistent command set (e.g., `qet add`, `qet remove`, `qet upgrade`) for managing all your software. The goal is a uniform user experience, regardless of the underlying package manager (like `apt`, `dnf`, `npm`, etc.) being used.

*   **Configuration over Convention:** `qet` empowers users with explicit control. Instead of making assumptions, it allows you to define which installation sources are used and their priority through a simple, clear configuration file.

*   **Reproducibility:** With `qet`, you can easily snapshot your managed software collection and reliably replicate that setup on any other machine, even if it runs a different Linux distribution.

*   **The "Plumbing First" Strategy:** To deliver a polished user interface, `qet` prioritizes stable, script-friendly "plumbing" commands (e.g., `apt-get`) over interactive "porcelain" commands (e.g., `apt`). This allows `qet` to parse predictable output streams and render its own consistent UI.

*   **Graceful Fallback:** Resilience is key. If `qet` encounters issues parsing a plumbing command's output or if a plumbing command isn't available, it will gracefully fall back to streaming the raw output of the standard command. This ensures that while the interface might become less "pretty," critical information is never hidden, and the operation never fails silently.

###### 3. Filesystem Architecture and Data Flow

`qet`'s logic and state are managed through a set of clearly defined TOML files. These files are categorized into those you interact with to define your desired system state and those `qet` uses internally to manage its operations.

###### User-Managed Configuration Files

This section describes the files you will create or modify to control `qet`'s behavior and replicate your environment.

###### 3.1. Configuring Preferences: The `conf.toml` File

The `conf.toml` file is your primary interface for tailoring `qet` to your personal workflow and distribution. Here, you define which software sources `qet` should trust and their priority order.

**Example `~/.config/qet/conf.toml`:**

Consider a Fedora user who develops with Node.js and Python. They prefer `npm` and `uvx` for their respective ecosystems and use `dnf` as a fallback for other software.

```toml
# A list of installation methods, ordered by user priority. `qet` will
# try these from top to bottom when automatically selecting a source.
priority = [
  "npm",      # For Node.js/JavaScript tools
  "uvx",      # For Python CLI tools
  "dnf",      # Native system package manager for everything else
  "snap",     # For complex apps or things to be sandboxed
  "script",   # For installers from websites (e.g., Docker)
]

# A list of methods to explicitly ignore.
exclude = ["flatpak"]

[defaults]
# The command-line tool to use for downloading remote content.
download_tool = "curl"
```

**`conf.toml` Specification:**

| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `priority` | Array of Strings | Yes | An ordered list of method names. When `qet add` is run without `--using`, `qet` will search for a package candidate in this specified order. |
| `exclude` | Array of Strings | No | A list of method names to explicitly ignore during automatic source selection. |
| `[defaults]` | TOML Table | No | A table for default tool settings and other global configurations. |
| `download_tool` | String | No | A key within the `[defaults]` table. Specifies the command-line tool to use for downloading. Valid values include "curl" or "wget". Defaults to "curl" if not specified. |

---

###### 3.2. Reproducing an Environment: The `Qetfile`

One of `qet`'s most powerful features is its ability to replicate your software environment. This is achieved using the `snapshot` and `sync` commands, which interact with a `Qetfile`. This declarative file lists your desired software and its preferred installation method, making it ideal for version control systems like dotfiles repositories.

**Example `Qetfile`:**

This `Qetfile` was generated on an Ubuntu machine, demonstrating how to recreate a specific software setup on any other system.

```toml
# This file was generated by `qet snapshot`. It declares my desired software setup.

[[packages]]
qet_name = "@docker/engine"
method = "script" # I specifically want Docker from the official script.

[[packages]]
qet_name = "@utils/ripgrep"
method = "apt"    # On my original system, the native package was best.

[[packages]]
qet_name = "@google/gemini-cli"
method = "npm"    # This should always be installed via npm.
```

**`Qetfile` Specification:**

| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `[[packages]]` | Array of Tables | Yes | The top-level key defining a list of package records. Each `[[packages]]` entry represents a distinct package. |
| `qet_name` | String | Yes | The canonical, unique `qet` name for the package (e.g., `@"scope/name"`). |
| `method` | String | Yes | The installation method preferred for this package. `qet sync` uses this to preserve your original intent. |

**Note on TOML Syntax:** The `[[packages]]` directive is standard TOML syntax for defining an array of tables. Each instance signals the start of a new, distinct package record in the list.

---

###### Internal `qet` Files

This section describes the internal files that `qet` creates and manages. While you typically won't edit these directly, understanding their purpose is crucial for comprehending `qet`'s operations.

###### 3.3. Tracking State: The Installation Manifest (`manifest.toml`)

`qet` maintains a persistent record of its actions in the `manifest.toml` file, located at `~/.local/share/qet/manifest.toml`. This file acts as `qet`'s memory, logging every installed package and its installation metadata. It is the authoritative source for `remove`, `upgrade`, and `list` commands. **Important: This file should not be manually edited by users, and all writes to it are performed atomically to prevent corruption.**

**Example `~/.local/share/qet/manifest.toml`:**

This manifest reflects the state of an Ubuntu system after installing the packages from the `Qetfile` example above.

```toml
[[packages]]
qet_name = "@docker/engine"
method = "script"
source_url = "https://get.docker.com"
install_date = "2025-11-10T18:20:00Z"

[[packages]]
qet_name = "@utils/ripgrep"
method = "apt"
package_name = "ripgrep"
install_date = "2025-11-10T18:21:15Z"

[[packages]]
qet_name = "@google/gemini-cli"
method = "npm"
package_name = "@google/gemini-cli"
install_date = "2025-11-10T18:22:05Z"
```

**`manifest.toml` Specification:**

| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `[[packages]]` | Array of Tables | Yes | The top-level key defining the list of installed package records. Each entry represents an installed package. |
| `qet_name` | String | Yes | The canonical `qet` name for the package, serving as its primary identifier. |
| `method` | String | Yes | The installation method successfully used to install the package. |
| `package_name` | String | Conditional | The name of the package as recognized by the native package manager (e.g., `apt`, `dnf`, `npm`). Required for methods that use native package names. |
| `source_url` | String | Conditional | The source URL used for the installation. Required for methods like `script`. At least one of `package_name` or `source_url` must be present. |
| `install_date` | String (ISO 8601) | Yes | A timestamp recording when the installation was successfully completed. |

---

###### 3.4. The Knowledge Base: The Package Definitions (`definitions.toml`)

`qet` discovers software through a community-maintained package definitions database, stored locally at `~/.local/share/qet/definitions.toml`. This file acts as a local cache, updated from a remote source via the `qet update` command. It maps `qet`'s canonical package names to their concrete implementations across the Linux software ecosystem.

**Example `~/.local/share/qet/definitions.toml` snippet:**

```toml
# A snippet from the larger community-maintained database.

["@utils/ripgrep"]
description = "A fast, line-oriented search tool."
apt = { package_name = "ripgrep" }
dnf = { package_name = "ripgrep" }
pacman = { package_name = "ripgrep" }

["@docker/engine"]
description = "The Docker containerization engine."
script = { source_url = "https://get.docker.com" }
apt = { package_name = "docker-ce" }
```

###### 3.5. Command Recipes: The Method Definitions (`methods.toml`)

The `methods.toml` file, shipped with `qet` and located in a system-wide path like `/usr/share/qet/methods.toml`, provides the command-line "recipes" for all supported installation methods. This file is central to the "Plumbing First" strategy, defining the stable, script-friendly commands `qet` uses for parsing, as well as the user-facing "raw" commands for its graceful fallback mechanism.

**Example `methods.toml` snippet:**

```toml
[apt]
# The fallback command for raw streaming
add_raw = "sudo apt install -y {package_name}"
# The primary command for qet to parse, using the stable `apt-get` interface
add_plumbing = "sudo apt-get install -y {package_name}"
remove_plumbing = "sudo apt-get remove -y {package_name}"
upgrade_plumbing = "sudo apt-get install --only-upgrade -y {package_name}"
# A stable command to check for a package's version info
upgrade_check_plumbing = "apt-cache policy {package_name}"
```

###### 4. Command-Line Interface (CLI) Usage

This section details the usage and behavior of each user-facing `qet` command.

###### `qet add`
Installs a new package. `qet` automatically determines the best installation source based on your `conf.toml` configuration, but you can manually specify a method using the `--using` flag.

*   **Usage:** `qet add [--using METHOD] <qet_name>`

###### `qet remove`
Uninstalls a package that was previously installed by `qet`.

*   **Usage:** `qet remove <qet_name>`

###### `qet upgrade`
Upgrades one or all installed packages to their latest available versions.

*   **Usage:** `qet upgrade <qet_name> | --all`

###### `qet update`
Refreshes the local package definitions database by pulling updates from its remote source.

*   **Usage:** `qet update`

###### `qet sync`
Synchronizes your system with a `Qetfile`. This command performs a two-phase process of analysis and execution, designed to gracefully handle cross-distribution migrations.

*   **Usage:** `qet sync`

###### `qet snapshot`
Generates a `Qetfile` representing your current system's software state and prints it to standard output. This is useful for creating reproducible environments.

*   **Usage:** `qet snapshot`

###### 5. Unified UI and Execution Logic

`qet`'s polished user interface is a key feature, achieved through a specific execution logic:

1.  **Prioritizing Plumbing Commands:** For any action (e.g., `add`), `qet` first attempts to find a `_plumbing` command definition in `methods.toml` (e.g., `add_plumbing`).

2.  **Structured Parsing:** If a plumbing command is found, `qet` executes it and captures its standard output. A dedicated parser, specific to that command's output format, then identifies key stages of the process (e.g., "resolving dependencies," "downloading packages," "installing"). This parsed data is used to render `qet`'s clean, unified UI in real-time, providing clear progress updates.

3.  **Graceful Fallback Mechanism:** This is a critical safety feature:
    *   If a `_plumbing` command is **not defined** for a particular method, `qet` will immediately fall back to using the `_raw` command.
    *   If the parser for a `_plumbing` command encounters unexpected output (e.g., due to a new version of the underlying tool), it will **immediately stop parsing**.
    *   In either fallback scenario, `qet` will issue a warning to the user, then execute the `_raw` command and stream its output directly and unfiltered to the console. This ensures transparency and prevents silent failures.

4.  **Comprehensive Error Reporting:** If the underlying command exits with a non-zero status code, `qet` will halt the operation. It will display a clear, high-level error message, followed by the full, captured `stderr` from the failed command, providing complete context for debugging.

###### 6. General Error Handling and System Interaction

*   **Permissions and `sudo`:** `qet` itself operates without elevated privileges. `sudo` is included in command templates within `methods.toml` where necessary, relying on the system's `sudo` facility for authentication.

*   **Atomic Writes:** To prevent data corruption, all writes to the `manifest.toml` file are performed atomically. This typically involves writing to a temporary file and then performing an atomic rename/move operation to replace the original file.

*   **User Interrupts (Ctrl+C):** If you interrupt an operation (e.g., with Ctrl+C) while a native package manager is running, `qet` will terminate gracefully. The manifest file will not be updated, as the successful completion of the operation cannot be guaranteed.

*   **State Drift:** It's important to note that if software is managed outside of `qet` (e.g., using `sudo dnf remove htop`), the `manifest.toml` file may become out of sync. Future versions of `qet` may include a `qet verify` command to detect and correct such discrepancies, but this functionality is not part of the current v1.0 scope.
