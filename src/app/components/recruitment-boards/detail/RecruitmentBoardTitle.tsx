import styles from './recruitmentBoardTitle.module.scss';
import HashTag from '@/app/components/recruitment-boards/detail/HashTag';
import { RecruitmentTag } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export interface Props {
  title: string;
  type: RecruitmentTag;
  tag: RecruitmentTag;
  name?: string;
}
// TODO: 백엔드 api 완성되면 수정
export function RecruitmentBoardTitle({ title, type, tag, name }: Props) {
  return (
    <div className={styles.titleBlock}>
      <div className={styles.titleBlockWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tags}>
          <HashTag type={type} />
          <HashTag type={tag} />
        </div>
      </div>
      <div className={styles.host}>{name && `${name} 주최`}</div>
    </div>
  );
}
