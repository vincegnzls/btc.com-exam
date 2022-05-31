import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'

import PriceChart from '../src/components/PriceChart'
import { GraphViewButton } from '../src/components/GraphViewButton'
import { fetchCurPriceData, fetchNewsData, fetchPriceData } from '../src/actions'
import { RootState } from '../src/store'
import { updateGraphDays } from '../src/reducers/price'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const fetching = useSelector((state: RootState) => state.price.fetching);
  const priceData = useSelector((state: RootState) => state.price.data);
  const graphDays = useSelector((state: RootState) => state.price.graphDays);
  const curPrice = useSelector((state: RootState) => state.price.curPrice);
  const newsData = useSelector((state: RootState) => state.news.data);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPriceData())
    dispatch(fetchCurPriceData())
    dispatch(fetchNewsData())
  }, [])

  useEffect(() => {
    dispatch(fetchPriceData())
  }, [graphDays])

  const renderNews = () => {
    if (newsData) {
      if (newsData.item.length) {
        const filteredNews = newsData.item.slice(0, 4)

        return filteredNews.map(news => (
          <div>
            <h2><Link href={news.link._text}><a target="_blank">{news.title._text}</a></Link></h2> Posted: {moment(news.pubDate._text).format('MMM DD, yyyy @ h:mm a')}
            <hr/>
          </div>
        ))
      }
    }

    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Bitcoin.com</title>
        <meta name="description" content="Real time price feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          BCH Current Price: ${curPrice.price.toFixed(2)}
        </h1>
      </main>

      <div className={styles.main}>
        {fetching ? <p>Loading data...</p> : priceData.length ? <PriceChart data={priceData} xDataKey="date" yDataKey="price" dataKey="price" /> : null}
        <div style={{paddingTop: '1rem'}}>
          <GraphViewButton text='24 Hours' backgroundColor='#0070f3' onClick={() => dispatch(updateGraphDays({graphDays: 2}))} />
          <GraphViewButton text='7 Days' backgroundColor='#0070f3' onClick={() => dispatch(updateGraphDays({graphDays: 7}))} />
          <GraphViewButton text='1 Month' backgroundColor='#0070f3' onClick={() => dispatch(updateGraphDays({graphDays: 30}))} />
        </div>
      </div>

      <section>
        <h1 className={styles.title}>
          {newsData ? newsData.title._text : null}
        </h1>
        {renderNews()}
      </section>
    </div>
  )
}

export default Home
