import { H3 } from '@blueprintjs/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { Loader } from '../component/Loader'
import styles from '../styles/Home.module.css'
import {css} from "@emotion/react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>たくぱれっと</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3 css={css`text-align: center;`}>たくぱれっと</h3>
      <main className={styles.main}>
        <Loader />
      </main>

      <footer className={styles.footer}>
        @GenKuzumochi
        <a href="https://github.com/GenKuzumochi/taku-palette/releases">Release Note @GitHub</a>
      </footer>
    </div>
  )
}

export default Home
