import type { NextPage } from 'next'
import Link from 'next/link'

import Layout from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

type PostData = {
  title: string
  date: string
  blogContentHTML: string
}

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

// SSGの場合
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    }
  };
}

export const Post: NextPage = ({postData}) => {
  return ( 
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}} />
      </article>
      <Link href="/">
        <a className={utilStyles.backHome}>
          ← ホームへ戻る
        </a>
      </Link>
    </Layout>
  )
}

export default Post
