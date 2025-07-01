import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/most-wanted', label: 'Most Wanted' },
    { href: '/cartels', label: 'Cartels' },
    { href: '/news', label: 'News' },
    { href: '/ai', label: 'AI' },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex flex-col sm:flex-row sm:space-x-4 text-white">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-gray-300 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}