import { Link } from "react-router-dom"


function Footer() {
  return (
    <footer data-aos="fade-up" className="bg-[#020f1a] pt-12 md:pt-16 pb-6 md:pb-8 border-t border-[#8e9196]/10 text-sm w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
                <div className="space-y-4">
                  <div className="font-bold text-2xl sm:text-3xl tracking-widest mb-4 md:mb-6">
                    <i><strong className="text-[#d5e4f4]">KIA</strong></i>
                  </div>
                  <p className="text-[#c4c7cc] text-xs leading-relaxed max-w-xs">
                    O'zbekistonda rasmiy Kia distribyutori.<br/> Sifat va innovatsiya timsoli.
                  </p>
                  <div className="flex space-x-4 pt-2 md:pt-4">
                    <a className="text-[#c4c7cc] hover:text-[#b9c8d8] transition-colors text-xs sm:text-sm" href="#">Instagram</a>
                    <a className="text-[#c4c7cc] hover:text-[#b9c8d8] transition-colors text-xs sm:text-sm" href="#">Telegram</a>
                    <a className="text-[#c4c7cc] hover:text-[#b9c8d8] transition-colors text-xs sm:text-sm" href="#">Facebook</a>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 md:mb-6 text-[#d5e4f4] uppercase tracking-wider text-xs">Sotuvlar</h4>
                  <ul className="space-y-2 md:space-y-3 text-[#c4c7cc] text-xs sm:text-sm">
                    <li><Link className="hover:text-[#b9c8d8] transition-colors" to="/models">Barcha modellar</Link></li>
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Maxsus takliflar</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 md:mb-6 text-[#d5e4f4] uppercase tracking-wider text-xs">Servis</h4>
                  <ul className="space-y-2 md:space-y-3 text-[#c4c7cc] text-xs sm:text-sm">
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Texnik xizmat ko'rsatish</a></li>
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Ehtiyot qismlar</a></li>
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Kafolat</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 md:mb-6 text-[#d5e4f4] uppercase tracking-wider text-xs">Kompaniya</h4>
                  <ul className="space-y-2 md:space-y-3 text-[#c4c7cc] text-xs sm:text-sm">
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Biz haqimizda</a></li>
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Yangiliklar</a></li>
                    <li><a className="hover:text-[#b9c8d8] transition-colors" href="#">Kontaktlar</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-[#8e9196]/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs text-[#c4c7cc] gap-4 md:gap-0">
                <p className="text-center md:text-left">© 2024 Kia Uzbekistan. Barcha huquqlar himoyalangan.</p>
                <div className="flex space-x-4">
                  <a className="hover:text-[#b9c8d8] uppercase tracking-[0.2em] font-semibold" href="#">Privacy Policy</a>
                  <a className="hover:text-[#b9c8d8] uppercase tracking-[0.2em] font-semibold" href="#">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
  )
}

export default Footer