import React from 'react'
import PoolCard from '../PoolCardDetails/PoolCard'
import styles from '../../styles/Launchpad.module.css'
import { TokenEdit } from './TokenEdit'

export const HeroEditLaunch = ({ pool }: any) => {
  return (
    <section className={styles.HeroEditLaunch}>
        <div style={{flex:1}}><PoolCard pool={pool} /></div>
        <div style={{flex:1}}><TokenEdit pool={pool}/></div>
    </section>
  )
}
