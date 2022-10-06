import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/posts'

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: { allPostsData }
  };
}

const Home: NextPage<Props> = ({ allPostsData }) => {
  return ( 
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>
          サーバサイドエンジニア / GoとTypeScriptが好き / CTO@ryuzu.inc
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding5px}`}>
        <h2>Articles</h2>
        <div className={styles.grid}>
          {allPostsData.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <img 
                  src={`${post.thumbnail}`} 
                  className={styles.thumbnailImage}
                  alt=""
                />
              </Link>
              <Link href={`/posts/${post.id}`}>
                <a className={utilStyles.boldText}>{`${post.title}`} </a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {`${post.date}`} 
              </small>
            </article>
          ))}

        </div>
      </section>
    </Layout>
  )
}

export default Home
