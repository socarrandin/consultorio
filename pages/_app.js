import { ApiProvider } from "context/ApiContext"

export default function App({ Component, pageProps }) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  )
}
