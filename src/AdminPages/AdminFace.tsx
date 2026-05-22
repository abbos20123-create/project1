import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  Car,
  Package,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  Sparkles,
  Menu,
  ClipboardList,
  Gift,
  Gauge,
  Phone,
} from "lucide-react"

const navItems = [
  { to: "/admin/homePage", label: "Homepage", icon: Home },
  { to: "/admin/cars", label: "Cars", icon: Car },
  { to: "/admin/komplekt", label: "Komplektatsiya", icon: Package },
  { to: "/admin/testDrive", label: "Test Drive", icon: Gauge },
  { to: "/admin/contact", label: "Contact", icon: Phone },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/offers", label: "Offers", icon: Gift },
]

function AdminFace() {
  const location = useLocation()
  const navigate = useNavigate()

  const active = (path: string) => location.pathname === path

  const currentLabel =
    navItems.find((n) => active(n.to))?.label ?? "Dashboard"

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="h-screen overflow-hidden bg-[#060816] text-white flex"
    >
      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="relative w-[290px] shrink-0 border-r border-white/10 bg-gradient-to-b from-[#0f172a] via-[#0b1120] to-black overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-[-120px] left-[-80px] w-[250px] h-[250px] bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[250px] h-[250px] bg-purple-500/20 blur-3xl rounded-full" />

        {/* Logo */}
        <div className="relative z-10 px-7 pt-7 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <Sparkles size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                KIA<span className="text-cyan-400">.</span>
              </h1>
              <p className="text-xs text-white/40 tracking-[0.35em] uppercase">
                Admin System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="relative z-10 px-4">
          <p className="px-3 mb-4 text-[11px] uppercase tracking-[0.35em] text-white/25">
            Navigation
          </p>

          <div className="space-y-2 flex flex-col max-h-117.5 overflow-y-auto pr-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = active(to)

              return (
                <Link to={to} key={to}>
                  <div
                    className={`
                      group relative overflow-hidden rounded-2xl px-3 py-3
                      transition-all duration-300 cursor-pointer
                      border
                      ${
                        isActive
                          ? "bg-linear-to-r from-cyan-500 to-blue-600 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                          : "bg-white/3 border-white/5 hover:border-cyan-500/30 hover:bg-white/6"
                      }
                    `}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-r from-cyan-500/5 to-purple-500/5" />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                            w-11 h-11 rounded-xl flex items-center justify-center
                            ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-white/4 text-white/60 group-hover:text-cyan-300"
                            }
                          `}
                        >
                          <Icon size={18} />
                        </div>

                        <div>
                          <p
                            className={`
                              text-[15px] font-semibold
                              ${isActive ? "text-white" : "text-white/70"}
                            `}
                          >
                            {label}
                          </p>

                          <p
                            className={`
                              text-[11px]
                              ${
                                isActive
                                  ? "text-white/70"
                                  : "text-white/30"
                              }
                            `}
                          >
                            Manage {label.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        size={18}
                        className={`transition-transform ${
                          isActive
                            ? "translate-x-0 text-white"
                            : "translate-x-[-5px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-cyan-300"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-10">
            <p className="px-3 mb-4 text-[11px] uppercase tracking-[0.35em] text-white/25">
              Upcoming
            </p>

            <div className="space-y-2">
              {[{ label: "Dashboard", Icon: LayoutDashboard }, { label: "Settings", Icon: Settings }].map(
                ({ label, Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/5 bg-white/2 px-4 py-4 flex items-center gap-4 opacity-40"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/3 flex items-center justify-center">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-[11px] text-white/30">Coming soon</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* User */}
        <div className="absolute bottom-0 left-0 w-full p-5 z-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-lg shadow-lg shadow-cyan-500/20">
                A
              </div>

              <div>
                <h3 className="font-bold text-[15px]">Admin Panel</h3>
                <p className="text-white/40 text-xs">admin@kia.com</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="
                w-full h-12 rounded-2xl
                bg-linear-to-r from-red-500 to-pink-500
                hover:scale-[1.02]
                transition-all duration-300
                flex items-center justify-center gap-2
                font-semibold
                shadow-lg shadow-red-500/20
              "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ───────────────── MAIN ───────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-24 shrink-0 border-b border-white/10 bg-[#0a1020]/80 backdrop-blur-xl px-8 flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-5">
            <button className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition">
              <Menu size={18} />
            </button>

            <div>
              <p className="text-cyan-400 text-[11px] uppercase tracking-[0.35em] mb-1">
                Kia Admin
              </p>

              <h2 className="text-3xl font-black tracking-tight">
                {currentLabel}
              </h2>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden lg:flex items-center gap-3 w-[300px] h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-5">
              <Search size={18} className="text-white/30" />

              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent outline-none text-sm w-full placeholder:text-white/25"
              />
            </div>

            {/* Notification */}
            <button className="relative w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition">
              <Bell size={18} className="text-white/70" />

              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold">Abbas</p>
                <p className="text-xs text-white/35">Super Admin</p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#0a1020] flex items-center justify-center font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#060816] via-[#0b1120] to-[#05070f] p-8">
          
          {/* Floating glow */}
          <div className="absolute top-[120px] right-[100px] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative min-h-full rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
            
            {/* Top decoration */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminFace