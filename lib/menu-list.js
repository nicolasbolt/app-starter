import {
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
  } from 'lucide-react';
  
  export function getMenuList(pathname) {
    return [
      {
        groupLabel: '',
        menus: [
          {
            href: '/',
            label: 'Dashboard',
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: 'Tools',
        menus: [
          {
            href: '/tool1',
            label: 'Tool 1',
            icon: SquarePen,
            submenus: [],
          },
          {
            href: '/tool2',
            label: 'Tool 2',
            icon: Bookmark,
          },
        ],
      },
  
      {
        groupLabel: 'Settings',
        menus: [
          // {
          //   href: '/users',
          //   label: 'Users',
          //   icon: Users,
          // },
          {
            href: '/account',
            label: 'Account',
            icon: Settings,
          },
        ],
      },
    ];
  }
  