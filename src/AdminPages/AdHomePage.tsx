import { useEffect, useState } from "react";
import { Save, Video, Type, Upload } from "lucide-react";
import { updateHomepage } from "../redux/Slice";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";

function AdHomePage() {
  const dispatch = useAppDispatch();

  const home = useAppSelector((state) => state.home);

  const [name, setName] = useState(home.name);

  const [video, setVideo] = useState(home.video);

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const getHome = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/homepage"
    );

    dispatch(updateHomepage(data));

    setName(data.name);
    setVideo(data.video);
  };

  useEffect(() => {
    getHome();
  }, []);

  // upload file
  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setVideoFile(file);

    // preview
    const videoUrl = URL.createObjectURL(file);

    setVideo(videoUrl);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        video,
      };

      toast.success("Homepage updated successfully!");

      await axios.put(
        "http://localhost:3000/homepage",
        updatedData
      );

      dispatch(updateHomepage(updatedData));

    } catch (error) {
      console.error("Save failed:", error);

      toast.error("Failed to update homepage!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* top */}
      <div className="mb-10">
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-2">
          Homepage Control
        </p>

        <h1 className="text-4xl font-black tracking-tight text-white">
          Hero Section Editor
        </h1>

        <p className="text-zinc-400 mt-3 max-w-2xl">
          Change homepage hero title and background video dynamically.
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="rounded-[30px] border border-white/10 bg-white/3 backdrop-blur-2xl p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/20 flex items-center justify-center">
              <Save className="text-amber-300" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Update Homepage
              </h2>

              <p className="text-sm text-zinc-500">
                Edit homepage content
              </p>
            </div>
          </div>

          <div className="space-y-6">

            {/* name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                <Type size={16} />
                Car Name
              </label>

              <input
                type="text"
                placeholder="Enter car name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full h-14 px-5 rounded-2xl
                  bg-black/40
                  border border-white/10
                  text-white
                  placeholder:text-zinc-600
                  outline-none
                  focus:border-amber-400/60
                  focus:ring-4 focus:ring-amber-400/10
                  transition-all duration-300
                "
              />
            </div>

            {/* video upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                <Video size={16} />
                Upload Background Video
              </label>

              <label
                className="
                  w-full h-36 rounded-3xl
                  border-2 border-dashed border-white/10
                  bg-black/30
                  hover:border-amber-400/40
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  cursor-pointer
                  group
                "
              >
                <Upload
                  className="text-zinc-500 group-hover:text-amber-300 transition"
                  size={32}
                />

                <p className="mt-3 text-zinc-400 text-sm">
                  Click to upload video
                </p>

                <p className="text-zinc-600 text-xs mt-1">
                  MP4 recommended
                </p>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>

              {videoFile && (
                <p className="text-xs text-amber-300 mt-3">
                  {videoFile.name}
                </p>
              )}
            </div>

            {/* button */}
            <button
              onClick={handleSave}
              className="
                w-full h-14 rounded-2xl
                bg-linear-to-r from-amber-300 to-amber-500
                hover:scale-[1.02]
                active:scale-[0.99]
                text-black font-bold tracking-wide
                transition-all duration-300
                shadow-[0_0_30px_rgba(251,191,36,0.25)]
              "
            >
              Save Changes
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[30px] overflow-hidden border border-white/10 bg-black relative min-h-[500px]">

          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          >
            <source src={video} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end p-10">

            <p className="text-amber-300 uppercase tracking-[0.3em] text-xs mb-4">
              Live Preview
            </p>

            <h1 className="text-5xl font-black text-white leading-none tracking-tight">
              {name || "KIA"}
            </h1>

            <div className="mt-6 flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold">
                Explore
              </button>

              <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl text-white">
                Test Drive
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdHomePage;