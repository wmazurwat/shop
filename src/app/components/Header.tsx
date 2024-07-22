import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-red-500 flex justify-between items-center p-4">
      <Link href="/">
        <div className="text-white text-lg cursor-pointer">
          Owoce i warzywa - SKLEP <span>☘</span>
        </div>
      </Link>
      <div className="text-white flex items-center">
        <span className="mr-2">🛒</span>
        <p>$0.00</p>
      </div>
    </nav>
  );
};

export default Header;
