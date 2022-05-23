import React, { Component } from 'react';
import videojs from 'video.js';
import cn from 'classnames';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

interface Props {
  src: string,
  poster: string,
  controls?: boolean,
  autoplay?: boolean,
  preload?: 'auto' | 'none' | 'metadata',
  width?: string | number,
  height?: string | number,
  hideControls: string[],
  bigPlayButton?: boolean,
  bigPlayButtonCentered?: boolean,
  onReady: Function,
  onPlay: Function,
  onPause: Function,
  onTimeUpdate: Function,
  onSeeking: Function,
  onSeeked: Function,
  onEnd: Function,
  playbackRates?: number[],
  hidePlaybackRates?: boolean,
  className?: string,
}

let uniqueIndex = 0;

class VideoJsPlayer extends Component<Props> {
  static defaultProps = {
    src: '',
    poster: '',
    controls: true,
    autoplay: false,
    preload: 'auto',
    playbackRates: [ 0.5, 1, 1.5, 2 ],
    hidePlaybackRates: false,
    className: '',
    hideControls: [],
    bigPlayButton: true,
    bigPlayButtonCentered: true,
    onReady: () => {
    },
    onPlay: () => {
    },
    onPause: () => {
    },
    onTimeUpdate: () => {
    },
    onSeeking: () => {
    },
    onSeeked: () => {
    },
    onEnd: () => {
    },
  };


  playerId = `video-player-${uniqueIndex++}`;
  player: videojs.Player | null = null;

  componentDidMount() {
    const { props } = this;
    this.initPlayer(props);

    // init player events
    let currentTime = 0;
    let previousTime = 0;
    let position = 0;
    const { player } = this;
    if (player) {
      player.ready(() => {
        props.onReady(player);
      });
      player.on('play', () => {
        props.onPlay(player.currentTime());
      });
      player.on('pause', () => {
        props.onPause(player.currentTime());
      });
      player.on('timeupdate', (e) => {
        props.onTimeUpdate(player.currentTime());
        previousTime = currentTime;
        currentTime = player.currentTime();
        if (previousTime < currentTime) {
          position = previousTime;
          previousTime = currentTime;
        }
      });
      player.on('seeking', () => {
        player.off('timeupdate', () => {
        });
        player.one('seeked', () => {
        });
        props.onSeeking(player.currentTime());
      });
      player.on('seeked', () => {
        let completeTime = Math.floor(player.currentTime());
        props.onSeeked(position, completeTime);
      });
      player.on('ended', () => {
        props.onEnd();
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setControlsVisibility(this.player, nextProps.hideControls);
    if (this.props.src !== nextProps.src) {
      this.initPlayer(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.player) this.player.dispose();
  }

  initPlayer(props: Props) {
    const {
      controls,
      autoplay,
      preload,
      width = 500,
      height = 300,
      bigPlayButton,
      playbackRates,
    } = props;
    const hidePlaybackRates = props.hidePlaybackRates || props.hideControls.includes('playbackrates');
    const playerOptions = {
      controls,
      autoplay,
      preload,
      width: Number(width),
      height: Number(height),
      bigPlayButton,
      playbackRates: hidePlaybackRates ? undefined : playbackRates,
    };
    const element = document.querySelector(`#${this.playerId}`);
    if (element) {
      this.player = videojs(element, playerOptions);
      this.player.src(props.src);
      this.player.poster(props.poster);
      this.setControlsVisibility(this.player, props.hideControls);
    }
  }

  setControlsVisibility(player: videojs.Player | null, hiddenControls: string[]) {
    if (player) {
      const Controls = {
        play: 'playToggle',
        volume: 'volumePanel',
        seekbar: 'progressControl',
        timer: 'remainingTimeDisplay',
        playbackrates: 'playbackRateMenuButton',
        fullscreen: 'fullscreenToggle',
      };
      Object.keys(Controls).map(x => {
        //@ts-ignore
        player.controlBar[Controls[x]].show();
      });
      hiddenControls.map(x => {
        //@ts-ignore
        player.controlBar[Controls[x]].hide();
      });
    }
  }

  render() {
    return (
      <video
        id={this.playerId}
        className={cn([
          'video-js',
          this.props.bigPlayButtonCentered && 'vjs-big-play-centered',
          this.props.className,
        ])}
      />
    );
  }
}

export default VideoJsPlayer;
