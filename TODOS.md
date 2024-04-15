# TODOS

A list of all the things to do for Litnotes

## Todos

1) 2024-03-15 Save load modify configuration file
    - If no workspaces are found show "create workspace" dialogue
    - Deleting a workspace isn't reflected immediately in the settings GUI and it's super annoying. Why does state management hate me?
2) 2024-04-03 Select current workspace form drawer
    - Remember last workspace selected
    - Have a select widget to chose current workspace
    - On workspace select get the file tree for the workspaces
    - On application start if there's a last workspace selected get the file tree for that workspace
    - Have a button to refresh the workspace tree

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
    - Save window size (location?) on close
