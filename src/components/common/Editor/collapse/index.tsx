import { Collapse, Input } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { default as React, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


interface CollapseData {
  content: string | null,
  title: string,
}

const CollapseComponent = ({
  data: { title, content },
  onDataChange,
  readOnly,
}: {
  data: CollapseData,
  onDataChange: (data: CollapseData) => void,
  readOnly: boolean,
}) => {
  const editingDiv = useRef<HTMLDivElement | null>(null);
  function insertInnerHTML() {
    if (editingDiv.current) {
      editingDiv.current.innerHTML = content || '';
    }
  }
  useEffect(insertInnerHTML, []);

  return (
    <Collapse
      defaultActiveKey={readOnly ? [] : ['1']}
      // onChange={insertInnerHTML}
    >
      <CollapsePanel
        key="1"
        forceRender
        header={
          readOnly
            ? title
            : (
              <Input
                placeholder="Заголовок"
                value={title}
                onChange={e => onDataChange({ title: e.target.value, content })}
                onPressEnter={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
              />
            )
        }
      >
        <div
          contentEditable={!readOnly}
          ref={r => { editingDiv.current = r; }}
          style={{ padding: 5 }}
          onKeyDown={e => {
            if (['Enter', 'NumpadEnter','KeyV'].includes(e.code)) {
              e.stopPropagation();
            }
          }}
          onInput={e => {
            if (!readOnly) {
              onDataChange({ title, content: e.currentTarget.innerHTML })
            }
          }}
        />
      </CollapsePanel>
    </Collapse>
  );
}





export default class CollapseTool {
  static get toolbox() {
    return {
      icon: `
        <svg
          width="19"
          t="1575117780012"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4865"
          width="200"
          height="200"
        >
          <path
            d="M512 576l192 192H576v192H448v-192H320l192-192z m192-384H576V0H448v192H320l192 192 192-192z m256 128c0-35.2-28.8-64-64-64h-160l-64 64h192l-128 128h-448l-128-128h192l-64-64H128c-35.2 0-64 28.8-64 64l160 160L64 640c0 35.2 28.8 64 64 64h160l64-64h-192l128-128h448l128 128h-192l64 64H896c35.2 0 64-28.8 64-64l-160-160L960 320z"
            p-id="4866"
          ></path>
        </svg>`,
      title: 'Collapse',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  
  static get sanitize(){
    return {
      title: false,
      content: {
        div: true,
        p: true,
        b: true,
        a: true,
        i: true,
        mark: true,
        br: true,
      },
    }
  }

  api: any;
  readOnly: boolean = false;
  data: CollapseData = {
    title: '',
    content: '',
  };
  rootClassname: string = 'collapse-tool';
  holderNode: HTMLElement | undefined;

  constructor({ data, config, api, readOnly }: any) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = data || this.data;
  }

  render() {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.rootClassname);
    this.holderNode = rootNode;

    this.renderReact();

    return this.holderNode;
  }

  renderReact() {
    if (!this.holderNode) {
      return;
    }

    ReactDOM.render(
      <CollapseComponent
        onDataChange={newData => {
          this.data = newData;
          this.renderReact();
        }}
        readOnly={this.readOnly}
        data={this.data}
      />,
      this.holderNode
    );
  }

  save() {
    return this.data;
  }
}
