/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import axios from 'axios'
import convert from 'xml-js'
import { failFetchNews, startFetchNews, successFetchNews } from '../reducers/news'
import { startFetchPrice, successFetchPrice, failFetchPrice, setCurPrice } from '../reducers/price'
import { RootState } from '../store'


export const fetchPriceData = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const priceState = getState().price

    dispatch(startFetchPrice())

    axios.get('https://index-api.bitcoin.com/api/v0/cash/history').then(res => {
      if (res.status === 200) {
        const transformedData = res.data.map((priceData: any[]) => ({ price: priceData[1], date: priceData[0] })).slice(0,priceState.graphDays).reverse()
        dispatch(successFetchPrice({data: transformedData}))
      } else {
        dispatch(failFetchPrice())
      }
    }).catch(err => {
      console.log(err)
      dispatch(failFetchPrice())
    })
  }

export const fetchCurPriceData = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    axios.get('https://index-api.bitcoin.com/api/v0/cash/price/usd').then(res => {
      if (res.status === 200) {
        const data = res.data
        dispatch(setCurPrice({curPrice: data}))
      }
    }).catch(err => {
      console.log(err)
    })
  }

export const fetchNewsData = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(startFetchNews())

    axios.get('https://news.bitcoin.com/feed/').then(res => {
      const newsData: any = convert.xml2js(res.data, {compact: true})
    
      if (res.status === 200) {
        dispatch(successFetchNews({data: newsData.rss.channel}))
      } else {
        dispatch(failFetchNews())
      }
    }).catch(err => {
      console.log(err)
      dispatch(failFetchNews())
    })
  }