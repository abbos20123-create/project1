import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Car,
  Package,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";

type OrderType = {
  id: string;
  name: string;
  phone: string;
  car: string;
  komplektatsiya: string;
  createdAt: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/orders");
      setOrders(data.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    background: "#0d1b29",
    color: "#fff",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
    await axios.delete(`http://localhost:3000/orders/${id}`);

    setOrders((prev) =>prev.filter((item) => item.id !== id));

    Swal.fire({
      title: "Deleted!",
      text: "Order has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#0d1b29",
      color: "#fff",
    });
  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong.",
      icon: "error",
      background: "#0d1b29",
      color: "#fff",
    });
  }
};

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#08131d] text-white p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">Orders</h1>
          <p className="text-gray-400 mt-1">
            Barcha sotib olish buyurtmalari
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Jami buyurtma</p>
          <h2 className="text-2xl font-bold">{orders.length}</h2>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* EMPTY */}
      {!loading && orders.length === 0 && (
        <div className="bg-[#0d1b29] border border-white/10 rounded-3xl py-24 text-center">
          <Package className="mx-auto mb-5 text-gray-500" size={60} />
          <h2 className="text-2xl font-bold mb-2">
            Buyurtmalar mavjud emas
          </h2>
          <p className="text-gray-400">
            Hozircha hech kim buyurtma yubormagan
          </p>
        </div>
      )}

      {/* ORDERS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {orders.map((item) => (
          <div
            key={item.id}
            className="bg-[#0d1b29] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300"
          >
            {/* TOP */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {item.car}
                </h2>

                <p className="text-gray-400 mt-1">
                  {item.komplektatsiya}
                </p>
              </div>

              <button
                onClick={() => deleteOrder(item.id)}
                className="w-11 h-11 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* INFO */}
            <div className="space-y-4">
              {/* USER */}
              <div className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Mijoz</p>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Telefon</p>
                  <h3 className="font-semibold text-lg">{item.phone}</h3>
                </div>
              </div>

              {/* CAR */}
              <div className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                  <Car size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Avtomobil</p>
                  <h3 className="font-semibold text-lg">
                    {item.car}
                  </h3>
                </div>
              </div>

              {/* KOMPLEKT */}
              <div className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Package size={20} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Komplektatsiya
                  </p>
                  <h3 className="font-semibold text-lg">
                    {item.komplektatsiya}
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

export default AdminOrders;