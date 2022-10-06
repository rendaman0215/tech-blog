import type { NextPage } from 'next'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

export const custom404:NextPage = () => {
  return (
    <Layout>
      <h1 className={utilStyles.headingMd}>ページが見つかりませんでした</h1>
    </Layout>
  )
}

export default custom404;