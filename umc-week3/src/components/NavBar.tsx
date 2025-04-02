// Navbar.tsx
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">
        🎬 MovieApp
      </div>
      <div className="flex space-x-6 text-sm font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400 transition"}>
          홈
        </NavLink>
        <NavLink to="/movies/1" className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400 transition"}>
          인기 영화
        </NavLink>
        <NavLink to="/upcoming/1" className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400 transition"}>
          개봉 예정
        </NavLink>
        <NavLink to="/topRated/1" className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400 transition"}>
          평점 높은
        </NavLink>
        <NavLink to="/nowPlaying/1" className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400 transition"}>
          상영 중
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
