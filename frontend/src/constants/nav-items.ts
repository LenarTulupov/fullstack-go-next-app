import { INavItems } from "@/types/nav-items.interface";

export const navItems: INavItems[] = [
  { 
    title: 'All Clothing', 
    href: '/category/all-clothing',
    subItems: [
      { title: 'Trousers', href: '/category/trousers' },
      { title: 'Jackets', href: '/category/jackets' },
      { title: 'Bikinis', href: '/category/bikinis' }
    ]
  },
  {
    title: 'New In', 
    href: '/category/new-in',
    subItems: []
  },
  {
    title: 'Trends',  
    href: '/category/trends',
    subItems: [{ title: 'Trousers', href: '/category/trousers' },
      { title: 'Jackets', href: '/category/jackets' },
      { title: 'Bikinis', href: '/category/bikinis' }]
  },
  {
    title: 'Dresses', 
    href: '/category/dresses',
    subItems: []
  },
  {
    title: 'Summer', 
    href: '/category/summer',
    subItems: [{ title: 'Trousers', href: '/category/trousers' },
      { title: 'Jackets', href: '/category/jackets' },
      { title: 'Bikinis', href: '/category/bikinis' }]
  },
];