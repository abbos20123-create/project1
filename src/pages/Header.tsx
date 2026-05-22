import { Link, useLocation, useNavigate } from "react-router-dom"


function Header() {


  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTestDrive = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const element = document.getElementById("test-drive");

      if (element) {
        const y =element.getBoundingClientRect().top +window.scrollY - 80;

        window.scrollTo({top: y, behavior: "smooth",});
      }
    } else {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById("test-drive");

        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY -80;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  };

    

  
  return (
    <div>

<nav 
        data-aos="fade-down" 
        data-aos-duration="1000"
        className="fixed w-full h-17.5 md:h-20 z-100 bg-[#05141f]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 transition-all duration-500"
      >
        
        {/* LOGO */}
        <div className="shrink-0 font-bold text-xl md:text-2xl tracking-widest">
          <Link to="/">
            <img className="" src="/7a270f7d-6048-45bb-9dd0-24d585d021a0 2.svg" alt="Kia Logo" />
          </Link>
        </div>

        {/* ASOSIY MENYU (MARKAZ) */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link to="/models" className="hover:text-white transition-colors">
            Modellar
          </Link>
          <Link to="/offers" className="hover:text-white transition-colors">
            Takliflar
          </Link>
          <a className="hover:text-white transition-colors" href="#">
            Chegirmalar
          </a>
          
          {/* Test drayv tugmasi onClick funksiyasi bilan */}
          <a href="#test-drive" onClick={scrollToTestDrive} className="hover:text-white transition-colors cursor-pointer">
            Test-drayv
          </a>
          
          <a className="hover:text-white transition-colors" href="#">
            Yangiliklar
          </a>
          <Link to="/services" className="hover:text-white transition-colors">
            Servis
          </Link>
        </div>

        {/* O'NG TOMON (Ijtimoiy tarmoqlar, Til, Tugma) */}
        <div className="flex items-center space-x-4 md:space-x-6">
          
          {/* Ijtimoiy tarmoqlar */}
          <div className="hidden md:flex items-center space-x-4 text-gray-400 border-r border-white/20 pr-4 md:pr-6">
            {/* Instagram */}
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300" target="_blank" rel="noreferrer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Telegram */}
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300" target="_blank" rel="noreferrer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300" target="_blank" rel="noreferrer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.54 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.54-5.58z"></path>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>



          {/* Tugma */}
          <Link to="/contact">
            <button className="bg-white text-black px-4 md:px-6 py-2 text-xs md:text-sm font-bold rounded-sm hover:bg-gray-200 transition-colors uppercase tracking-wider shadow-lg">
              BOG'LANISH
            </button>
          </Link>
        </div>
      </nav>
        
    </div>
  )
}

export default Header