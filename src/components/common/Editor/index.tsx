import React, { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import EditorJS, { OutputData } from '@editorjs/editorjs';

// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import List from '@editorjs/list';
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
import AttachesTool from './attaches-feature-add-readonly-mode/dist/bundle';

import { useInstance } from 'react-ioc';
import { Store } from '../../../model/store/Store';
import { getApiBase } from '../../../env';

const additionalRequestHeaders = { Authorization: '' };

export const EDITOR_JS_TOOLS = {
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
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
  }
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

  useEffect(() => {
    additionalRequestHeaders.Authorization = `Bearer ${auth.token}`;

    // @ts-ignore
    editorCore.current = new EditorJS({
      readOnly,
      tools: EDITOR_JS_TOOLS,
      placeholder: 'Начните печатать тут',
      data,
      i18n: {
        // TODO: перевести на русский
        messages: {},
      },
      onChange: (api) => {
        // console.log('change', api.blocks)
        save();
        window.document // включает контролы у всех добавленных видео
          .querySelectorAll('#editorjs video')
          .forEach(e => {
            if (e.getAttribute('controls') !== 'true') e.setAttribute('controls', 'true')
          });
      },
    });

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



