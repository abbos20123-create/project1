import { useEffect } from "react";
import axios from "axios";

import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hook";
import { deleteTestDrive, setTestDrives, type TestDriveType } from "../redux/testDriveSlice";
import { toast } from "react-toastify";

function AdminTestdrive() {
  const dispatch = useAppDispatch();

  const testdrives = useAppSelector(
    (state) => state.testdrive.data
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          "http://localhost:3000/testdrives"
        );

        dispatch(setTestDrives(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id: number) => {
    toast.success("Test drive request deleted successfully!");
    
    setTimeout(async() => {
      await axios.delete(`http://localhost:3000/testdrives/${id}`);
    dispatch(deleteTestDrive(id));
    }, 1500);

  };

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-10">
        Test Drive Requests
      </h1>

      <div className="grid gap-5">
        {testdrives.map(
          (item: TestDriveType) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-white/10 p-5 rounded-xl flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">
                {item.name}
              </h2>

              <p>
                <span className="font-semibold">
                  Telefon:
                </span>{" "}
                {item.phone}
              </p>

              <p>
                <span className="font-semibold">
                  Model:
                </span>{" "}
                {item.model}
              </p>

              <p>
                <span className="font-semibold">
                  Izoh:
                </span>{" "}
                {item.comment}
              </p>
              </div>
              <div>
                <button onClick={()=>handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition duration-300">delete</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminTestdrive;