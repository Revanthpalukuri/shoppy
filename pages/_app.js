import '../styles/globals.css'
import React from 'react'
import Toaster from 'react-hot-toast'

import Layout from '../components/Layout'
import { StateContext } from '../context/stateContext'
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
        <Layout >
          <Component {...pageProps} /> 
          {/* ippudu ee component ni manam layout lo children ga vadachu */}
        </Layout>
    </StateContext>
  )
}

export default MyApp
