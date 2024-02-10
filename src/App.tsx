import "./App.css";
import { Route, Routes } from "react-router-dom";
import ParcelList from "./pages/ParcelList";

function App() {
  return (
    <Routes>
      <Route index element={<ParcelList />}></Route>
    </Routes>
  );
}

export default App;
