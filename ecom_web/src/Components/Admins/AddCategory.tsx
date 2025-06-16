import type React from "react";
import { useState } from "react";
import type { CategoryAdd } from "../../types/Category";
import { addCategory } from "../../api/categoryApi";

const AddCategory: React.FC = () => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;

    if (!name) {
      alert("Please enter a category name.");
      return;
    }

    const newCategory: CategoryAdd = { name };
    console.log("New Category:", newCategory);
    
    try{
      const response = addCategory(newCategory);
      alert("Category added successfully!");
      console.log("Category added:", response);
    }
    catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
      return;
    }
  
  };

 
  return (
    <div className="flex justify-center  text-black bg-gradient-to-br from-indigo-100 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create Category</h2>
        <form onSubmit={handleSubmit}  className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
            
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>


       

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory