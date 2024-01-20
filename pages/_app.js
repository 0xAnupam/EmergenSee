import { AuthContextProvider } from "@/store/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import '../styles/try.css'
export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <PrimeReactProvider>
          <Head>
            <meta
              name="description"
              content=""
            />
            <meta
              name="keywords"
              content="ambulance, ai"
            />
            <meta name="author" content="Arindam Halder" />
            <title>AmbulanceAI</title>

            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content="AmbulanceAI" />
            <meta
              property="og:description"
              content=""
            />
            <meta property="og:url" content="" />
            <meta property="og:site_name" content="AmbulanceAI" />
            <meta property="og:image" itemProp="image" content="" />
            <link rel="canonical" href="" />
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            <link rel="icon" type="image/x-icon" href="/favicon.png" />
            <link rel="manifest" href="manifest.json" />
          </Head>

          <ConfirmDialog />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Define default options
              className: "",
              style: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: ".9rem",
              },
              duration: 3000,
            }}
          />
          <Component {...pageProps} />
        </PrimeReactProvider>
      </AuthContextProvider>
    </>
  );
}
