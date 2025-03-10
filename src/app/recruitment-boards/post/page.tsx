import Header from '@/app/components/common/header/Header';
import Tabs from '@/app/components/recruitment-boards/post/Tabs';
import { TabsProvider } from '@/app/components/recruitment-boards/post/TabsProvider';
import styles from './page.module.scss';
import PostForm from '@/app/components/recruitment-boards/post/PostForm';
import { PostProvider } from '@/app/components/recruitment-boards/post/PostProvider';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default function Page() {
  if (!cookies().get('accessToken')) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header title="모집글 작성" />
      <TabsProvider>
        <Tabs />
        <div className={styles.form}>
          <PostProvider>
            <PostForm />
          </PostProvider>
        </div>
      </TabsProvider>
    </div>
  );
}
