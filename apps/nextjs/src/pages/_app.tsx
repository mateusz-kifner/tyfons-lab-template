import type { AppProps } from 'next/app'
import "~/app/globals.css";

 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <div className='bg-red-950 text-stone-100 h-screen'><Component {...pageProps} /></div>
}