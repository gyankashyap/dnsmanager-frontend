import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import CreateRecord from './DNS/CreateRecord';
import HostedZoneList from './DNS/HostedZoneList';
import useAuth from '../hooks/useAuth';
import './App.css';
import BulkUpload from './DNS/BulkUpload';
import UpdateRecord from './DNS/UpdateRecord';

const App = () => {
  const { auth } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dns/create" element={auth ? <CreateRecord /> : <Navigate to="/login" />} />
        <Route path="/dns/list" element={auth ? <HostedZoneList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={auth ? "/dns/list" : "/login"} />} />
        <Route path="/dns/bulk-upload" element={auth ? <BulkUpload /> : <Navigate to="/login" />} />
        <Route path="/dns/update" element={auth ? <UpdateRecord /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
