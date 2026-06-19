import { HashRouter, Routes, Route } from "react-router";
import { HomePage }    from "./pages/HomePage";
import { AboutPage }   from "./pages/AboutPage";
import { WorksPage }   from "./pages/WorksPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"        element={<HomePage />}    />
        <Route path="/about"   element={<AboutPage />}   />
        <Route path="/works"   element={<WorksPage />}   />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  );
}
