import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'

import { ReactNode } from 'react';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

type Props = {
  children?: ReactNode;
};

const name = "rendaman.dev"
export const siteTitle = "Blog - rendaman.dev"

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
      </Head>

      <header className={styles.header}>
        <Image src="/images/profile.png" alt="rendaman0215" width="80" height="80" className={utilStyles.borderCircle}/>
        <Link href="/"><a><h1 className={`${utilStyles.headingXl} ${utilStyles.black}`} >{name}</h1></a></Link>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;