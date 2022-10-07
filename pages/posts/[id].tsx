import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'

import Layout from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { listAllPostIds, getPostData } from '../../lib/posts'

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const paths = listAllPostIds();
  return {
    paths: paths.map((path) => {
      return {
        params: {
          id: path,
        },
      };
    }),
    fallback: false,
  };
};

// SSGの場合
export async function getStaticProps({ params }:any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    }
  };
}

const Post: NextPage<Props> = ({postData}) => {
  return ( 
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.content}} />
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
