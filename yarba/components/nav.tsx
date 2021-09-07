import Link from "next/link";

const Nav = () => (
  <nav className="bg-gray-800">
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-300 sm:text-3xl sm:truncate">
          <Link href="/">
            <a>Recipes</a>
          </Link>
        </h2>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <Link href="/recipes/new">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              New Recipe
            </a>
          </Link>
        </span>
      </div>
    </div>
  </nav>
);

export default Nav;
