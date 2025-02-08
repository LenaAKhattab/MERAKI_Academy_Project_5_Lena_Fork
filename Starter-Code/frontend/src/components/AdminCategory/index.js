import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, addCategory } from "../../redux/reducers/adminCategories";
import "./AdminCategory.css";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.adminCategories.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    description: "",
    image: "",
    price_per_kg: "",
    price_per_dimensions: "",
    points_per_kg: "",
  });

  const getCategories = () => {
    axios
      .get("http://localhost:5000/category/getAllCategories")
      .then((response) => {
        dispatch(setCategories(response.data.Categories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleAddCategory = () => {
    console.log(newCategory);
    
    axios
      .post("http://localhost:5000/category/addCategory", newCategory)
      .then((response) => {
        dispatch(addCategory(response.data.newCategory)); 
        setNewCategory({
          category_name: "",
          description: "",
          image: "",
          price_per_kg: "",
          price_per_dimensions: "",
          points_per_kg: "",
        });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="admin-category-container">
      <h2>Categories Page</h2>
      <button onClick={getCategories}>Fetch Categories</button>
      <div className="categories-list">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            category ? (
              <button key={category.id || index} className="category-button" onClick={() => handleCategoryClick(category)}>
                {category.image ? (
                  <img src={category.image} alt={category.category_name} className="category-image" />
                ) : (
                  <div className="placeholder-image">No Image</div> 
                )}
                <h3>{category.category_name}</h3>
              </button>
            ) : null
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      {showModal && selectedCategory && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h3>{selectedCategory.category_name}</h3>
            {selectedCategory.image ? (
              <img src={selectedCategory.image} alt={selectedCategory.category_name} className="modal-image" />
            ) : (
              <div className="placeholder-image">No Image Available</div> 
            )}
            <p>{selectedCategory.description}</p>
            <p><strong>Price per KG:</strong> ${selectedCategory.price_per_kg}</p>
            <p><strong>Price per Dimensions:</strong> ${selectedCategory.price_per_dimensions}</p>
            <p><strong>Points per KG:</strong> {selectedCategory.points_per_kg}</p>
          </div>
        </div>
      )}

      <div className="addnew-category">
        <h3>Add New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.category_name}
          onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.image}
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price per KG"
          value={newCategory.price_per_kg}
          onChange={(e) => setNewCategory({ ...newCategory, price_per_kg: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price per Dimensions"
          value={newCategory.price_per_dimensions}
          onChange={(e) => setNewCategory({ ...newCategory, price_per_dimensions: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points per KG"
          value={newCategory.points_per_kg}
          onChange={(e) => setNewCategory({ ...newCategory, points_per_kg: e.target.value })}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default AdminCategory;
