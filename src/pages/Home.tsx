import React, { useEffect, useState, type FormEvent } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Swiper React komponentlari
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { updateHomepage } from '../redux/Slice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { addTestDrive } from '../redux/testDriveSlice';
import { toast } from 'react-toastify';

type ModelType = {
  id: number;
  name: string;
};


const Home: React.FC = () => {


const [models, setModels] = useState<ModelType[]>([]);
  const { name, video } = useAppSelector((state) => state.home);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [comment, setComment] = useState("");



  const dispatch = useAppDispatch();


  useEffect(() => {
  const fetchModels = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:3000/models"
      );

      setModels(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchModels();
}, []);

useEffect(() => {
  const fetchHome = async () => {
    const {data} = await axios.get(
      "http://localhost:3000/homepage"
    );

    dispatch(updateHomepage(data));
  };

  fetchHome();
}, []);


  // 1. Skroll animatsiyalarini yoqish (AOS)
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);


const handleSubmit = async () => {
  if (!userName || !phone || !model) {
    toast.error("Iltimos, barcha maydonlarni to'ldiring");
    return;
  }

  try {
    
    toast.success("Test-drayv so'rovingiz qabul qilindi! Tez orada siz bilan bog'lanamiz.");
    
     setTimeout(async() => {
      const {data} = await axios.post("http://localhost:3000/testdrives", {
      name: userName,
      phone,
      model,
      comment,
    });
    dispatch(addTestDrive(data));
    }, 1500);

    
    
    setUserName("");
    setPhone("");
    setModel("");
    setComment("");
  } catch (error) {
    toast.error("Xatolik yuz berdi");
  }
};
  // Test-drayv qismiga silliq tushish uchun funksiya (Navbar to'sib qo'ymasligi uchun)
  const scrollToTestDrive = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("test-drive");
    if (element) {
      // Navbarning balandligini (taxminan 80px) hisobga olib pastga tushirish
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="antialiased">
      

      <Header/>

      <header className="relative w-full min-h-[70vh] lg:h-screen flex items-end justify-start px-4 sm:px-8 md:px-12 bg-kia-dark overflow-hidden pb-16 md:pb-32">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80">
          <source src={video} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-linear-to-t from-kia-dark to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-r from-kia-dark via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl w-full" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold italic text-white mb-4 md:mb-8 tracking-tighter shadow-sm">
            {name}
          </h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Link to="/models" className="w-full sm:w-max">
              <button className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 text-xs md:text-sm font-bold uppercase hover:bg-gray-200 transition-colors text-center tracking-wider">
                Batafsil
              </button>
            </Link>
            <button 
              onClick={scrollToTestDrive}
              className="w-full sm:w-auto border border-white text-white px-6 md:px-8 py-3 text-xs md:text-sm font-bold uppercase hover:bg-white/10 transition-colors text-center backdrop-blur-sm tracking-wider"
            >
              Test-Drayv
            </button>
          </div>
        </div>
      </header>
      {/* END: HeroHeader */}

      <main className="bg-kia-dark px-4 md:px-12 py-12 md:py-16 space-y-10 md:space-y-12">
        
        {/* BEGIN: ModelHighlights Section */}
        <section className="space-y-6 max-w-7xl mx-auto">
          {/* EV9 Card */}
          <article data-aos="fade-up" className="bg-kia-card rounded-xl overflow-hidden flex flex-col md:flex-row border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="p-5 sm:p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">KIA EV9</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-1">569 900 000 so'mdan</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">12 600 000 dan oylik to'lov <br /> Trade-In ✓</p>
                <div className="flex justify-between sm:justify-start sm:space-x-8 mb-6 sm:mb-8 border-t border-white/10 pt-4 sm:pt-6">
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      0-100 KM/H
                    </span>
                    <span className="text-base sm:text-xl font-bold">5.3s</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      RANGE
                    </span>
                    <span className="text-base sm:text-xl font-bold">541 km</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      DRIVETRAIN
                    </span>
                    <span className="text-base sm:text-xl font-bold">AWD</span>
                  </div>
                </div>
              </div>
              <Link to="/models" className="w-full sm:w-max">
                <button className="bg-white/10 text-white w-full px-6 py-3 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors uppercase tracking-wider text-center rounded-sm">Batafsil</button>
              </Link>
            </div>
            <div className="md:w-1/2 relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
              <img alt="Kia EV9" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBudRjHJUNMlruhGteuZIom2WBmQ6DijW2eWxoPW-w3cua4A0UegoJOUdZ6lPTKw6ob4lBFQ6czYSamkf03xnb18Kyut0mPeaQ9Pg7t5ni4glK3kR2c_CCYnf6hIPA34YixHJCGxOHlRCQlL_9v1aUNyOobXaGBs77UupMi1JILXwJxAnjdEE1NPCbNZLxb65YVHl67tg1ELkQjPaIUHiAxY4MgLGWm0hi5pydvWnB-I9M7Dlgvl8lOR4k0gPiBv9N_eZoOC9JIRr0"/>
            </div>
          </article>

          {/* K5 Card */}
          <article data-aos="fade-up" className="bg-kia-card rounded-xl overflow-hidden flex flex-col md:flex-row border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="p-5 sm:p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">KIA K5</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-1">179 900 000 so'mdan</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">4 600 000 dan oylik to'lov</p>
                <div className="flex justify-between sm:justify-start sm:space-x-8 mb-6 sm:mb-8 border-t border-white/10 pt-4 sm:pt-6">
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      0-100 KM/H
                    </span>
                    <span className="text-base sm:text-xl font-bold">9.3s</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      ENGINE
                    </span>
                    <span className="text-base sm:text-xl font-bold">2.5L MPI</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      DRIVETRAIN
                    </span>
                    <span className="text-base sm:text-xl font-bold">FWD</span>
                  </div>
                </div>
              </div>
              <Link to="/k5" className="w-full sm:w-max">
                <button className="bg-white/10 text-white w-full px-6 py-3 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors uppercase tracking-wider text-center rounded-sm">Batafsil</button>
              </Link>
            </div>
            <div className="md:w-1/2 relative min-h-51 sm:min-h-62.5 md:min-h-76">
              <img alt="Kia K5" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw_mih1y3VLRRwp-gqdC9i_9zlzUIyTzcNHXaKbh9oD9afTiCz04BdaYFNULNgnMSbFM0D9eMOsKg8hARXhJWkSMPze3IsSn8QxUsedEXx2Vg7lTzcXtbdoxuGVfmpVNgmXMC1zYm-SmKP2KbHfxkFPEk0vtb_6zrtveC_LJbnYdU2NSA92PmMUmDzHLADd4LG1GdNhIbI6LyworTbtyUXbI1TzsQGkPA7V9V79K7Oj3Ww-YvCOtIv22-fj7skxwUcku7G5neRXc8"/>
            </div>
          </article>

          {/* Sonet Card */}
          <article data-aos="fade-up" className="bg-kia-card rounded-xl overflow-hidden flex flex-col md:flex-row border border-white/5 hover:border-white/20 transition-all duration-300">
            <div className="p-5 sm:p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">KIA SONET</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-1">99 900 000 so'mdan</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">3 600 000 dan oylik to'lov</p>
                <div className="flex justify-between sm:justify-start sm:space-x-8 mb-6 sm:mb-8 border-t border-white/10 pt-4 sm:pt-6">
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      0-100 KM/H
                    </span>
                    <span className="text-base sm:text-xl font-bold">14.3s</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      ENGINE
                    </span>
                    <span className="text-base sm:text-xl font-bold">1.5L MPI</span>
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      DRIVETRAIN
                    </span>
                    <span className="text-base sm:text-xl font-bold">FWD</span>
                  </div>
                </div>
              </div>
              <Link to="/models" className="w-full sm:w-max">
                <button className="bg-white/10 text-white w-full px-6 py-3 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors uppercase tracking-wider text-center rounded-sm">Batafsil</button>
              </Link>
            </div>
            <div className="md:w-1/2 relative min-h-51 sm:min-h-62.5 md:min-h-76">
              <img alt="Kia Sonet" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55K3Tfxemt8_j0WLGUVTpd1Ur_hLEKT3AF_7TaNQAu8EaOIjZv-YqrJb8PPIDvpvGkLO7Ck-fGyk2kDpbMM2db0ubG9AUT7rsSH4CyEPf9dFkbI9JaT8dK3GlXvtb89oj9gH7j-wHZ38kLq134DcNKmnK71VYzOJP99vKnL_wKe8NfOtiFnAGWvCjR6OGB0UBACzLvd9vOjTf_SGFF-w0YgfEsAU-EgbuO3uncrynqxhWDCQV9y7AzFW-FxrTa8uMxwBOXc8FnmU"/>
            </div>
          </article>
        </section>
        {/* END: ModelHighlights Section */}

        {/* BEGIN: Barcha Modellar Carousel */}
        <section className="max-w-7xl mx-auto overflow-hidden relative">
          <div data-aos="fade-up" className="flex justify-between items-end mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Barcha Modellar</h2>
            <Link to="/models" className="hidden md:inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              Barchasini ko'rish 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
          
          {/* Swiper Slider Konteyneri */}
          <div data-aos="fade-up" data-aos-delay="100" className="pb-10 sm:pb-14">
            <Swiper
              
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              className="modelsSwiper overflow-hidden"
            >
              {/* Slide 1: Seltos */}
              <SwiperSlide>
                <div className="bg-kia-card rounded-2xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img alt="Kia Seltos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfUwNHQ6-Rb5WgciBhpB0CPKDaegO-mCma4fY7plUd6_QAf3zq8CgHtHW6N3U-dx7R9nRqW7_xh2quV9DkrXgDl6U0AsXR92WmI7yINt3Lq1YEV-MUgvXeaZ1K-09GfcdGN-tcvU93zOEAt3y_am3IWnGdihGNE2HtE9_MiakESzMvqndwnMMeV-5FHcOTy1dwDNc-mM4bJaw1GXpGwucWq4wwKLNxHGUcUVeU_3Ic8t0bOBdF2ACqxFMv0lAnCyn-ZZeXyc-KcKw"/>
                    <div className="absolute inset-0 bg-linear-to-t from-kia-card via-kia-card/20 to-transparent"></div>
                  </div>
                  <div className="p-5 sm:p-6 relative z-10 flex-1 flex flex-col justify-end -mt-10 sm:-mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-white text-gray-100 transition-colors">Kia Seltos</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">324 900 000 so'mdan</p>
                    <Link to="/models">
                      <button className="w-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/20 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 uppercase tracking-wider group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Batafsil
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 2: K5 */}
              <SwiperSlide>
                <div className="bg-kia-card rounded-2xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img alt="Kia K5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1a9D0w1p7vmYaq_uyPKjLcGKymlwK6c3zpnaRBHMV54pNRk9-BcLsg3dHG2iPE_hgBtoh0CgKHp8kZQF0cj4Cgf9Lv5ReY1d0EnIfEZqwp9M0OzxUzc1j4FiHLLtzrDNA5hXcfpMKNKgxw71kBxrxeGUbkNtSR-VMyPvtpl6c-cGHTwmzj2haeMwqCzXX4inAvPReZyCC-CtjKaSvtv5vN-o6YWIpNXowktywihJ_aPqmestaywi7yZfIbEIr4a3gICjhHXxKCIw"/>
                    <div className="absolute inset-0 bg-linear-to-t from-kia-card via-kia-card/20 to-transparent"></div>
                  </div>
                  <div className="p-5 sm:p-6 relative z-10 flex-1 flex flex-col justify-end -mt-10 sm:-mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-white text-gray-100 transition-colors">Kia K5</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">412 900 000 so'mdan</p>
                    <Link to="/k5">
                      <button className="w-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/20 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 uppercase tracking-wider group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Batafsil
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3: EV6 */}
              <SwiperSlide>
                <div className="bg-kia-card rounded-2xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img alt="Kia EV6" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoe0KleSbrEzBYI047bQSLNlFQDwWx-gHCUoMhD1lmShKWB60pklYtsRANZIZpMD7Ck2znuJlpZ0m1-of6rpczK30PRvMrcqBfuoFz9QisyeKQUUHoFjoIl6_FDRLzqI756--6bvw8WswqRLS-hefO_5cgbp2oOdzgHwpBVBE-WStMwVScAGm_EVo3tNDe8OOjUl_2T6s6PbG87qyXZ1QAIFTYCyR360MdsBG7kTGwBE67o3Kx8PBW515Qp5HSv-WOvOsz619idys"/>
                    <div className="absolute inset-0 bg-linear-to-t from-kia-card via-kia-card/20 to-transparent"></div>
                  </div>
                  <div className="p-5 sm:p-6 relative z-10 flex-1 flex flex-col justify-end -mt-10 sm:-mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-white text-gray-100 transition-colors">Kia EV6</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">785 000 000 so'mdan</p>
                    <Link to="/models">
                      <button className="w-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/20 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 uppercase tracking-wider group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Batafsil
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 4: Sonet */}
              <SwiperSlide>
                <div className="bg-kia-card rounded-2xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img alt="Kia Sonet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55K3Tfxemt8_j0WLGUVTpd1Ur_hLEKT3AF_7TaNQAu8EaOIjZv-YqrJb8PPIDvpvGkLO7Ck-fGyk2kDpbMM2db0ubG9AUT7rsSH4CyEPf9dFkbI9JaT8dK3GlXvtb89oj9gH7j-wHZ38kLq134DcNKmnK71VYzOJP99vKnL_wKe8NfOtiFnAGWvCjR6OGB0UBACzLvd9vOjTf_SGFF-w0YgfEsAU-EgbuO3uncrynqxhWDCQV9y7AzFW-FxrTa8uMxwBOXc8FnmU"/>
                    <div className="absolute inset-0 bg-linear-to-t from-kia-card via-kia-card/20 to-transparent"></div>
                  </div>
                  <div className="p-5 sm:p-6 relative z-10 flex-1 flex flex-col justify-end -mt-10 sm:-mt-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-white text-gray-100 transition-colors">Kia Sonet</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">99 900 000 so'mdan</p>
                    <Link to="/models">
                      <button className="w-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/20 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 uppercase tracking-wider group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Batafsil
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          
          <div className="mt-2 sm:mt-4 flex justify-center md:hidden">
            <Link to="/models" className="w-full">
              <button className="border border-white/20 px-8 py-3 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors uppercase w-full tracking-wider">BARCHA MODELLAR</button>
            </Link>
          </div>
        </section>
        {/* END: Barcha Modellar Carousel */}

        {/* BEGIN: Takliflar Section */}
        <section className="max-w-7xl mx-auto">
          <h2 data-aos="fade-up" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">Takliflar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Credit Offer */}
            <Link to="/offers" data-aos="fade-right" className="relative h-56 sm:h-64 rounded-xl overflow-hidden group cursor-pointer block">
              <img alt="Kredit Takliflari" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="./kreditN.svg"/>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 sm:p-8 w-full md:w-3/4">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-white">Kredit takliflari</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">Yillik 12% dan boshlanuvchi imtiyozli kredit shartlari bilan orzuingizdagi avtomobilni oling.</p>
                <span className="text-xs sm:text-sm font-semibold flex items-center text-white group-hover:underline">
                  Ko'proq bilish 
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>
            
            {/* Service Offer */}
            <Link to="/services" data-aos="fade-left" className="relative h-56 sm:h-64 rounded-xl overflow-hidden group cursor-pointer block">
              <img alt="Servis" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="./servis.svg"/>  
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 sm:p-8 w-full md:w-3/4">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-white">Servis</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">Servis xizmatlari va ehtiyot qismlari uchun maxsus mavsumiy chegirmalardan foydalaning.</p>
                <span className="text-xs sm:text-sm font-semibold flex items-center text-white group-hover:underline">
                  Ko'proq bilish 
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
        {/* END: Takliflar Section */}

        {/* BEGIN: Feature Spotlight (Sonet Bukhara) */}
        <section data-aos="fade-up" className="max-w-7xl mx-auto bg-kia-card rounded-xl overflow-hidden border border-white/5 flex flex-col md:flex-row">
          <div className="md:w-3/5">
            <img alt="Kia Sonet in Bukhara" className="w-full h-full object-cover min-h-62.5 sm:min-h-87.5 md:min-h-101" src="./sonet.svg"/>
          </div>
          <div className="md:w-2/5 p-6 sm:p-10 flex flex-col justify-center bg-linear-to-br from-kia-card to-kia-dark">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">Kia Sonet: Buxoro ko'chalarida 48 oylik muddatli to'lov</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
              Endi siz yangi Kia Sonet avtomobilini qulay shartlarda – 48 oygacha bo'lgan muddatli to'lov asosida xarid qilishingiz mumkin. Imkoniyatni boy bermang!
            </p>
            <Link to="/offers">
              <button className="bg-white text-black w-full sm:w-max px-8 py-4 sm:py-3 text-xs sm:text-sm font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider rounded-sm">
                TAKLIFNI OLISH
              </button>
            </Link>
          </div>
        </section>
        {/* END: Feature Spotlight */}

        {/* BEGIN: Test Drive Form */}
        <section id="test-drive" className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 items-center border-t border-white/10 pt-12 md:pt-20">
          <div data-aos="fade-right" className="w-full md:w-1/2 rounded-xl overflow-hidden">
            <img alt="Test Drive" className="w-full h-62.5 sm:h-101 md:h-126 object-cover" src="./nimadir.svg"/>
          </div>
          <div data-aos="fade-left" className="w-full md:w-1/2 p-2 sm:p-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Test-drayvga yoziling</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">Kia haydash zavqini o'zingiz his qilib ko'ring. Formani to'ldiring va mutaxassislarimiz siz bilan bog'lanishadi.</p>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-white/30 text-white placeholder-gray-500"
                  placeholder="Ism"
                  type="text"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-white/30 text-white placeholder-gray-500"
                  placeholder="Telefon"
                  type="tel"
                />
              </div>
              <select
                value={model}
                onChange={(e) =>
                  setModel(e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-white/30 text-white appearance-none cursor-pointer"
              >
                <option
                  disabled
                  value=""
                  className="text-black"
                >
                  Mashina modelini tanlang
                </option>

                {models.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                    className="text-black"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-white/30 text-white placeholder-gray-500 resize-none" placeholder="Izoh (ixtiyoriy)" rows={3}></textarea>
              <button  onClick={handleSubmit}
              className="w-full bg-white text-black py-4 text-xs sm:text-sm font-bold hover:bg-gray-200 transition-colors uppercase mt-2 sm:mt-4 tracking-wider rounded-md" type="submit">
                YUBORISH
              </button>
            </div>
          </div>
        </section>
        {/* END: Test Drive Form */}
        
        {/* BEGIN: Location Map */}
        <section className="max-w-7xl mx-auto px-0 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14 px-4 sm:px-0">
            <p className="text-xs sm:text-sm uppercase tracking-[4px] sm:tracking-[6px] text-gray-400 mb-2 sm:mb-3">
              Location
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              Bizning Manzil
            </h2>
            <div className="w-16 sm:w-24 h-[2px] bg-white/30 mx-auto mt-4 sm:mt-5"></div>
          </div>

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl grid grid-cols-1 md:grid-cols-3">
            <div className="absolute -top-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 blur-3xl rounded-full"></div>
            
            <div className="md:col-span-2 relative h-[300px] sm:h-[400px] md:h-[500px]">
              <iframe
                title="Kia Bukhara Map"
                src="https://www.google.com/maps?q=39.79501,64.44112&z=15&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-linear-to-t from-[#081520] via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-white shadow-xl">
                <h3 className="text-base sm:text-lg font-bold">Kia Bukhara</h3>
              </div>
            </div>

            <div className="relative z-10 p-6 sm:p-10 lg:p-12 bg-[#0b1623]/90 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-10">Showroom</h3>
              <div className="space-y-5 sm:space-y-7 text-gray-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm sm:text-base flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-1">Manzil</p>
                    <p className="text-xs sm:text-sm leading-5 sm:leading-7">Buxoro shahri, XHAY 23-uy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm sm:text-base flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-1">Telefon</p>
                    <p className="text-xs sm:text-sm">+998 71 215 70 07</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm sm:text-base flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-1">Ish vaqti</p>
                    <p className="text-xs sm:text-sm">Har kuni: 09:00 — 20:00</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:mt-12 flex flex-col gap-4">
                <a href="https://maps.google.com/?q=39.79501,64.44112" target="_blank" rel="noreferrer">
                  <button className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black text-xs sm:text-sm font-bold tracking-widest hover:scale-[1.02] transition-all duration-300 shadow-xl uppercase">
                    YO'NALISH OLISH
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* END: Location Map */}

      </main>

      {/* BEGIN: Footer */}
      <Footer/>
      {/* END: Footer */}
    </div>
  );
}

export default Home;