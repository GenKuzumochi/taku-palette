import { H3 } from '@blueprintjs/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { Loader } from '../component/Loader'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>たくぱれっと</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <H3>たくぱれっと</H3>
        <Loader />


      </main>

      <footer className={styles.footer}>
        powerd by GenKuzumochi
      </footer>
    </div>
  )
}

export default Home
