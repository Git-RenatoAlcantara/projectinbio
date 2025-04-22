import { Suspense, useState } from "react";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import VideoExplanation from "../components/landing-page/video-explanation";
import { trackServerEvent } from "../lib/mixpanel";

export default function Home() {

  trackServerEvent("page_view", {
    page: "home"
  })

  
  return (
    <Suspense>
      <div className="max-w-7xl m-auto h-full">
        <Hero />
        <Header />
        <VideoExplanation />
        <Pricing />
        {/* <FAQ /> */}
      </div>

    </Suspense>
  )
}
