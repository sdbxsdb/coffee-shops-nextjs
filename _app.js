import "../styles/globals.css";
import StoreProvider from '../store/store-context'

function MyApp({ Component, pageProps }) {
  return (
    <div className="px-12">
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
