import { HashRouter, Routes, Route } from "react-router";
import { HomePage }    from "./pages/HomePage";
import { AboutPage }   from "./pages/AboutPage";
import { WorksPage }   from "./pages/WorksPage";
import { WorkCategoryPage } from "./pages/WorkCategoryPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"        element={<HomePage />}    />
        <Route path="/about"   element={<AboutPage />}   />
        <Route path="/works"   element={<WorksPage />}   />
        <Route path="/works/:category" element={<WorkCategoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  );
}
