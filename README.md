# Litnotes

This is a simple, open-source editor for managing a collection of Markdown files.

## Status

*This is alpha software*

Please be careful, there's a good chance it will delete your data. There's an ever better chance it won't work as you expect or in some cases at all. If you're not a developer I wouldn't even try to use this right now, honestly.

## Run and build instructions

This project is built off of electron and react. You should be able to start it by cloning the repository and running `npm install` then `npm start`.

## Design decisions

The primary consideration is to make a useful desktop application with local filesystem access to handle editing MD files as sort of a local knowledge base. It should be cross-platform and using technologies I'm already pretty familiar with and ones that are in common use to provide less worry about abandoned code or bits that are hard to upgrade. Here's the initial stab at a stack.

* Electron (so Nodejs)
* React
* Material You
    * MUI core
    * MUI X tree view
* MDX Editor
* git (for version management and syncing)

## Version and Todos

See the `VERSIONS.md` and `TODOS.md` to read about versions and history as well as to see planned features and to find something to work on.

## License

See `LICENSE` for more information.
