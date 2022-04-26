import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="px-12 pb-12">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
