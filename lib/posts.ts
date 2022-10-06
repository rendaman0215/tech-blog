import path from "path";
import fs from "fs";
import matter from "gray-matter";
import mdToHTML from "../lib/mdToHTML";

const postsDirectory = path.join(process.cwd(), "posts")

type PostMetaData = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
}

type PostData = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  content: string;
}

/**
 * 記事のidとメタデータ一覧を返す
 */
export const getPostsData = ():PostMetaData[] => {
  const fileNames = getAllPostIds()
  const allArticleMetaData = fileNames.map((fileName) => {
    const id = trimMd(fileName)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const {data} = matterResult
    const {title, thumbnail, date} = data

    const postItem:PostMetaData = {
      id: id,
      title: title,
      thumbnail: thumbnail,
      date: date
    }

    // idとデータを返す
    return postItem;
  });
  return allArticleMetaData;
}

/**
 * 記事一覧を返す
 */
export const getAllPostIds = ():string[] => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
}

/**
 * タイトル一覧を返す
 */
export const listAllPostIds = ():string[] => {
  const fileNames = getAllPostIds();
  return fileNames.map((fileName) => {
    return trimMd(fileName)
  });    
}

/**
 * 拡張子(.md)をとる
 */
export const trimMd = (fileName:string):string => {
  return fileName.replace(/\.md$/, "")
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

  const item:PostData = {
    id: id,
    title: matterResult.data.title,
    thumbnail: matterResult.data.thumbnail,
    date: matterResult.data.date,
    content: blogContentHTML
  }

  return item;
}
