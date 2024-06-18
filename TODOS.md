# TODOS

A list of all the things to do for Litnotes. The todo list became pretty messy during the initial implementation so I'm updating what I think of as stuff that still needs to be done.

## Todos

* The editor window doesn't display anything after (and including) the first code block.
* Add configuration for showing or hiding the dev console on startup.
* Add configuration for the workspace fold being on either the left or right side.
* Add configuration for the width of the workspace pane.
* Make the workspace pane resizeable by dragging.
* Apply a theme to the editor window, make it not terrible in dark mode.
* When the editor is modified add a debounce to save.
* Detect when the editor loses focus and save.
* Make the title pane contain the workspace and file name. It can display "Litnotes" but doesn't have to when a file is open.
* Have configuration show on first launch (no workspaces).
* Configuration to hide/show non-.md/.txt files.
* Configuration to hide/show hidden files/directories.
* Icons for the workspace tree.
* When a file tab is selected also select that entry in the workspace tree.

## Bugs

- On longer notes the toolbar scrolls up and isn't accessible while editing.
- It seems like the directory browse window only opens in front of the electron window the first time, but not after that. Maybe it's not being disposed of properly?
- Some large workspaces can have errors loading that I don't understand.
  - `Error occurred in handler for 'file:getDirectory': TypeError: Cannot use 'in' operator to search for 'ensure.js' in undefined at populateChildren (/home/nule/Workspace/personal/litnotes/.webpack/main/index.js:935:20)`
- itemIds in the tree view being common between different trees leads to odd behavior.
  - probably just use the relative path + name for the id. I don't know there's a restriction on the string used
- If you remove a workspace that's being worked on it should probably clear the drawer and main.
  - Select "No Workspace Selected" from the dropdown in this state causes an error
  - `TypeError: Cannot read properties of undefined (reading 'directory')
at handleLoadWorkspace (webpack-internal:///./src/components/drawer/workspace-drawer.jsx:88:52)`
- The linkDialogPlugin for MDX opens in the wrong spot.
- If a workspace is on the list but the folder's been deleted (moved, etc.) then you'll get an uncaught exception
    - workspace-drawer:76
- In general if there's a problem with the editor (doesn't display content) there's no where that I can see were the error, exception, etc. is displayed. Highly funky.
- When you open a workspace and a file is gone it throws an uncaught runtime (NOENT)
  - it leaves up the "content loading" page, which isn't the worst

## Previous Todos

### Early planning

This is a mess, but left until I can clean parts of it up.

1) 2024-03-15 Save load modify configuration file
    - The directory text input should maybe be manually editable
4) 2024-04-15 Misc ponderings
    - Directory list might be a bit funky for empty directories

### Future things to consider

- Implement content security: https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
- Themes (need a dark mode, edit: have a dark mode!)
  - There a MUI theme builder here: https://zenoo.github.io/mui-theme-creator/
  - Currently in theme.jsx you can change the mode from 'dark' to 'light'
  - Can we detect from electron if the OS is using light/dark mode?
  - How do we tell the theme provider to switch themes while running?
    - and can we make that part of the configuration we want to save?
- VIM keybindings, absolutely required
- Make the drawer resizeable by dragging...

