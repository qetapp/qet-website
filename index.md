---
layout: layout.njk
title: qet - A Meta Package Manager
---

<h1 title="qet">qet</h1>

`qet` is a command-line tool for Linux that acts as a meta package manager. It provides a unified interface to manage packages from different sources, such as system package managers (apt, dnf, pacman), language-specific managers (pip, npm), and other distribution formats (AppImage, Snap, Flatpak).

---

## Why use qet?

`qet` simplifies managing software on your Linux system in several ways.

It offers a **Unified Interface**, allowing you to use a single, consistent command (`qet add`, `qet remove`) for all your applications, regardless of their source.

You retain **Total Control**, deciding which installation method to use for each application, whether you prefer `apt` for system tools or `npm` for development utilities.

**Effortless Management** means you no longer need to remember how a specific tool was installed; `qet` tracks everything, enabling updates or removals with simple commands.

With **Easy Auditing**, the central manifest provides a clear overview of every `qet`-installed application and its source.

Finally, `qet` facilitates **Reproducible Environments** by allowing you to define your entire software setup in a `Qetfile`, making it easy to replicate your environment on any new machine.

---

## What qet is not

It is important to understand what `qet` is not.

**`qet` is not a package manager** itself; it lacks its own package repository, build system, or distribution infrastructure. Instead, it functions as a meta-manager, sitting atop other package managers.

Consequently, **`qet` does not replace your system's package manager**; you will still need `apt`, `dnf`, `pacman`, or similar tools installed and operational, as `qet` merely provides a unified interface to them.

Furthermore, **`qet` does not resolve dependencies across different managers**. For instance, if you install a package with `npm`, `qet` will not use `apt` to install its system-level dependencies.
