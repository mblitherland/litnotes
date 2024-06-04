import React from 'react';

import { MDXEditor } from '@mdxeditor/editor';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  tablePlugin,
  codeMirrorPlugin
} from '@mdxeditor/editor';
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  Button,
  InsertCodeBlock,
  InsertTable,
  Separator
} from '@mdxeditor/editor';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditorPanel = ({
  index,
  tabText,
  tabSource,
  tabType,
  visible,
  addAlert
}) => {

  const editorRef = React.useRef(null);
  const [content, setContent] = React.useState({ state: 'new', body: '# Content loading\n\nPlease wait...' });

  React.useEffect(() => {
    const getFile = async () => {
      try {
        const fileBuffer = await window.electronAPI.loadFile(tabSource);
        const fileText = new TextDecoder().decode(fileBuffer);
        setContent({ state: 'loaded', body: fileText });
      } catch (e) {
        addAlert("Could not open file '"+tabSource+"'");
      }
    };

    if (tabSource) {
      getFile(); // TODO: uncaught exception when file doesn't exist (open tab and file removed)
    }
  }, [tabSource]);

  React.useEffect(() => {
    if (editorRef.current) {
      console.log("Setting content", content.body.length);
      editorRef.current.setMarkdown(content.body);
    }
  }, [content]);

  const handleOnBlur = (_event, _value) => {
    // console.log("On Blur", _event, _value);
    // TODO: possibly save immediately? (cancel debounce)
  }

  const handleOnChange = (_event, _value) => {
    // TODO: possibly debounce to save?
  }

  const handleOnFocus = (_event, _value) => {
    // This doesn't evern seem to be called...
    // console.log("On Focus", _event, _value);
  }

  const handleSave = (index) => {
    console.log("handleSave", index);
  }

  const handleClose = (index) => {
    console.log("handleClose", index);
  }

  const EditorToolbar = () => {
    return (
      <>
        <UndoRedo />
        <BoldItalicUnderlineToggles />
        <CreateLink />
        <InsertCodeBlock />
        <InsertTable />
        <Separator />
        <Button onClick={() => { handleSave(index) }}>
          <Typography>Save</Typography>
        </Button>
        <Button onClick={() => { handleClose(index) }}>
          <Typography>Close</Typography>
        </Button>
      </>
    );
  }

  return (
    <div
      hidden={index !== visible}
    >
      {index === visible && tabType === ".md" && (
        <Box>
          <MDXEditor
            markdown={content.body}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              linkDialogPlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
              tablePlugin(),
              codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', rb: 'Ruby' } }),
              toolbarPlugin({ toolbarContents: EditorToolbar })
            ]}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            handleSave={handleSave}
            handleClose={handleClose}
            ref={editorRef} />
        </Box>
      )}
      {index === visible && tabType !== ".md" && (
        <Box sx={{ padding: 2 }}>
          {tabType === null && (
            <Typography>{tabText}</Typography>
          )}
          {tabType !== null && (
            <Typography>Cowardly refusing to handle a file that's not apparently Markdown.</Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default EditorPanel;
