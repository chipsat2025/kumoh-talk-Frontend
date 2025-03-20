import type { Editor } from '@tiptap/react';

const CUSTOM_NODE = {
  IMAGE: 'customImage',
  ATTACH: 'fileNode',
};

const includesCustomNode = (editor: Editor) => {
  let includes = false;

  editor.state.doc.descendants((node) => {
    if (node.type.name === CUSTOM_NODE.IMAGE) {
      includes = true;
    }
  });

  return includes;
};

const findImageNodes = (editor: Editor) => {
  const imageNodes: Array<any> = [];

  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === CUSTOM_NODE.IMAGE &&
      node.attrs.src.startsWith('data:image')
    ) {
      imageNodes.push({ node, pos });
    }
  });

  return imageNodes;
};

const findAttachNodes = (editor: Editor) => {
  const attachNodes: Array<any> = [];

  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === CUSTOM_NODE.ATTACH &&
      node.attrs.fileUrl.startsWith('blob:')
    ) {
      attachNodes.push({ node, pos });
    }
  });

  return attachNodes;
};

const convertBase64ToFile = (base64: string, fileName: string): File => {
  const [header, data] = base64.split(',');
  const mimeMatch = header.match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('유효하지 않은 Base64 데이터입니다.');
  }

  const mime = mimeMatch[1];
  const bstr = atob(data);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], fileName, { type: mime });
};

const extractFilesFromImageNodes = (imageNodes: Array<any>): File[] => {
  return imageNodes.map(({ node }) => {
    const src = node.attrs.src;
    const fileName = node.attrs.title;

    return convertBase64ToFile(src, fileName);
  });
};

const replaceUrls = (
  serializedHTML: string,
  imageNodes: Array<any>,
  presignedUrls: string[]
) => {
  let replacedHTML = serializedHTML;

  imageNodes.forEach((node, index) => {
    const oldSrc = node.node.attrs.src;
    const newSrc = presignedUrls[index].split('?')[0];

    replacedHTML = replacedHTML.replace(oldSrc, newSrc);
  });

  return replacedHTML;
};

export {
  includesCustomNode,
  findImageNodes,
  findAttachNodes,
  extractFilesFromImageNodes,
  replaceUrls,
};
