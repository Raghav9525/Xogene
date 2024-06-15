import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrugDetails from "./component/DrugDetails";
import SearchPage from "./component/SearchPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/drugs/:drug_name" element={<DrugDetails />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
