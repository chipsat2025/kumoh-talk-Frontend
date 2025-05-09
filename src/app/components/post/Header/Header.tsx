'use client';

import { useState, useRef, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'es-toolkit';
import { toast } from 'react-toastify';
import Link from 'next/link';
import clsx from 'clsx';
import { useSaveDraft } from '@/app/lib/hooks/post/useSaveDraft';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import useClickOutside from '@/app/lib/hooks/common/useClickOutside';
import useAutoSave from '@/app/lib/hooks/post/useAutoSave';
import Image from 'next/image';
import Button from '../../common/button/Button';
import logo from '@/app/assets/png/logo.png';
import Draft from '../Draft/Draft';
import Publish from '../Publish/Publish';
import { MSG } from '@/app/lib/constants/post/board';
import styles from './Header.module.scss';

type ModalType = 'draft' | 'publish';

const Header = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { title } = usePostContent();
  const { lastSavedAt } = useAutoSave();

  useClickOutside(modalRef, () => setActiveModal(null));

  const handleClose = () => {
    setActiveModal(null);
  };

  const { saveDraft } = useSaveDraft(handleClose);
  const debouncedSubmitDraft = debounce(saveDraft, 200);

  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const confirmLeave = confirm(MSG.CONFIRM_LEAVE);

    if (confirmLeave) {
      router.push(href);
    }
  };

  const handlePublish = () => {
    if(title === ''){
      toast.warn('제목을 입력해주세요.');
      return;
    }

    setActiveModal('publish');
  }

  return (
    <>
      <div className={styles.header}>
        <Link href='/' onClick={(e) => handleNavigation(e, '/')}>
          <Image
            src={logo}
            alt='세미나 신청 이미지'
            width={32}
            height={32}
            priority
          />
        </Link>
        <div className={styles.buttonGroup}>
          {lastSavedAt && <span>{`자동 저장 완료 ${lastSavedAt}`}</span>}
          <div className={styles.draft}>
            <button
              className={styles.saveButton}
              onClick={debouncedSubmitDraft}
            >
              임시저장
            </button>
            <div className={styles.divider} />
            <button
              className={styles.listButton}
              onClick={() => setActiveModal('draft')}
            >
              임시 글
            </button>
          </div>
          <Button onClick={handlePublish}>게시하기</Button>
        </div>
      </div>
      <div className={clsx(styles.overlay, { [styles.show]: activeModal })}>
        <div
          className={clsx(styles.content, { [styles.show]: activeModal })}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.layer}>
            {activeModal === 'draft' ? (
              <Draft close={handleClose} />
            ) : (
              <Publish close={handleClose} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
