# TODOS

A list of all the things to do for Litnotes

## Todos

1) 2024-03-15 Save load modify configuration file
    - Create a configuration model
        - ID? (random UUID)
        - Window size (location?)
        - Most recent workspace (id)
        - theme?
        - Workspaces (array)
            - id (timestamp)
            - name
            - location (file system)
    - Put a "settings" "gear" button on the opening page to manually open and close settings dialogue
        - Have that gear open a configuration screen
    - On application open if no workspaces are found show "create workspace" dialogue
    - On application open load preferences if they exist
    - Save window size (location?) on close

Future things to consider
- Implement content security: https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
- Themes (need a dark mode)
    - There a MUI theme builder here: https://zenoo.github.io/mui-theme-creator/
    - Currently in theme.jsx you can change the mode from 'dark' to 'light'
    - Can we detect from electron if the OS is using light/dark mode?
    - How do we tell the theme provider to switch themes while running?
        - and can we make that part of the configuration we want to save?
- VIM keybindings, absolutely required
- Make the drawer resizeable by dragging...

## Todoings

Working on all the skeleton stuff so I can start adding features.
- The first pass at the drawer functionality isn't ideal from a react component standpoint. I'd like to break those pieces up more.

## Todones

0) 2024-03-16 - Lay down the initial dependencies
