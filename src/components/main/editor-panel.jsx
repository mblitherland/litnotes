import React from 'react';

import { MDXEditor } from '@mdxeditor/editor';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  linkDialogPlugin
} from '@mdxeditor/editor';
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  Button,
  Separator
} from '@mdxeditor/editor';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditorToolbar = () => {
  return (
    <>
      <UndoRedo />
      <BoldItalicUnderlineToggles />
      <CreateLink />
      <Separator />
      <Button>
        <Typography>Save</Typography>
      </Button>
      <Button>
        <Typography>Close</Typography>
      </Button>
    </>
  );
}

const EditorPanel = ({ index, tabText, tabSource, tabType, visible }) => {

  const editorRef = React.useRef(null);

  return (
    <div
      hidden={index !== visible}
    >
      { index === visible && tabType === ".md" && (
        <Box>
          <MDXEditor
            markdown={'# Hello Litnotes'}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              linkDialogPlugin(),
              toolbarPlugin({ toolbarContents: EditorToolbar })
            ]}
            ref={editorRef} />

          {
            tabSource && <Typography>This will be an MDX panel containing {tabSource}</Typography>
          }

        </Box>
      )}
      { index === visible && tabType !== ".md" && (
        <Box sx={{ padding: 2 }}>
          { tabType === null && (
            <Typography>{tabText}</Typography>
          )}
          { tabType !== null && (
            <Typography>Cowardly refusing to handle a file that's not apparently Markdown.</Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default EditorPanel;
