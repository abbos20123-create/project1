import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Car,
  Calendar,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

type OfferType = {
  id: number;
  name: string;
  phone: string;
  model: string;
  createdAt: string;
};

const AdminOffers = () => {
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/offers"
      );

      setOffers(data.reverse());

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOffer = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete offer?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      background: "#0d1b29",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/offers/${id}`
      );

      setOffers((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Offer deleted!");

    } catch (error) {
      console.log(error);

      toast.error("Delete failed!");
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="min-h-screen bg-[#08131d] text-white p-6">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">
            Offers
          </h1>

          <p className="text-gray-400 mt-1">
            Kredit arizalari
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl">
          <p className="text-sm text-gray-400">
            Jami arizalar
          </p>

          <h2 className="text-2xl font-bold">
            {offers.length}
          </h2>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {!loading && offers.length === 0 && (
        <div className="bg-[#0d1b29] border border-white/10 rounded-3xl py-24 text-center">
          <Car
            className="mx-auto mb-5 text-gray-500"
            size={60}
          />

          <h2 className="text-2xl font-bold mb-2">
            Arizalar mavjud emas
          </h2>

          <p className="text-gray-400">
            Hozircha hech kim ariza yubormagan
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {offers.map((item) => (
          <div
            key={item.id}
            className="bg-[#0d1b29] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300"
          >

            <div className="flex items-start justify-between mb-6">

              <div>
                <h2 className="text-2xl font-bold">
                  Kia {item.model}
                </h2>

                <p className="text-gray-400 mt-1">
                  Kredit arizasi
                </p>
              </div>

              <button
                onClick={() => deleteOffer(item.id)}
                className="w-11 h-11 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Mijoz
                  </p>

                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Telefon
                  </p>

                  <h3 className="font-semibold text-lg">
                    {item.phone}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                  <Car size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Model
                  </p>

                  <h3 className="font-semibold text-lg">
                    Kia {item.model}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Calendar size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Yuborilgan vaqt
                  </p>

                  <h3 className="font-semibold text-lg">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </h3>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOffers;