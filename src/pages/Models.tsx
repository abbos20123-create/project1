import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

type Model = {
  id: number;
  slug: string;
  name: string;
  category: string;
  startingPrice: string;
  image: string;
};

const aosDirections = ['fade-right', 'fade-left', 'fade-right', 'fade-left'];

const Models: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 50 });

    axios
      .get<Model[]>('http://localhost:3000/models')
      .then((res) => setModels(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#061520] text-white font-sans min-h-screen">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto w-full overflow-hidden">
        {/* Header */}
        <header className="mb-16">
          <h1
            data-aos="fade-left"
            className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white mb-4"
          >
            Barcha Modellar
          </h1>
          <p
            data-aos="fade-left"
            data-aos-delay="200"
            className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            Mukammallik sari yo'l. O'zingizga mos bo'lgan mukammal harakatni toping.
          </p>
        </header>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <article
                key={model.id}
                data-aos={aosDirections[index % 4]}
                data-aos-delay={((index % 4) + 1) * 100}
                className="group relative bg-[#12212c] rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] flex flex-col border border-white/5 hover:border-white/20"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-[#020f1a] p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    alt={`Kia ${model.name}`}
                    className="w-full h-auto object-contain object-center group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-2xl z-10"
                    src={model.image}
                  />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#b9c8d8] mb-1">
                    {model.category}
                  </span>
                  <h2 className="text-xl font-bold text-white mb-1">{model.name}</h2>
                  <p className="text-sm text-gray-400 flex-grow">
                    Boshlang'ich narxi: {model.startingPrice} UZS
                  </p>
                  <Link to={`/cars/${model.slug}`}>
                    <div className="mt-4 flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all duration-300 cursor-pointer w-fit border-b border-transparent group-hover:border-[#b9c8d8] pb-1">
                      Batafsil
                      <svg
                        className="w-4 h-4 text-[#b9c8d8]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Models;