import './AdminCategory.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, addCategory, deleteCategory, updateCategory } from "../../redux/reducers/adminCategories";
import { Trash2, Edit, Check, X } from "lucide-react";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.adminCategories.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    description: "",
    image: "",
    price_per_kg: "",
    price_per_dimensions: "",
    points_per_kg: "",
  });
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/getAllCategories")
      .then((response) => {
        dispatch(setCategories(response.data.Categories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [dispatch]);

  const handleAddCategory = () => {
    axios
      .post("http://localhost:5000/category/addCategory", newCategory)
      .then((response) => {
        dispatch(addCategory(newCategory));
        setNewCategory({
          category_name: "",
          description: "",
          image: "",
          price_per_kg: "",
          price_per_dimensions: "",
          points_per_kg: "",
        });
        setShowAddCategoryForm(false);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`http://localhost:5000/category/${categoryId}`)
      .then(() => {
        dispatch(deleteCategory(categoryId));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleUpdateCategory = () => {
    if (!editedCategory) return;

    axios
      .put(`http://localhost:5000/category/${editedCategory.id}`, editedCategory)
      .then((response) => {
        dispatch(updateCategory(editedCategory));
        cancelEdit();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  const handleViewDetails = (category) => { //skip this
    setSelectedCategory(category);
    setShowModal(true);
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditedCategory({ ...category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedCategory(null);
  };

  const handleEditChange = (field, value) => {
    setEditedCategory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderTableRow = (category, index) => {
    if (!category) return null;
    const isEditing = editingId === category.id;

    return (
      <tr key={category.id || index} className="table-row">
        <td className="table-cell">
          {isEditing ? (
            <input
              type="text"
              value={editedCategory.image}
              onChange={(e) => handleEditChange('image', e.target.value)}
              className="form-input"
            />
          ) : (
            <>
              {category.image ? (
                <img src={category.image} alt={category.category_name} className="category-img" />
              ) : (
                <div className="img-placeholder">No Image</div>
              )}
            </>
          )}
        </td>
        <td className="table-cell">
          {isEditing ? (
            <input
              type="text"
              value={editedCategory.category_name}
              onChange={(e) => handleEditChange('category_name', e.target.value)}
              className="form-input"
            />
          ) : (
            category.category_name
          )}
        </td>
        <td className="table-cell">
          {isEditing ? (
            <input
              type="text"
              value={editedCategory.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              className="form-input"
            />
          ) : (
            category.description
          )}
        </td>
        <td className="table-cell">
          {isEditing ? (
            <input
              type="number"
              value={editedCategory.price_per_kg}
              onChange={(e) => handleEditChange('price_per_kg', e.target.value)}
              className="form-input"
            />
          ) : (
            `$${category.price_per_kg}`
          )}
        </td>
        <td className="table-cell">
          {isEditing ? (
            <input
              type="number"
              value={editedCategory.price_per_dimensions}
              onChange={(e) => handleEditChange('price_per_dimensions', e.target.value)}
              className="form-input"
            />
          ) : (
            `$${category.price_per_dimensions}`
          )}
        </td>
        <td className="table-cell">
          {isEditing ? (
            <input
              type="number"
              value={editedCategory.points_per_kg}
              onChange={(e) => handleEditChange('points_per_kg', e.target.value)}
              className="form-input"
            />
          ) : (
            category.points_per_kg
          )}
        </td>
        <td className="table-cell">
          <div className="action-buttons">
            {isEditing ? (
              <>
                <Check
                  className="icon-btn icon-save"
                  size={20}
                  onClick={handleUpdateCategory}
                />
                <X
                  className="icon-btn icon-cancel"
                  size={20}
                  onClick={cancelEdit}
                />
              </>
            ) : (
              <>
                <Edit
                  className="icon-btn icon-edit"
                  size={20}
                  onClick={() => startEdit(category)}
                />
                <Trash2
                  className="icon-btn icon-delete"
                  size={20}
                  onClick={() => handleDeleteCategory(category.id)}
                />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="admin-container">
      <div className="modal-header">
        <h2 className="modal-title">Categories Management</h2>
      </div>

      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="table-header">Image</th>
              <th className="table-header">Name</th>
              <th className="table-header">Description</th>
              <th className="table-header">Price/KG</th>
              <th className="table-header">Price/Dim</th>
              <th className="table-header">Points/KG</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 ? (
              categories.filter(Boolean).map((category, index) => renderTableRow(category, index))
            ) : (
              <tr>
                <td colSpan="7" className="table-cell" style={{ textAlign: "center" }}>
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
        className="btn btn-green"
      >
        {showAddCategoryForm ? "Cancel" : "Add New Category"}
      </button>

      {showAddCategoryForm && (
        <div className="form-container">
          <h3 className="form-title">Add New Category</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.category_name}
              onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newCategory.image}
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Price per KG"
              value={newCategory.price_per_kg}
              onChange={(e) => setNewCategory({ ...newCategory, price_per_kg: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Price per Dimensions"
              value={newCategory.price_per_dimensions}
              onChange={(e) => setNewCategory({ ...newCategory, price_per_dimensions: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Points per KG"
              value={newCategory.points_per_kg}
              onChange={(e) => setNewCategory({ ...newCategory, points_per_kg: e.target.value })}
              className="form-input"
            />
          </div>
          <button
            onClick={handleAddCategory}
            className="btn btn-green"
            style={{ marginTop: "16px" }}
          >
            Add Category
          </button>
        </div>
      )}

      {showModal && selectedCategory && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedCategory.category_name}</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">×</button>
            </div>
            {selectedCategory.image && (
              <img
                src={selectedCategory.image}
                alt={selectedCategory.category_name}
                className="category-img"
                style={{ width: "100%", height: "200px" }}
              />
            )}
            <div style={{ marginTop: "16px" }}>
              <p>{selectedCategory.description}</p>
              <p><strong>Price per KG:</strong> ${selectedCategory.price_per_kg}</p>
              <p><strong>Price per Dimensions:</strong> ${selectedCategory.price_per_dimensions}</p>
              <p><strong>Points per KG:</strong> {selectedCategory.points_per_kg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;