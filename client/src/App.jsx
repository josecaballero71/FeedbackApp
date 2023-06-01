import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './auth/components/Login.jsx'

import Hub from './hub/pages/Hub.jsx';

import Survey from './survey/pages/survey.jsx';
import Reason from './survey/pages/Reason.jsx'
import Thanks from './survey/pages/Thanks.jsx';

import Dashboard from './dashboard/pages/Dashboard.jsx';
import Detail from './dashboard/pages/Detail.jsx'
import Admin from './admin/pages/Admin.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/hub" element={<Hub />} />

        <Route path="/survey" element={<Survey />} />
        <Route path="/reason" element={<Reason />} />
        <Route path='/thanks' element={<Thanks />}/>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/admin' element={ <Admin /> } />
      </Routes>
    </BrowserRouter>

  );
}