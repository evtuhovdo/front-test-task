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
import Code from '@editorjs/code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Raw from '@editorjs/raw';
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
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// @ts-ignore
import AttachesTool from '@editorjs/attaches';

import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';
import { getApiBase } from '../../env';

const additionalRequestHeaders = { Authorization: '' };

// const filesToUpload = [];
// function uploadByFile(file: File) {
//   return new Promise((res, rej) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       filesToUpload.push({
//         file,
//         base64: reader.result,
//       })
//       console.log('file', file, reader.result);
//       res({
//         success: 1,
//         file: {
//           url: reader.result,
//           name: file.name,
//           title: file.name,
//           size: file.size,
//           extension: file.type.split('/')[1],
//         },
//       });
//     };
//   });
// };


export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      additionalRequestHeaders,
      // uploader: {
      //   uploadByFile,
      // },
      endpoints: {
        byFile: `${getApiBase()}/api/editorjs/uploadImage`, // Your backend file uploader endpoint
        byUrl: `${getApiBase()}/api/editorjs/fetchUrl`, // Your endpoint that provides uploading by Url
      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  // TODO: решить проблему с аттачами в ридонли
  // attaches: {
  //   class: AttachesTool,
  //   config: {
  //     additionalRequestHeaders,
  //     // uploader: {
  //     //   uploadByFile,
  //     // },
  //     endpoint: `${getApiBase()}/api/editorjs/uploadFile`,
  //   },
  // }
};

interface IEditorProps {
  readOnly?: boolean,
  data?: OutputData,
  onChange?: (data: OutputData) => void,
  // onSave: (data: OutputData) => void,
}

export const Editor: FC<IEditorProps> = ({
  readOnly = false,
  data ,
  onChange = d => {},
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
        // console.log('Article data: ', outputData);
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
};

export default observer(Editor);



