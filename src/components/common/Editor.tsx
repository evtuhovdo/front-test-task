import React, { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import EditorJS, { OutputData } from '@editorjs/editorjs';

// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import CheckList from '@editorjs/checklist';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// @ts-ignore
import AttachesTool from '@editorjs/attaches';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
// import * as LaTeX from 'editorjs-latex';
// @ts-ignore
import Button from 'editorjs-button';
// @ts-ignore
import Undo from 'editorjs-undo';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';

import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';
import { getApiBase } from '../../env';

const additionalRequestHeaders = { Authorization: '' };

export const EDITOR_JS_TOOLS = {
  // paragraph: Paragraph,
  table: Table,
  list: {
    class: NestedList,
    inlineToolbar: true,
  },
  warning: Warning,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      types: '*/*',
      additionalRequestHeaders,
      endpoints: {
        byFile: `${getApiBase()}/api/editorjs/uploadImage`,
        byUrl: `${getApiBase()}/api/editorjs/fetchUrl`,
      },
    }
  },
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  simpleImage: SimpleImage,
  attaches: {
    class: AttachesTool,
    config: {
      additionalRequestHeaders,
      endpoint: `${getApiBase()}/api/editorjs/uploadFile`,
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        vimeo: true,
      }
    }
  },
  button: {
    class: Button,
    inlineToolbar: false,
    config:{
      css:{
        // "btnColor": "btn--gray",
      }
    }
  },
  // math: {
  //   // @ts-ignore
  //   class: window.EJLaTeX,
  //   shortcut: 'CMD+SHIFT+M'
  // }
};

interface IEditorProps {
  readOnly?: boolean,
  data?: OutputData,
  onChange?: (data: OutputData) => void,
  // onSave: (data: OutputData) => void,
}

export const Editor: FC<IEditorProps> = observer(({
  readOnly = false,
  data ,
  onChange = (d: any) => {},
  // onSave,
}) => {
  const editorCore = React.useRef<EditorJS>(null);
  const { auth } = useInstance(Store);

  const save = () => {
    if (!editorCore.current) {
      return;
    }

    editorCore.current
      .save()
      .then((outputData) => {
        onChange(outputData)
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  function enableVideoControls() {
    window.document
      .querySelectorAll('#editorjs video')
      .forEach(e => {
        if (e.getAttribute('controls') !== 'true') e.setAttribute('controls', 'true')
      });
  } 

  useEffect(() => {
    additionalRequestHeaders.Authorization = `Bearer ${auth.token}`;

    const editor = new EditorJS({
      readOnly,
      tools: EDITOR_JS_TOOLS,
      placeholder: 'Начните печатать тут',
      data,
      i18n: {
        // TODO: перевести на русский
        messages: {
          tools: {
            button: {
              'Button Text': 'Текст кнопки',
              'Link Url': 'Ссылка',
              'Set': "Добавить",
              'Default Button': "По умолчанию",
            }
          }
        },
      },
      onChange: (api) => {
        console.log('change', api.blocks)
        save();
        enableVideoControls();
      },
      onReady: () => {
        enableVideoControls();
        if (!readOnly) {
          const undo = new Undo({ editor, maxLength: 100 });
          new DragDrop(editor);
          undo.initialize(data);
        }
      },
    });

    // @ts-ignore
    editorCore.current = editor;

    return () => {
      // https://www.walkthrough.so/pblc/snKICMzxzedr/codelab-integrating-editor-js-into-your-react-application?sn=2
      editorCore.current?.destroy();
      // @ts-ignore
      editorCore.current = null;
    }
  }, []);

  return <div id="editorjs"/>;
});

export default Editor;



