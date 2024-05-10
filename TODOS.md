# TODOS

A list of all the things to do for Litnotes

## Todos

1) 2024-03-15 Save load modify configuration file
    - If no workspaces are found show "create workspace" dialogue
    - The directory text input should maybe be manually editable
4) 2024-04-15 Misc ponderings
    - Directory list should probably exlude non `.md` and `.txt` files. Maybe.
        - Put a toggle for this?
    - Make drawer side configurable? (Good "M is bored" task).
    - Make drawer size configurable, but we want to make that interactive with a dragger
    - Directory list might be a bit funky for empty directories
    - Icons for the workspace tree
5) 2024-04-24 Time to think about the editor space
    - Use tabbed interface
    - File name (and workspace?) in header with save status
    - Save on lengthy debounce
    - Save on tab switch and close and window close
    - Manual save for those that feel like they must push a button
6) 2024-05-07 More misc
    - Don't show hidden/dotfiles in workspace (provide a toggle)

## Bugs

- It seems like the directory browse window only opens in front of the electron window the first time, but not after that. Maybe it's not being disposed of properly?
- Some large workspaces can have errors loading that I don't understand.
- itemIds in the tree view being common between different trees leads to odd behavior.
    - probably just use the relative path + name for the id. I don't know there's a restriction on the string used
- If you remove a workspace that's being worked on it should probably clear the drawer and main.

## Future things to consider

- Implement content security: https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
- Themes (need a dark mode, edit: have a dark mode!)
    - There a MUI theme builder here: https://zenoo.github.io/mui-theme-creator/
    - Currently in theme.jsx you can change the mode from 'dark' to 'light'
    - Can we detect from electron if the OS is using light/dark mode?
    - How do we tell the theme provider to switch themes while running?
        - and can we make that part of the configuration we want to save?
- VIM keybindings, absolutely required
- Make the drawer resizeable by dragging...

## Todoings

Working on large swaths of very basic functionality. Leaving lots of fun bugs to work on. :)

## Todones

0) 2024-03-16 Lay down the initial dependencies
1) 2024-03-22 Save load modify configuration file
    - Create a configuration model
        - ID? (random UUID)
        - Window size (location?)
        - Most recent workspace (id)
        - theme?
        - Workspaces (array)
            - id (timestamp)
            - name
            - directory (file system)
            - open files (relative to location, array)
    - Put a "settings" "gear" button on the opening page to manually open and close settings dialogue
        - Have that gear open a configuration screen
    - Load preferences if they exist on application start
    - Save window size (location?, edit: yes) on close
    - Deleting a workspace isn't reflected immediately in the settings GUI and it's super annoying. Why does state management hate me? (exit: fixed)
2) 2024-04-03 Select current workspace form drawer
    - Remember last workspace selected
    - Have a select widget to chose current workspace
    - On workspace select get the file tree for the workspaces
    - On application start if there's a last workspace selected get the file tree for that workspace
    - Have a button to refresh the workspace tree
3) 2024-04-07 Setting within the running app ponderings
    - Hoisting settings piecemeal is kind of a pain in the butt
    - I feel like a settings singleton with convenience methods is a smart thing, but it's not the "react way" tm. (Tried to do it the "react way" tm.)

99) Misc bugs
- When you delete a workspace form the settings page it's really deleted, but doesn't leave the list until some other setting changes. I haven't figured a way to get this to work properly, even with a `useEffect`.
