import { changePlaybackRate } from '../utils/changePlaybackRate';

describe('changePlaybackRate', () => {
  let video: HTMLVideoElement | null;

  beforeEach(() => {
    video = document.createElement('video');
  });

  afterEach(() => {
    video = null;
  });

  it('should speed up playback rate when SPEED_UP key is pressed', () => {
    // Arrange
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const initialPlaybackRate = video?.playbackRate;
    // Act
    if (video) {
      changePlaybackRate(event, video);
    }

    // Assert
    if (initialPlaybackRate) {
      expect(video?.playbackRate).toBeGreaterThan(initialPlaybackRate);
    }
  });

  it('should slow down playback rate when SLOW_DOWN key is pressed', () => {
    // Arrange
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const initialPlaybackRate = video?.playbackRate;

    // Act
    if (video) {
      changePlaybackRate(event, video);
    }

    // Assert

    if (initialPlaybackRate) {
      expect(video?.playbackRate).toBeLessThan(initialPlaybackRate);
    }
  });

  it('should not change playback rate when a key other than SPEED_UP or SLOW_DOWN is pressed', () => {
    // Arrange
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const initialPlaybackRate = video?.playbackRate;

    // Act
    if (video) {
      changePlaybackRate(event, video);
    }

    // Assert
    expect(video?.playbackRate).toEqual(initialPlaybackRate);
  });
});
