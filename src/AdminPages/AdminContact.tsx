import { useEffect } from "react";
import axios from "axios";
import {
  deleteContact,
  setContacts,
} from "../redux/contactSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hook";
import { toast } from "react-toastify";

function AdminContact() {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(
    (state) => state.contact.contacts
  );

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/contacts"
      );

      dispatch(setContacts(data));
    };

    getContacts();
  }, []);

  const handleDelete = async (id: number) => {
    toast.success("Contact request deleted successfully!");
    setTimeout(async() => {
      await axios.delete(
      `http://localhost:3000/contacts/${id}`
    );

    dispatch(deleteContact(id));
    }, 1500);
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Contact Requests
      </h1>

      <div className="space-y-5">
        {contacts.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {item.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {item.phone}
            </p>

            <p className="text-amber-300 mt-1">
              {item.model}
            </p>

            <button
              onClick={() =>
                handleDelete(item.id)
              }
              className="mt-5 px-5 py-2 rounded-xl bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContact;