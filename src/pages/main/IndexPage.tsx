import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import EditorJS from '@editorjs/editorjs';

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
      // additionalRequestHeaders:  '', TODO: отправлять заголовки аутентификации
      endpoints: {
        byFile: 'http://localhost:1337/api/editorjs/uploadImage', // Your backend file uploader endpoint
        byUrl: 'http://localhost:1337/api/editorjs/fetchUrl', // Your endpoint that provides uploading by Url
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
  attaches: {
    class: AttachesTool,
    config: {
      // additionalRequestHeaders: '' TODO: отправлять заголовки аутентификации
      endpoint: 'http://localhost:1337/api/editorjs/uploadFile'
    },
  }
};


const initialDataJson = '{"time":1650974341866,"blocks":[{"id":"BBHa20-5CK","type":"header","data":{"text":"Заголовок","level":1}},{"id":"0WU7jTvjuC","type":"paragraph","data":{"text":"Укажите время, с точностью до десятилетия, когда в России произошел Соляной бунт. "}},{"id":"kLH99TtKyv","type":"header","data":{"text":"Укажите одно любое событие из истории зарубежных стран, относящееся к этому же веку и десятилетию. Не следует указывать событие из истории международных отношений, одной из сторон которого была Россия.","level":2}},{"id":"1ihhzhMWxN","type":"quote","data":{"text":"Укажите одно любое событие из истории зарубежных стран, относящееся к этому же веку и десятилетию. Не следует указывать событие из истории международных отношений, одной из сторон которого была Россия.","caption":"Denis Evtukhov","alignment":"left"}},{"id":"kxItAEMTzV","type":"delimiter","data":{}},{"id":"vi-Ol0b1IB","type":"simpleImage","data":{"url":"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg","caption":"","withBorder":false,"withBackground":false,"stretched":false}},{"id":"z9eO2ae-M-","type":"code","data":{"code":"asdasd\\nasdasd\\nasd"}}],"version":"2.23.2"}';
const initialData = JSON.parse(initialDataJson);
const IndexPage: FC = () => {
  const editorCore = React.useRef<EditorJS>(null);

  const save = () => {
    if (!editorCore.current) {
      return;
    }

    editorCore.current
      .save()
      .then((outputData) => {
        console.log('Article data: ', outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  useEffect(() => {

  }, []);

  useEffect(() => {
    // @ts-ignore
    editorCore.current = new EditorJS({
      readOnly: false,
      tools: EDITOR_JS_TOOLS,
      placeholder: 'Начните печатать тут', // First Block placeholder
      data: initialData, // Data to render on Editor start
      i18n: {
        // TODO: перевести на русский
        messages: {},
      }, // Internalization config
      onChange: (api) => {
        save();
      },
    });
  }, []);

  return (
    <div>
      <div id="editorjs"/>
    </div>
  );
};

export default observer(IndexPage);



