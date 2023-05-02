import { VideoPlayerKeys } from './constants';

export function changePlaybackRate(
  event: KeyboardEvent,
  video: HTMLVideoElement,
) {
  switch (event.key) {
    case VideoPlayerKeys.SPEED_UP:
      video.playbackRate += VideoPlayerKeys.SPEED_UP_STEP;
      break;

    case VideoPlayerKeys.SLOW_DOWN:
      video.playbackRate -= VideoPlayerKeys.SLOW_DOWN_STEP;
      break;

    default:
      break;
  }
}
