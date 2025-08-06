import { LogOut, Settings, User } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { profile } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate('/admin/settings');
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome to Admin Panel
            </h1>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                {profile?.profilePicture ? (
                  <img 
                    src={`https://api.ndaid.help/${profile.profilePicture}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-1.5 text-gray-600" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {profile?.username || 'Admin'}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {profile?.email}
                  </p>
                </div>
                <button
                  onClick={handleSettingsClick}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;
