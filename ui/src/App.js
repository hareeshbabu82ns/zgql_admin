import {
  Routes,
  Route
} from "react-router-dom";
import GraphEditorPage from "./pages/GraphEditorPage";

import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import SchemaListPage from "./pages/SchemaListPage";
import SchemaEditPage from "./pages/SchemaEditPage";
import SchemaCreatePage from "./pages/SchemaCreatePage";
import SimplePageLayout from "./pages/SimplePageLayout";

export const App = () => {

  return (
    <Routes>
      {/* All Simple Page Layout Routes goes under here */}
      <Route element={<SimplePageLayout />} >
        <Route path="/" >
          <Route index element={<DashboardPage />} />
          <Route path="schema" >
            <Route path=":id" element={<SchemaEditPage />} />
            <Route path="new" element={<SchemaCreatePage />} />
            <Route index element={<SchemaListPage />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
          <Route path="editor" >
            <Route path=":id" element={<GraphEditorPage />} />
            <Route index element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App