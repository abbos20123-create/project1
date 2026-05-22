import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import 'rodal/lib/rodal.css';

import Header from './Header';
import Footer from './Footer';
import Rodal from 'rodal';

type Komplektatsiya = {
  id: string;
  carId: number;
  name: string;
  price: string;
  features: string;
};

type CarModel = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  startingPrice: string;
  bgImage: string;
};

const Car: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [car, setCar] = useState<CarModel | null>(null);
  const [komplektatsiyalar, setKomplektatsiyalar] = useState<Komplektatsiya[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // MODAL
  const [visible, setVisible] = useState(false);
  const [selectedKomplekt, setSelectedKomplekt] =
    useState<Komplektatsiya | null>(null);

  // FORM
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });

    axios
      .get<CarModel[]>(`http://localhost:3000/models?slug=${slug}`)
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
          return;
        }

        const found = res.data[0];
        setCar(found);

        return axios
          .get<Komplektatsiya[]>(
            `http://localhost:3000/komplektatsiyalar?carId=${found.id}`
          )
          .then((r) => setKomplektatsiyalar(r.data));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // OPEN MODAL
  const openModal = (k: Komplektatsiya) => {
    setSelectedKomplekt(k);
    setVisible(true);
  };

  // SAVE ORDER
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car || !selectedKomplekt) return;

    const newOrder = {
      name,
      phone,
      car: car.name,
      komplektatsiya: selectedKomplekt.name,
      price: selectedKomplekt.price,
    };

    try {
      await axios.post('http://localhost:3000/orders', newOrder);

      alert("Buyurtma yuborildi!");

      setName('');
      setPhone('');
      setVisible(false);
    } catch (error) {
      console.log(error);
      alert("Xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#05141f] text-white min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !car) {
    return (
      <div className="bg-[#05141f] text-white min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Avtomobil topilmadi
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#05141f] text-white min-h-screen">

      <Header />

      {/* HERO */}
      <section className="relative pt-16 w-full min-h-[600px] flex items-center bg-black overflow-hidden">

        <div className="absolute inset-0">
          <img
            src={car.bgImage}
            alt={car.name}
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#05141f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <p className="uppercase tracking-[4px] text-gray-300 mb-3">
            {car.description}
          </p>

          <h1 className="text-6xl font-black mb-6">
            KIA {car.name}
          </h1>

          <p className="text-4xl font-bold">
            {car.startingPrice} UZS
          </p>

        </div>
      </section>

      {/* KOMPLEKTATSIYA */}
      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-14 text-center">
            Komplektatsiyalar
          </h2>

          <div className="space-y-5">

            {komplektatsiyalar.map((k) => (
              <div
                key={k.id}
                className="bg-[#0a1d2d] rounded-2xl p-7 border border-white/10 hover:border-white/30 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {k.name}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {k.features}
                    </p>

                    <p className="text-3xl font-bold">
                      {k.price} UZS
                    </p>
                  </div>

                  <button
                    onClick={() => openModal(k)}
                    className="bg-white text-[#05141f] px-8 py-4 rounded-xl font-bold uppercase hover:bg-gray-200 transition"
                  >
                    Sotib olish
                  </button>

                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="py-20 bg-[#0a1d2d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2" data-aos="fade-right">
              <img 
                alt="Kia K5 Interior Tech" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCxIKzU_pG71i9AbmdUgCFiM2YPGWN4BQ2BEG7AqSx6HG91gfDfsAAsvaIgIdRNiIYEWc8cI5RwHSHWgjX-SW_um3OKDxmGc9xKWVjOWgNvLNRYmlIk5Nuo85PLJv8Q8WhKqxCLQMxy1iU2gVmIpV9NcSvv06yIfCUMLoyahTPo8MuW3iVFVFkV6zOArEgEhrYNjQhPPb5GA99vOdJWY-3T0IWRHnC0Ce-z7GPLzOwHzX5jx7KOJA0VjVGYY_mPeKdk28tRNXZoY"
              />
            </div>
            <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Aqlli texnologiyalar va mislsiz qulaylik</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                K5 interyeri haydovchi atrofida qurilgan. 12.3 dyuymli ekran barcha kerakli ma'lumotlarni ko'z oldingizda ushlab turadi, yuqori sifatli materiallar esa har bir safarni birinchi darajali tajribaga aylantiradi.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2" data-aos="fade-left">
              <img 
                alt="Kia K5 Interior Detail" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8IQmOsW3erYdYyn_HY4LedLNMBwAuLkpg50q2IGsXirtCKH_AZqTLrBF2Ht05tGe9poF7UmFEr7_r1yBN8OHdKTEni3AgGpgtZYXxdZywStRqyFVb-YH5GTwoAKaW3xoKZzhzDd0FG9hShKK4qDcEekK7EoS1oU5PmKT3yrzAPj5ndJ0jIcPgMkl9owqpQdvnQLnaAz8Xpsok96Pt9Zh-y39ohEU3fjFdEzmSFf04-tEtI5ty_aBdRfRwMtFVdWKAG6ZRcK1cPic"
              />
            </div>
            <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-delay="200">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Mukammal va sportiv dizayn</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                O'zining yangilangan tashqi qiyofasi bilan K5 avtomobili ko'chalarda hammadan ajralib turadi. Aerodinamik chiziqlar nafaqat estetik go'zallik, balki yo'lda o'ziga ishonchni ta'minlaydi.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      <Rodal
        visible={visible}
        onClose={() => setVisible(false)}
        width={500}
        height={420}
        customStyles={{
          background: '#081520',
          borderRadius: '20px',
          padding: '30px',
          height: '600px',
        }}
      >

        <h2 className="text-3xl font-bold mb-8 text-white">
          Buyurtma berish
        </h2>

        <form
          onSubmit={handleOrder}
          className="space-y-5"
        >

          <div>
            <p className="text-gray-400 text-sm mb-2">
              Mashina
            </p>

            <div className="bg-[#10202d] p-4 rounded-xl text-white">
              {car.name}
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">
              Komplektatsiya
            </p>

            <div className="bg-[#10202d] p-4 rounded-xl text-white">
              {selectedKomplekt?.name}
            </div>
          </div>

          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[#10202d] border border-white/10 rounded-xl px-4 py-4 outline-none text-white"
          />

          <input
            type="text"
            placeholder="Telefon raqam"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-[#10202d] border border-white/10 rounded-xl px-4 py-4 outline-none text-white"
          />

          <button
            type="submit"
            className="w-full bg-white text-[#05141f] py-4 rounded-xl font-bold uppercase hover:bg-gray-200 transition"
          >
            Yuborish
          </button>

        </form>

      </Rodal>

      <Footer />

    </div>
  );
};

export default Car;