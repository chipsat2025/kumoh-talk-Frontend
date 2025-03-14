import { NodeViewWrapper } from '@tiptap/react';
import Image from 'next/image';
import clsx from 'clsx';
import type { NodeViewProps } from '@tiptap/react';
import styles from './LinkPreviewComponent.module.scss';

export interface LinkPreviewInfo {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  requestedUrl: string;
  isLoading: boolean;
}

const LinkPreviewComponent = ({ node, selected }: NodeViewProps) => {
  const { ogImage, ogTitle, ogDescription, ogUrl, isLoading } =
    (node.attrs as LinkPreviewInfo) || {};

  return (
    <NodeViewWrapper>
      {isLoading ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonInfo}>
            <span className={styles.skeletonText} />
            <span className={styles.skeletonText} />
            <span className={styles.skeletonText} />
          </div>
        </div>
      ) : (
        <figure
          className={clsx(styles.linkPreviewContainer, {
            [styles.selected]: selected,
          })}
          draggable={true}
          data-drag-handle
        >
          <div className={styles.linkPreviewContent}>
            <div className={styles.ogImage}>
              <Image
                src={ogImage}
                alt={`${ogTitle}-image`}
                fill
                objectFit='cover'
              />
            </div>
            <div className={styles.ogInfo}>
              <span className={styles.ogTitle}>{ogTitle}</span>
              <span className={styles.ogDescription}>{ogDescription}</span>
              <span className={styles.ogUrl}>{ogUrl}</span>
            </div>
          </div>
        </figure>
      )}
    </NodeViewWrapper>
  );
};

export default LinkPreviewComponent;
