import Script from "next/script";

export default function HereMapScripts() {
  return (
    <>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-clustering.js"
        ></Script>
        <Script
          type="text/javascript"
          src="https://js.api.here.com/v3/3.1/mapsjs-data.js"
        ></Script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"
        />
    </>
  )
}