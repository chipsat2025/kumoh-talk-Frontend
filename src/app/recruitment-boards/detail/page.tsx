import styles from './page.module.scss';
import ApplyButton from '@/app/components/recruitment-boards/detail/ApplyButton';
import ModifyButton from '@/app/components/recruitment-boards/detail/ModifyButton';
import Comment from '@/app/components/common/comment/CommentComponent';
import { Suspense } from 'react';
import RecruitmentBoardDetail from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetail';
import CheckApplicantButton from '@/app/components/recruitment-boards/detail/CheckApplicantButton';
import { RecruitmentBoardDetailProvider } from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import {
  getRecruitmentBoardDetail,
  matchRecruitmentTitle,
} from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; boardType: string };
}) {
  const title = matchRecruitmentTitle(searchParams.boardType);

  const response = await getRecruitmentBoardDetail(searchParams.id);
  const boardDetail: RecruitmentBoardsApi = await response.json();

  return (
    <>
      <Header title={title} />
      <main className={styles.board}>
        <RecruitmentBoardDetailProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <RecruitmentBoardDetail boardDetail={boardDetail} />
          </Suspense>
          <div className={styles.buttonBlock}>
            <ApplyButton />
            <ModifyButton />
            <CheckApplicantButton />
          </div>
          <Comment />
        </RecruitmentBoardDetailProvider>
      </main>
      <Footer />
    </>
  );
}
