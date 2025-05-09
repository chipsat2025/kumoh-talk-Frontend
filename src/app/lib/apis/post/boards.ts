import type { PostBoards, PatchBoards } from '@/app/lib/types/post/boards';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
};

export const postDraft = ({
  title,
  contents,
  categoryName,
  boardType,
  boardHeadImageUrl,
}: PostBoards) => {
  return _fetch(
    `${baseUrl}/boards`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      title,
      contents,
      categoryName,
      boardType,
      boardHeadImageUrl,
    }
  );
};

export const updateDraft = ({
  id,
  title,
  contents,
  categoryName,
  boardHeadImageUrl,
}: PatchBoards) => {
  return _fetch(
    `${baseUrl}/boards`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      id,
      title,
      contents,
      categoryName,
      boardHeadImageUrl,
      isPublished: false,
    }
  );
};

export const patchDraft = ({
  id,
  title,
  contents,
  categoryName,
  boardHeadImageUrl,
}: PatchBoards) => {
  return _fetch(
    `${baseUrl}/boards`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      id,
      title,
      contents,
      categoryName,
      boardHeadImageUrl,
      isPublished: true,
    }
  );
};

export const getBoard = (boardId: number) => {
  return _fetch(`${baseUrl}/boards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const deleteBoard = (boardId: number) => {
  return _fetch(`${baseUrl}/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getMyDrafts = (
  page: number = 1,
  size: number = 10,
  sort: string = 'updatedAt,DESC'
) => {
  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  return _fetch(`${baseUrl}/boards/draft?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
