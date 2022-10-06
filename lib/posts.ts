import path from "path";
import fs from "fs";
import matter from "gray-matter";
import mdToHTML from "../lib/mdToHTML";

const postsDirectory = path.join(process.cwd(), "posts")

/**
 * 記事のidとメタデータ一覧を返す
 */
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterResult.data
    };
  });
  return allPostsData;
}

/**
 * 記事一覧を返す
 */
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "") //ファイル名(id)
      }
    }
  })
}

/**
 * idに紐づいた記事データを返す
 */
export const getPostData = async (id:string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  // mdをHTMLに変換
  const blogContent = await mdToHTML(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data
  };
}
