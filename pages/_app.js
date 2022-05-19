import '../styles/globals.scss'
import Layout from '../components/Layout'
function MyApp({ Component, pageProps }) {
  return (
    <Layout className="font-body">
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp