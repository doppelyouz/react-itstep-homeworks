import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegistrationPage from './pages/homeworkReg/registrationPage';
import ProfilePage from './pages/homeworkReg/profilePage';
import SettingsPage from './pages/homeworkReg/settingsPage';

import UserContext from './context';

const Router = () => {
  const {user} = useContext(UserContext);
  if(!user) {
    localStorage.removeItem('User');
  }
  return (
    <BrowserRouter>
        <Routes>
            {
            user ? 
                <>
                  <Route path="/" element={<ProfilePage />} /> 
                  <Route path="/settings" element={<SettingsPage />} />
                </>
              : 
                <Route path="*" element={<RegistrationPage />} />
            }
        </Routes>
    </BrowserRouter>
  )
}

export default Router