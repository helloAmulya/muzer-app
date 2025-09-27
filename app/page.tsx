// import Image from "next/image";
// import { Appbar } from "./components/Appbar";
import { Navbar } from "./components/landing/navbar"
import { Hero } from "./components/landing/hero"
import { Features } from "./components/landing/features"
import { HowItWorks } from "./components/landing/how-it-works"

import { CTA } from "./components/landing/cta"
import { Footer } from "./components/landing/footer"
import { Redirect } from "./components/Redirect"

export default function Home() {
  return (
    <>
      <div>
        {/* <Appbar /> not needed now, we use navbar as main */}
        <Navbar />
        <Redirect/>
          <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
