import {
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SimplePageLayout from "./pages/SimplePageLayout";

export const App = () => {

  return (
    <Routes>
      {/* All Simple Page Layout Routes goes under here */}
      <Route element={<SimplePageLayout />} >
        <Route path="/" >
          <Route index element={<HomePage />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App