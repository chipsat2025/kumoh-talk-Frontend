import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import RecruitmentBoardContent from '@/app/components/recruitment-boards/detail/RecruitmentBoardContent';
import dayjs from 'dayjs';
import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import ApplyButton from '@/app/components/recruitment-boards/detail/ApplyButton';
import ModifyButton from '@/app/components/recruitment-boards/detail/ModifyButton';
import CheckApplicantButton from '@/app/components/recruitment-boards/detail/CheckApplicantButton';
import styles from '@/app/recruitment-boards/detail/page.module.scss';
import { cookies } from 'next/headers';
import { parseJwt } from '@/app/lib/apis/auth';
import DeleteButton from './DeleteButton';

export default function RecruitmentBoardDetail({
  boardDetail,
  userId,
  writerUserId,
  boardId,
}: {
  boardDetail: RecruitmentBoardsApi;
  userId: number;
  writerUserId: number;
  boardId: string;
}) {
  const token = cookies().get('accessToken')?.value;
  const jwt = token ? parseJwt(token) : null;
  const { success, data } = boardDetail;

  if (!data.title) {
    return <p>Loading...</p>;
  }

  const buttonBlock = (
    <div className={styles.buttonBlock}>
      {userId === writerUserId ? (
        <>
          <ModifyButton />
          <CheckApplicantButton
            id={boardId}
            title={boardDetail.data.title}
            boardType={boardDetail.data.type}
            tag={boardDetail.data.tag}
            name={boardDetail.data.host}
          />
          <DeleteButton recruitmentBoardId={boardId} />
        </>
      ) : (
        <ApplyButton
          title={boardDetail.data.title}
          detail={boardDetail.data.summary}
          tag={boardDetail.data.tag}
          userRole={jwt && jwt.USER_ROLE}
        />
      )}
    </div>
  );

  return (
    <main>
      <RecruitmentBoardTitle
        title={data.title}
        type={data.type}
        tag={data.tag}
        name={data.host}
      />
      <RecruitmentBoardContent
        target={data.recruitmentTarget}
        recruitmentNum={data.recruitmentNum}
        recruitmentStart={dayjs(data.recruitmentStart).format('YYYY.MM.DD')}
        recruitmentDeadline={dayjs(data.recruitmentDeadline).format(
          'YYYY.MM.DD'
        )}
        activity={data.activityCycle}
        activityStart={dayjs(data.activityStart).format('YYYY.MM.DD')}
        activityFinish={dayjs(data.activityFinish).format('YYYY.MM.DD')}
        detail={data.content}
        buttonBlock={buttonBlock}
      />
    </main>
  );
}
