import { Input, message, Upload } from 'antd';
import { default as React, FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getApiBase, getMaxUploadSize } from '../../../../env';
import { additionalRequestHeaders } from '..';

import styles from './video.module.scss';
import VideoJsPlayer from './VideoJsPlayer';
import { RcFile } from 'antd/lib/upload/interface';
import { humanFileSize } from '../../../../utils';

interface VideoData {
  link: string | null,
  title: string,
}

interface IProps {
  data: VideoData,
  onDataChange: (data: VideoData) => void,
  readOnly: boolean,
}

const playbackRates = [ 0.75, 1, 1.25, 1.5, 1.75, 2 ];

export const VideoPlayer: FC<IProps> = (
  {
    data: { title, link },
    onDataChange,
    readOnly,
  },
) => {
  const videoJsRef = useRef<any | null>(null);
  const [ showVideo, setShowVideo ] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowVideo(true), 100);
  }, []);

  return (link || readOnly) ? (
    <div>
      <div className={styles.videoContainer}>
        {showVideo && (
          <VideoJsPlayer
            controls
            src={link || ''}
            playbackRates={playbackRates}
            onReady={(player: any) => {
              player.fluid(true);
              videoJsRef.current = player;
              player.hlsQualitySelector({
                displayCurrentQuality: true,
              });
            }}
            // onPlay={this.onVideoPlay.bind(this)}
            // onPause={this.onVideoPause.bind(this)}
            // onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
            // onSeeking={this.onVideoSeeking.bind(this)}
            // onSeeked={this.onVideoSeeked.bind(this)}
            // onEnd={this.onVideoEnd.bind(this)}
          />
        )}
      </div>

      {readOnly ? title : (
        <Input
          value={title}
          onChange={e => onDataChange({ title: e.target.value, link })}
          onPressEnter={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        />
      )}
    </div>
  ) : (
    <Upload.Dragger
      name="file"
      accept="video/*"
      multiple={false}
      maxCount={1}
      action={`${getApiBase()}/api/editorjs/uploadVideo`}
      headers={additionalRequestHeaders}
      beforeUpload={(file) => {
        const maxUploadSize = getMaxUploadSize();
        if (file.size > maxUploadSize) {
          message.error(`Размер файла для загрузки не должен превышать ${humanFileSize(maxUploadSize)}`);
          throw 'Превышен размер файла для загрузки.';
        }
      }}
      onChange={(info) => {
        const { status } = info.file;
        if (status === 'done') {
          const { success, file: { url } } = info.file.response;
          if (success !== 1 || !url) {
            message.error(`${info.file.name} - ошибка загрузки.`);
            return;
          }
          onDataChange({ title, link: url });
          message.success(`${info.file.name} - загружен.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} - ошибка загрузки.`);
        }
      }}
      onDrop={(e) => {
        console.log('Dropped files', e.dataTransfer.files);
      }}
    >
      <div className="ant-upload-text">
        Кликните, или положите видео в эту зону для загрузки
      </div>
    </Upload.Dragger>
  );
};


export default class Video {
  static get toolbox() {
    return {
      icon: `
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style="fill: none"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>`,
      title: 'Video',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  api: any;
  readOnly: boolean = false;
  data: VideoData = {
    title: 'Заголовок',
    link: null,
  };
  rootClassname: string = 'collapse-tool';
  holderNode: Element | undefined;

  constructor({ data, config, api, readOnly }: any) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = data;
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
      <VideoPlayer
        onDataChange={newData => {
          this.data = newData;
          this.renderReact();
        }}
        readOnly={this.readOnly}
        data={this.data}
      />,
      this.holderNode,
    );
  }

  save() {
    return this.data;
  }
}
