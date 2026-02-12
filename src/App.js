import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Portfolio from "./components/portfolio/Portfolio";
import ResumeViewer from "./components/resume/ResumeViewer";

const App = () => {
  return (
    <Router
      basename={
        process.env.NODE_ENV === "production" ? "/vishnuportfolio" : "/"
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Portfolio section="home" />} />
        <Route path="/projects" element={<Portfolio section="projects" />} />
        {/* RESUME route commented out to avoid showing up in the nav bar*/}
        {/* <Route path="/resume" element={<Portfolio section="resume" />} /> */}
        {/* CV route commented out - using Resume as primary term for North American market */}
        {/* <Route path="/CV" element={<Portfolio section="CV" />} /> */}
        <Route path="/blogs" element={<Portfolio section="Blogs" />} />
        <Route path="/contact" element={<Portfolio section="contact" />} />
        <Route path="/resume-viewer" element={<ResumeViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
