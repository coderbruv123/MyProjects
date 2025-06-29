import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("info") || "{}");
  console.log(user);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
        
          <h2 className="text-2xl text-blue-600 font-semibold mb-1"> Username: {user.name}</h2>
          <p className="text-gray-500 mb-4"> Email: {user.email}</p>
        </div>
      
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
          { user.role === "Admin" &&
          <Link to="/Account/Dashboard" className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Admin Panel</Link>}
        </div>
      </div>
    </div>
  );
};

export default Profile;