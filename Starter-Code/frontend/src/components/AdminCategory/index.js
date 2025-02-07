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

  const addCategory = () => {
    axios
      .get("http://localhost:5000/category/getAllCategories")
      .then((response) => {
        dispatch(setCategories(response.data.Categories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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
          categories.map((category) => (
            <button key={category.id} className="category-button" onClick={() => handleCategoryClick(category)}>
              <img src={category.image} alt={category.category_name} className="category-image" />
              <h3>{category.category_name}</h3>
            </button>
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
            {selectedCategory.image && <img src={selectedCategory.image} alt={selectedCategory.category_name} className="modal-image" />}
            <p>{selectedCategory.description}</p>
            <p><strong>Price per KG:</strong> ${selectedCategory.price_per_kg}</p>
            <p><strong>Price per Dimensions:</strong> ${selectedCategory.price_per_dimensions}</p>
            <p><strong>Points per KG:</strong> {selectedCategory.points_per_kg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
