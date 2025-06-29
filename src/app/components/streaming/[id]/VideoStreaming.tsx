'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import styles from './videoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';
import Caption from './Caption';
import SubVideoStreaming from './SubVideoStreaming';
import { SideTabContext } from './SideTabProvider';

interface Props {
  camUrl: string;
  slideUrl: string;
}

export default function VideoStreaming({ camUrl, slideUrl }: Props) {
  const [mainScreenUrl, setMainScreenUrl] = useState(slideUrl);
  const [subScreenUrl, setSubScreenUrl] = useState(camUrl);
  const { isSubVideoVisible } = useContext(SideTabContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          liveSyncDuration: 5,
          startPosition: -5,
        });
        hls.loadSource(mainScreenUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
          // data.details.totalduration: 해당 레벨(quality)의 전체 길이(초 단위)
          // (VOD인 경우 유한한 숫자로, 라이브인 경우 Infinity로 나옴)
          const total = data.details.totalduration;
          console.log('HLS LEVEL_LOADED totalduration:', total);
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = mainScreenUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [mainScreenUrl]);

  return (
    <div className={styles.streamingVideo}>
      <div className={styles.overlay}>
        <div className={styles.top}>
          {isSubVideoVisible && (
            <SubVideoStreaming
              mainScreenUrl={mainScreenUrl}
              subScreenUrl={subScreenUrl}
              setMainScreenUrl={setMainScreenUrl}
              setSubScreenUrl={setSubScreenUrl}
            />
          )}
        </div>
        <Caption />
      </div>
      <video ref={videoRef} className={styles.videoPlayer} muted />
    </div>
  );
}
