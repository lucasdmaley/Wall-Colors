import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '0b185dad-2749-421d-8eb1-b43589c403e4',
  clientToken: 'pub63c92b03daa327e984d95b898c34b836',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: 'datadoghq.eu',
  service: 'wall-colors',
  env: 'prod',
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'allow',
  usr: {},
});
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} datadogRum={datadogRum}/>
    </main>
  )
}