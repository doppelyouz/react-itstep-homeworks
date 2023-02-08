import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegistrationPage from './pages/homeworkReg/registrationPage';
import ProfilePage from './pages/homeworkReg/profilePage';
import SettingsPage from './pages/homeworkReg/settingsPage';

import {useSelector} from 'react-redux';

const Router = () => {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
        <Routes>
            {
              user ? 
                <>
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<ProfilePage />} /> 
                </>
              : 
                <Route path="*" element={<RegistrationPage />} />
            }
        </Routes>
    </BrowserRouter>
  )
}

export default Router