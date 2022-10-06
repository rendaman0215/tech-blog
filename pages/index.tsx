import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/posts'

type PostData = {
  id: string 
  title: string
  date: string
  thumbnail: string
}

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

const Home: NextPage = ({allPostsData}) => {
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
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                  src={`${thumbnail}`} 
                  className={styles.thumbnailImage}
                  alt=""
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{`${title}`} </a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {`${date}`} 
              </small>
            </article>
          ))}

        </div>
      </section>
    </Layout>
  )
}

export default Home
