import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Prashant giri",
    email: "giripras@gmail.com",
    phone: "980000000",
    address: "nepal",

  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={""}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200"
          />
          <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-500 mb-4">{user.email}</p>
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone</label>
            <p className="text-gray-800">{user.phone}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <p className="text-gray-800">{user.address}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <Link to="/Account/Dashboard" className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Admin Panel</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;