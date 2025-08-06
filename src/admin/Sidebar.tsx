import {
  Badge,
  BarChart3,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  DollarSign,
  FileText,
  Headphones,
  Heart,
  HelpCircle,
  Mail,
  RefreshCw,
  Settings,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: any;
  path?: string;
  badge?: string | null;
  disabled?: boolean;
  subItems?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  // Helper to sum notification counts for subItems
  const getSubMenuTotal = (subItems?: MenuItem[]) => {
    if (!subItems) return 0;
    return subItems.reduce((sum, sub) => sum + getNotificationCount(sub.badge), 0);
  };
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { counts, markAsViewed } = useNotifications();

  const handleSidebarClick = (badge: string | null) => {
    if (badge) {
      // Clear notification count for certain sections when clicked
      if (['donations', 'contact'].includes(badge)) {
        markAsViewed(badge as keyof typeof counts, 0); // Use 0 as placeholder ID
      }
    }
  };

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const getNotificationCount = (badge: string | null | undefined): number => {
    if (!badge || !counts) return 0;
    const value = counts[badge as keyof typeof counts] || 0;
    return value;
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      path: '/admin/dashboard',
      badge: null
    },
    {
      title: 'APPLY NOW',
      icon: FileText,
      subItems: [
        {
          title: 'Disability Cards',
          icon: Users,
          path: '/admin/disabilities',
          badge: 'disabilities'
        },
        {
          title: 'Carers Cards',
          icon: Heart,
          path: '/admin/carers',
          badge: 'carers'
        },
        {
          title: 'Customer Support',
          icon: Headphones,
          path: '/admin/customer-support',
          badge: 'support'
        },
        {
          title: 'Verified Lanyards',
          icon: Badge,
          path: '/admin/verified-lanyards',
          badge: 'lanyards'
        }
      ]
    },
    {
      title: 'Donations',
      icon: DollarSign,
      path: '/admin/donations',
      badge: 'donations'
    },
    {
      title: 'Renewals',
      icon: RefreshCw,
      subItems: [
        {
          title: 'Renew Disabilities Card',
          icon: Users,
          path: '/admin/renewals/disabilities',
          badge: 'renewal-disabilities'
        },
        {
          title: 'Renew Carers Card',
          icon: Heart,
          path: '/admin/renewals/carers',
          badge: 'renewal-carers'
        },
        {
          title: 'Renew Customer Support Card',
          icon: Headphones,
          path: '/admin/renewals/customer-support',
          badge: 'renewal-support'
        }
      ]
    },
    {
      title: 'Payments',
      icon: CreditCard,
      path: '/admin/payments',
      badge: 'payments'
    },
    {
      title: 'Tracking Cards',
      icon: Badge,
      path: '/admin/tracking-cards',
      badge: null
    },
    {
      title: 'Partners',
      icon: Building2,
      path: '/admin/partners',
      badge: null
    },
    {
      title: 'Contact Submissions',
      icon: Mail,
      path: '/admin/contact-submissions',
      badge: 'contact'
    },
    {
      title: 'Support',
      icon: HelpCircle,
      path: '/admin/support',
      badge: null,
      disabled: true
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      badge: null
    }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UAE</span>
            </div>
            <span className="ml-3 font-semibold text-gray-900">Admin Panel</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path ? location.pathname === item.path : false;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(item.title);
          const hasActiveSubItem = hasSubItems && item.subItems?.some(subItem => 
            subItem.path && location.pathname === subItem.path
          );
          
          return (
            <div key={item.title}>
              {/* Main menu item */}
              {hasSubItems ? (
                <button
                  onClick={() => !isCollapsed && toggleMenu(item.title)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    item.disabled 
                      ? 'cursor-not-allowed opacity-50' 
                      : hasActiveSubItem || isActive
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  disabled={item.disabled}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1 text-left">{item.title}</span>
                      {/* Show sum of sub-menu notification badges for APPLY NOW and Renewals */}
                      {['APPLY NOW', 'Renewals'].includes(item.title) && getSubMenuTotal(item.subItems) > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                          {getSubMenuTotal(item.subItems)}
                        </span>
                      )}
                      {item.badge && getNotificationCount(item.badge) > 0 && !item.subItems && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                          {getNotificationCount(item.badge)}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path || '#'}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    item.disabled 
                      ? 'cursor-not-allowed opacity-50' 
                      : isActive
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={item.disabled ? (e: any) => e.preventDefault() : () => handleSidebarClick(item.badge || null)}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1">{item.title}</span>
                      {item.badge && getNotificationCount(item.badge) > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                          {getNotificationCount(item.badge)}
                        </span>
                      )}
                    </>
                  )}
                  {!isCollapsed && item.disabled && (
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </NavLink>
              )}
              
              {/* Sub menu items */}
              {hasSubItems && !isCollapsed && isExpanded && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = subItem.path ? location.pathname === subItem.path : false;
                    
                    return (
                      <NavLink
                        key={subItem.title}
                        to={subItem.path || '#'}
                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                          subItem.disabled 
                            ? 'cursor-not-allowed opacity-50' 
                            : isSubActive
                            ? 'bg-green-50 text-green-700 border-l-2 border-green-500'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={subItem.disabled ? (e) => e.preventDefault() : undefined}
                      >
                        <SubIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium flex-1">{subItem.title}</span>
                        {subItem.badge && getNotificationCount(subItem.badge) > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {getNotificationCount(subItem.badge)}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
