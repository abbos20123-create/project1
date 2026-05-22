import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";

type CarModel = {
  id: number;
  slug: string;
  name: string;
  image: string;
};

const Offers: React.FC = () => {
  const [models, setModels] = useState<CarModel[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });

    axios
      .get("http://localhost:3000/models")
      .then((res) => setModels(res.data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.model
    ) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }

    try {
      await axios.post("http://localhost:3000/offers", {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      });

      toast.success("Ariza yuborildi!");

      setFormData({
        name: "",
        phone: "",
        model: "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <div className="bg-[#061520] text-[#d5e4f4] antialiased font-sans min-h-screen flex flex-col selection:bg-[#b9c8d8] selection:text-[#24323e]">
      
      <style>
        {`
          .text-glow {
            text-shadow: 0 0 30px rgba(185, 200, 216, 0.3);
          }

          .animate-float-slow {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      <Header />

      <main className="flex-grow pt-0">

        <section className="relative w-full flex items-center justify-start overflow-hidden bg-[#061520] h-[500px] md:h-[750px]">

          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover object-center opacity-60"
              data-aos="zoom-out"
              data-aos-duration="2000"
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop"
              alt="Kia"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#061520] via-[#061520]/60 to-transparent"></div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#061520] via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 w-full">
            <div className="max-w-3xl">

              <span
                data-aos="fade-right"
                data-aos-delay="100"
                className="text-[#b9c8d8] font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 block text-xs md:text-sm"
              >
                Maxsus Taklif
              </span>

              <h1
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-5xl md:text-7xl lg:text-[6rem] font-black text-[#d5e4f4] tracking-tighter leading-[1] md:leading-[0.9] mb-6 md:mb-8 text-glow"
              >
                Kredit <br className="hidden md:block" />
                <span className="text-[#b9c8d8]">
                  Takliflari
                </span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="500"
                className="text-[#c4c7cc] text-lg md:text-2xl max-w-xl font-light leading-relaxed mb-8 md:mb-10"
              >
                Orzuingizdagi Kia avtomobili endi yanada yaqinroq.
                Imtiyozli shartlar va tezkor rasmiylashtirish.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="700"
                className="flex flex-col sm:flex-row gap-4"
              >

                <a
                  href="#apply"
                  className="bg-[#b9c8d8] text-[#24323e] px-8 py-4 font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-sm hover:bg-[#d5e4f4] transition-colors text-center shadow-[0_10px_30px_rgba(185,200,216,0.2)] hover:shadow-[0_15px_40px_rgba(185,200,216,0.4)] hover:-translate-y-1 animate-float-slow block"
                >
                  Arizani qoldirish
                </a>

                <div className="flex items-center justify-center gap-3 px-6 py-4 border border-[#8e9196]/30 text-[#d5e4f4] rounded-sm bg-[#061520]/50 backdrop-blur-md">
                  <span className="font-bold tracking-wide text-sm md:text-base">
                    Yillik 12% dan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-[#061520] px-6 md:px-8 border-t border-[#8e9196]/10">

          <div className="max-w-7xl mx-auto">

            <div
              className="mb-12 md:mb-20 text-center md:text-left"
              data-aos="fade-right"
            >
              <span className="text-[#b9c8d8] font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 block text-[10px] md:text-xs">
                Imtiyozli Avtomobillar
              </span>

              <h2 className="text-4xl md:text-6xl font-black text-[#d5e4f4] tracking-tighter">
                Mavjud Modellar
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

              {models.map((car, idx) => (
                <Link
                  to={`/models/${car.slug}`}
                  key={car.id}
                  data-aos="fade-up"
                  data-aos-delay={100 * (idx % 4)}
                  className="bg-[#0e1d28] p-4 md:p-6 group hover:bg-[#1d2b37] transition-all duration-500 rounded-xl border border-[#8e9196]/10 hover:border-[#b9c8d8]/30 shadow-lg cursor-pointer block"
                >

                  <div className="aspect-16/10 mb-4 md:mb-6 overflow-hidden rounded-lg bg-[#283642]">

                    <img
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      src={car.image}
                    />
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-[#d5e4f4] group-hover:text-[#b9c8d8] transition-colors tracking-tight text-center md:text-left">
                    Kia {car.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="apply"
          className="py-20 md:py-40 bg-[#061520] px-4 md:px-8 relative overflow-hidden border-t border-[#8e9196]/10"
        >

          <div className="max-w-6xl mx-auto relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <div data-aos="fade-right">

                <h2 className="text-4xl md:text-6xl font-black text-[#d5e4f4] tracking-tighter mb-4 md:mb-8 leading-tight text-center lg:text-left">
                  Arizani qoldirish
                </h2>

                <p className="text-[#c4c7cc] text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
                  Mutaxassislarimiz siz bilan 10 daqiqa ichida bog'lanishadi.
                </p>
              </div>

              <div
                data-aos="fade-left"
                className="bg-[#061520]/50 backdrop-blur-2xl p-6 md:p-12 rounded-xl shadow-2xl border border-[#8e9196]/20 w-full"
              >

                <div className="space-y-6 md:space-y-8">

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c4c7cc] ml-1">
                      To'liq ismingiz
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#283642]/50 border border-[#8e9196]/30 focus:border-[#b9c8d8] focus:ring-1 focus:ring-[#b9c8d8] text-[#d5e4f4] p-3 md:p-4 rounded-lg backdrop-blur-sm transition-all outline-none"
                      placeholder="Masalan: Aziz Azizov"
                      type="text"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c4c7cc] ml-1">
                      Telefon raqamingiz
                    </label>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#283642]/50 border border-[#8e9196]/30 focus:border-[#b9c8d8] focus:ring-1 focus:ring-[#b9c8d8] text-[#d5e4f4] p-3 md:p-4 rounded-lg backdrop-blur-sm transition-all outline-none"
                      placeholder="+998 __ ___ __ __"
                      type="tel"
                    />
                  </div>

                  <div className="space-y-2">

                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c4c7cc] ml-1">
                      Qiziqtirgan model
                    </label>

                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full bg-[#283642]/50 border border-[#8e9196]/30 focus:border-[#b9c8d8] focus:ring-1 focus:ring-[#b9c8d8] text-[#d5e4f4] p-3 md:p-4 rounded-lg outline-none backdrop-blur-sm transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Modelni tanlang</option>

                      {models.map((car) => (
                        <option
                          key={car.id}
                          value={car.name}
                          className="bg-[#0e1d28] text-white"
                        >
                          Kia {car.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="w-full bg-[#b9c8d8] text-[#24323e] font-black uppercase tracking-[0.2em] py-4 md:py-5 text-xs md:text-sm rounded-lg hover:bg-[#d5e4f4] transition-colors shadow-lg shadow-[#b9c8d8]/20 mt-4"
                    onClick={handleSubmit}
                  >
                    Yuborish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Offers;