// components/Header.js

import Link from "next/link";
// import styles from "../styles/components/Header.module.css";
const Header = () => {
  return (
    <nav className="bg-red-500">
      <Link href="/">
        <div>
          <p>
            PLANTS <span>☘</span>
          </p>
        </div>
      </Link>
      <div>
        <span>🛒</span>
        <p>$0.00</p>
      </div>
    </nav>
  );
};

export default Header;
