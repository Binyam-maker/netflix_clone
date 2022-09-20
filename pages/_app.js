import "../styles/globals.css";
import { wrapper } from "../store";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#f40612" />
      <Component {...pageProps} />

      {/* putting toastify in the root */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
