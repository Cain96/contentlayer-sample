import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import { Processor } from "unified";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    author: {
      type: "string",
      description: "The author of the post",
      required: true,
    },
    category: {
      type: "string",
      description: "The category of the post",
      required: true,
    },
    tags: { type: "list", default: [], of: { type: "string" } },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  markdown: (builder: Processor) => {
    builder
      .use(remarkFrontmatter)
      .use(remarkParse)
      .use(remarkGfm)
      .use(remark2rehype, { allowDangerousHtml: true, footnoteLabel: "脚注", footnoteBackLabel: "戻る" })
      .use(rehypeStringify, { allowDangerousHtml: true });
  },
});
