import { currentUser } from '@/lib/auth';

import { fetchMemos } from './fetcher';
import { MemoWidgetPresentation } from './presentation';

export const MemoWidgetContainer = async () => {
  const memos = await fetchMemos();
  const me = await currentUser();

  return (
    <MemoWidgetPresentation
      memos={memos}
      me={me}
    />
  );
};
