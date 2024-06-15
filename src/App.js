import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SearchPageExp from "./component/SearchPageExp";
import 'bootstrap/dist/css/bootstrap.min.css';
import DrugDetailsPrac from "./component/DrugDetailsPrac";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<SearchPageExp />} />
          <Route path="/drugs/" element={<DrugDetailsPrac />} />
        </Routes>
      </Router>



    </div>
  );
}

export default App;
