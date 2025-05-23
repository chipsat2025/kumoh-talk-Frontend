'use client';

import clsx from 'clsx';
import GithubSvg from '@/app/assets/svg/social/GithubSvg';
import GoogleSvg from '@/app/assets/svg/social/GoogleSvg';
import KakaoSvg from '@/app/assets/svg/social/KakaoSvg';
import NaverSvg from '@/app/assets/svg/social/NaverSvg';
import BasicBubble from '../../../../basicBubble/BasicBubble';
import CloseButton from './CloseButton';
import styles from './loginBubble.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMediaQueryMobileHeader } from '@/app/lib/hooks/useMediaQueryMobileHeader';
import Image from 'next/image';
export interface Props {
  className: string;
  onClose: () => void;
}

const logins = [
  // {
  //   name: 'google',
  //   className: styles.google,
  //   svg: GoogleSvg,
  // },
  {
    name: 'github',
    className: styles.github,
    svg: GithubSvg,
  },
  {
    name: 'kakao',
    className: styles.kakao,
    svg: KakaoSvg,
  },
  {
    name: 'naver',
    className: styles.naver,
    svg: NaverSvg,
  },
];

export default function LoginBubble({ className, onClose }: Props) {
  const isMobileHeader = useMediaQueryMobileHeader();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}${
    searchParams.toString() ? '?' + searchParams.toString() : ''
  }`;

  const loginButtons = logins.map((login) => (
    <a
      key={login.name}
      href={`${process.env.NEXT_PUBLIC_API_URL}/api/users/oauth2/${
        login.name
      }?redirect-uri=${encodeURIComponent(currentUrl)}&mode=login`}
      className={clsx(styles.loginButton, login.className)}
    >
      <login.svg />
    </a>
  ));

  return (
    <BasicBubble
      direction={isMobileHeader ? 'top-end' : 'right-start'}
      className={clsx(className, styles.loginBubble)}
    >
      <CloseButton onClick={onClose} />
      <section className={styles.content}>
        <Image
          className={styles.logo}
          src='/images/logo_dark_2x.webp'
          alt='금오톡 로고'
          width={40}
          height={40}
        />
        <div className={styles.line}></div>
        <div className={styles.socialWrapper}>{loginButtons}</div>
      </section>
    </BasicBubble>
  );
}
