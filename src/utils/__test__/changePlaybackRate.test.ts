import { changePlaybackRate } from '../changePlaybackRate';

describe('changePlaybackRate', () => {
  let video: HTMLVideoElement | null;
  let initialPlaybackRate: number | bigint;
  beforeEach(() => {
    video = document.createElement('video');
    initialPlaybackRate = video?.playbackRate;
  });

  afterEach(() => {
    video = null;
  });

  it('should speed up playback rate when SPEED_UP key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: '1' });

    if (video) {
      changePlaybackRate(event, video);
    }

    expect(video?.playbackRate).toBeGreaterThan(initialPlaybackRate);
  });

  it('should slow down playback rate when SLOW_DOWN key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: '0' });

    if (video) {
      changePlaybackRate(event, video);
    }

    expect(video?.playbackRate).toBeLessThan(initialPlaybackRate);
  });

  it('should not change playback rate when a key other than SPEED_UP or SLOW_DOWN is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    if (video) {
      changePlaybackRate(event, video);
    }

    expect(video?.playbackRate).toEqual(initialPlaybackRate);
  });
});
