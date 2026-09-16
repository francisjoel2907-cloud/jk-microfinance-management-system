import { Landmark } from "lucide-react";

import { NavLink } from "react-router-dom";

import { navigation } from "@/config/navigation";

const Sidebar = () => {
  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-72
        bg-white
        border-r
        border-slate-200
        min-h-screen
        shadow-sm
      "
    >
      {/* Logo */}
      <div
        className="
          h-20
          border-b
          border-slate-200
          flex
          items-center
          px-6
        "
      >
        <div
          className="
            h-12
            w-12
            rounded-xl
            bg-green-600
            flex
            items-center
            justify-center
          "
        >
          <Landmark className="text-white" size={26} />
        </div>

        <div className="ml-4">
          <h2 className="font-bold text-slate-900">Kite Microfinance</h2>

          <p className="text-sm text-slate-500">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            transition-colors
            ${
              isActive
                ? "bg-green-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }
          `
              }
            >
              <Icon size={20} />

              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
