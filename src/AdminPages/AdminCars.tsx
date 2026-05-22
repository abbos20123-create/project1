import { useEffect, useState } from "react";
import { Car, ImageIcon, Tag, DollarSign, FileText, Save, X, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type CarModel = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  startingPrice: string;
  image: string;
  bgImage: string;
};

const emptyForm = {
  slug: "",
  name: "",
  category: "",
  description: "",
  startingPrice: "",
  image: "",
  bgImage: "",
};

function AdminCars() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCars = () => {
    setLoading(true);
    axios
      .get<CarModel[]>("http://localhost:3000/models")
      .then((res) => setCars(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (car: CarModel) => {
    setEditingId(car.id);
    setForm({
      slug: car.slug,
      name: car.name,
      category: car.category,
      description: car.description,
      startingPrice: car.startingPrice,
      image: car.image,
      bgImage: car.bgImage,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
  if (!form.name || !form.slug) return;

  setSaving(true);

  const newId = cars.length + 1;

  try {
    if (editingId !== null) {

      toast.success("Car updated successfully!");

      setTimeout(async() => {
        await axios.put(`http://localhost:3000/models/${editingId}`, {
        id: editingId,
        ...form,
      });
      }, 2000);

    } else {

      toast.success("Car added successfully!");

      setTimeout(async() => {
        await axios.post("http://localhost:3000/models", {
        id: newId,
        ...form,
      });
      }, 2000);

    }

    fetchCars();
    handleCancel();

  } finally {
    setSaving(false);
  }
};

  const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Car?",
    text: "buni amalni qaytarib bo'lmaydi!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    background: "#0f172a",
    color: "#fff",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`http://localhost:3000/models/${id}`);

    toast.success("Car deleted successfully!");

    fetchCars();

    if (editingId === id) {
      handleCancel();
    }

  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong while deleting.",
      icon: "error",
      background: "#0f172a",
      color: "#fff",
    });
  }
};

  const inputClass = `
    w-full h-12 px-4 rounded-2xl
    bg-black/40 border border-white/10
    text-white placeholder:text-zinc-600
    outline-none focus:border-amber-400/60
    focus:ring-4 focus:ring-amber-400/10
    transition-all duration-300 text-sm
  `;

  const fields = [
    { name: "name",         label: "Car Name",          icon: <Car size={15} />,       placeholder: "K5" },
    { name: "slug",         label: "Slug (URL key)",     icon: <Tag size={15} />,       placeholder: "k5" },
    { name: "category",     label: "Category",           icon: <Tag size={15} />,       placeholder: "SEDAN" },
    { name: "description",  label: "Description",        icon: <FileText size={15} />,  placeholder: "Business Sedan" },
    { name: "startingPrice",label: "Starting Price",     icon: <DollarSign size={15} />,placeholder: "349 900 000" },
    { name: "image",        label: "Card Image URL",     icon: <ImageIcon size={15} />, placeholder: "https://..." },
    { name: "bgImage",      label: "Hero BG Image URL",  icon: <ImageIcon size={15} />, placeholder: "https:// or /local.svg" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* ── TOP HEADER ── */}
      <div>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-2">
          Cars Control
        </p>
        <h1 className="text-4xl font-black tracking-tight text-white">
          {editingId !== null ? "Edit Car" : "Add New Car"}
        </h1>
        <p className="text-zinc-400 mt-2">
          {editingId !== null
            ? "Update the fields below, then click Save."
            : "Fill in the fields to add a new car to the lineup."}
        </p>
      </div>

      {/* ── INPUT FORM ── */}
      <div className="rounded-[28px] border border-white/10 bg-white/3 backdrop-blur-2xl p-8 shadow-2xl">

        {/* editing badge */}
        {editingId !== null && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/20">
            <Pencil size={15} className="text-amber-300" />
            <span className="text-amber-200 text-sm font-medium">
              Editing: <strong>{form.name}</strong>
            </span>
            <button
              onClick={handleCancel}
              className="ml-auto text-zinc-400 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* inputs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.name} className={f.name === "image" || f.name === "bgImage" ? "md:col-span-2" : ""}>
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                {f.icon}
                {f.label}
              </label>
              <input
                type="text"
                name={f.name}
                value={(form as any)[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-7 h-12 rounded-2xl bg-linear-to-r from-amber-300 to-amber-500 hover:scale-[1.02] active:scale-[0.99] text-black font-bold tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.2)] disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : editingId !== null ? "Save Changes" : "Add Car"}
          </button>

          {editingId !== null && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-7 h-12 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 text-zinc-300 font-semibold transition-all duration-300"
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ── CARS LIST ── */}
      <div>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-5">
          All Cars — {cars.length} total
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-amber-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                  ${editingId === car.id
                    ? "border-amber-400/40 bg-amber-400/5"
                    : "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
                  }
                `}
              >
                {/* car image thumbnail */}
                <div className="w-20 h-14 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-bold text-base">KIA {car.name}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {car.category}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs truncate">{car.description}</p>
                  <p className="text-zinc-400 text-xs mt-0.5 font-medium">{car.startingPrice} UZS dan</p>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(car)}
                    className={`
                      flex items-center gap-1.5 px-4 h-9 rounded-xl text-xs font-bold transition-all duration-300
                      ${editingId === car.id
                        ? "bg-amber-400 text-black"
                        : "border border-white/10 bg-white/4 text-zinc-300 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Pencil size={13} />
                    {editingId === car.id ? "Editing" : "Edit"}
                  </button>

                  <button
                    onClick={() => handleDelete(car.id)}
                    className="flex items-center gap-1.5 px-4 h-9 rounded-xl text-xs font-bold border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-300"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCars;