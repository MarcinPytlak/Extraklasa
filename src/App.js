import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';

import ExtraklasaTable from './components/layout/Table/ExtraklasaTable';
import Match from './components/views/Match/Match';

function App() {
  return(
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<ExtraklasaTable />}/>
          <Route path='/match' element={<Match />}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
