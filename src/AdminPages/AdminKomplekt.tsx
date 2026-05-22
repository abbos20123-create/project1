import { useEffect, useState } from "react";
import axios from "axios";
import {
  Save,
  Trash2,
  Pencil,
  X,
  Car,
  DollarSign,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

type Komplekt = {
  id: number;
  carId: number;
  name: string;
  price: string;
  features: string;
};

type CarModel = {
  id: number;
  name: string;
};

const emptyForm = {
  carId: 0,
  name: "",
  price: "",
  features: "",
};

function AdminKomplekt() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [items, setItems] = useState<Komplekt[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    const [carsRes, kompRes] = await Promise.all([
      axios.get("http://localhost:3000/models"),
      axios.get("http://localhost:3000/komplektatsiyalar"),
    ]);

    setCars(carsRes.data);
    setItems(kompRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!form.carId || !form.name) return;

    if (editingId !== null) {
      toast.success("Komplekt updated successfully!");
      setTimeout(async() => {
        await axios.put(
        `http://localhost:3000/komplektatsiyalar/${editingId}`,
        {
          id: editingId,
          ...form,
        }
      );
      }, 2000);
    } else {
      toast.success("Komplekt added successfully!");
      setTimeout(async() => {
        await axios.post(
        "http://localhost:3000/komplektatsiyalar",
        form
      );
      }, 2000);
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(
      `http://localhost:3000/komplektatsiyalar/${id}`
    );

    fetchData();
  };

  const handleEdit = (item: Komplekt) => {
    setEditingId(item.id);

    setForm({
      carId: item.carId,
      name: item.name,
      price: item.price,
      features: item.features,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const inputClass = `
    w-full h-12 px-4 rounded-2xl
    bg-black/40 border border-white/10
    text-white placeholder:text-zinc-600
    outline-none focus:border-amber-400/60
    transition-all duration-300 text-sm
  `;

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-2">
          Komplektatsiyalar
        </p>

        <h1 className="text-4xl font-black text-white">
          {editingId ? "Edit Komplekt" : "Add Komplekt"}
        </h1>
      </div>

      {/* FORM */}
      <div className="rounded-[28px] border border-white/10 bg-white/3 p-8">

        {editingId && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/20">
            <Pencil size={15} className="text-amber-300" />

            <span className="text-amber-200 text-sm">
              Editing: {form.name}
            </span>

            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* CAR SELECT */}
          <div>
            <label className="text-xs text-zinc-400 uppercase mb-2 block">
              Car Model
            </label>

            <select
              value={form.carId}
              onChange={(e) =>
                setForm({
                  ...form,
                  carId: Number(e.target.value),
                })
              }
              className={inputClass}
            >
              <option value={0}>Select car</option>

              {cars.map((car) => (
                <option
                  key={car.id}
                  value={car.id}
                  className="bg-black"
                >
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          {/* NAME */}
          <div>
            <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase mb-2">
              <Car size={14} />
              Komplekt Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Comfort"
              className={inputClass}
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase mb-2">
              <DollarSign size={14} />
              Price
            </label>

            <input
              type="text"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              placeholder="349 900 000"
              className={inputClass}
            />
          </div>

          {/* FEATURES */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase mb-2">
              <FileText size={14} />
              Features
            </label>

            <textarea
              value={form.features}
              onChange={(e) =>
                setForm({
                  ...form,
                  features: e.target.value,
                })
              }
              placeholder="LED fara, kamera..."
              className="w-full min-h-31 p-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-7 h-12 rounded-2xl bg-amber-400 text-black font-bold"
          >
            <Save size={16} />

            {editingId ? "Save Changes" : "Add Komplekt"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-7 h-12 rounded-2xl border border-white/10 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {items.map((item) => {
          const car = cars.find(
            (c) => c.id === item.carId
          );

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-white/10 bg-white/3"
            >
              <div className="flex justify-between gap-5">

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-bold text-lg">
                      {item.name}
                    </h2>

                    <span className="text-xs bg-amber-400/10 text-amber-300 px-2 py-1 rounded-full">
                      {car?.name}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm mt-1">
                    {item.price} UZS
                  </p>

                  <p className="text-zinc-500 text-sm mt-3">
                    {item.features}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">

                  <button
                    onClick={() => handleEdit(item)}
                    className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white flex items-center gap-2"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="h-10 px-4 rounded-xl border border-red-500/20 text-red-400 flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminKomplekt;