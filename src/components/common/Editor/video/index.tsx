import { Input, message, Tooltip, Upload } from 'antd';
import { default as React, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getApiBase } from '../../../../env';
import { additionalRequestHeaders } from '..';

import styles from './video.module.scss';
import VideoJsPlayer from './VideoJsPlayer';

interface VideoData {
  link: string | null,
  title: string,
}

export const VideoPlayer = ({
  data: { title, link },
  onDataChange,
  readOnly,
}: {
  data: VideoData,
  onDataChange: (data: VideoData) => void,
  readOnly: boolean,
}) => {
  const videoJsRef = useRef<any | null>(null);
  const [showVideo, setShowVideo] = useState(false);

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
            playbackRates={[0.75, 1, 1.25, 1.5, 1.75, 2]}
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
      action={`${getApiBase()}/api/editorjs/uploadImage`}
      headers={additionalRequestHeaders}
      onChange={(info) => {
        console.log('uploaded?', info);
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          onDataChange({ title, link: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' });
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      onDrop={(e) => {
        console.log('Dropped files', e.dataTransfer.files);
      }}
    >
      <div className="ant-upload-text">
        Кликните, или положьте видео в эту зону для загрузки
      </div>
    </Upload.Dragger>
  );
}


export default class Collapse {
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
      this.holderNode
    );
  }

  save() {
    return this.data;
  }
}
