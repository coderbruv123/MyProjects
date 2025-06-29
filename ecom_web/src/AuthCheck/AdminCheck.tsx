import type { JSX } from "react";
import { Link } from "react-router-dom";



export function AdminRoute({ children }: { children: JSX.Element }) {
    const user = JSON.parse(localStorage.getItem("info") || "{}");

    if(user.role !== "Admin") {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
        <Link to="/" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Go Home</Link>
        </div>
    }

  return children;
}

export default AdminRoute;
