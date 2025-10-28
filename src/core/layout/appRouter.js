import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { additionalModuleRoutes } from './routesConfig';
// Importing support module routes
import { supportRoutes } from '../modules/support/routesConfig';

const allRoutes = [...additionalModuleRoutes, ...supportRoutes];

export default function AppRouter() {
  return (
    <Routes>
      {/* Default routes */}
      <Route path='/' element={<div>Home</div>} />
      {/* Additional module routes will be added here */}
      {allRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}  
    </Routes>
  );
}
content_map: (route, index) => (
        <Route key={index} {...route} />