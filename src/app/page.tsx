import React from "react";
import Hero from "../components/Hero/Hero";
import Languages from "../components/Languages/Languages";
import LastJobs from "../components/LastJobs/LastJobs";
import Qualifications from "../components/Qualifications/Qualifications";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";

export default function Page(): React.ReactElement {
  return (
    <main id="main" className="flex flex-col w-full">
      <Hero />
      <Projects />
      <Languages />
      <LastJobs />
      <Qualifications />
      <Contact />
    </main>
  );
}
