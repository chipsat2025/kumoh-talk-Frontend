import clsx from 'clsx';
import { NodeViewWrapper } from '@tiptap/react';
import AlignLeftSvg from '@/app/assets/svg/Editor/AlignLeftSvg';
import AlignCenterSvg from '@/app/assets/svg/Editor/AlignCenterSvg';
import AlignRightSvg from '@/app/assets/svg/Editor/AlignRightSvg';
import type { NodeViewProps } from '@tiptap/react';
import styles from './ImageComponent.module.scss';

const ImageComponent = ({
  node,
  selected,
  updateAttributes,
}: NodeViewProps) => {
  const { src, alt, title, width, height, margin } = node.attrs;
  const containerStyle = { width, height, margin };

  const AlignController = () => {
    return (
      <div className={styles.alignController}>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 auto 0 0' })}
        >
          <AlignLeftSvg />
        </button>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 auto' })}
        >
          <AlignCenterSvg />
        </button>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 0 0 auto' })}
        >
          <AlignRightSvg />
        </button>
      </div>
    );
  };

  const resizeHandler = (
    mouseDownEvent: React.MouseEvent<HTMLImageElement>
  ) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      `.${styles.wrapper}`
    );

    const image = parent?.querySelector(`.${styles.postimage}`) ?? null;

    if (image === null) return;

    const startSize = { x: image.clientWidth, y: image.clientHeight };
    const aspectRatio = startSize.x / startSize.y;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidth = startSize.x - startPosition.x + mouseMoveEvent.pageX;

      updateAttributes({
        width: newWidth,
        height: newWidth / aspectRatio,
      });
    };

    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <NodeViewWrapper
      className={clsx(styles.wrapper, { [styles.selected]: selected })}
    >
      <figure className={styles.container} style={containerStyle}>
        {selected && <AlignController />}

        <div className={styles.imageWrapper}>
          <img className={styles.postimage} src={src} alt={alt} title={title} />
          <div className={styles.resizeTrigger} onMouseDown={resizeHandler}>
            <div className={styles.resizeHandle} />
          </div>
        </div>
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
