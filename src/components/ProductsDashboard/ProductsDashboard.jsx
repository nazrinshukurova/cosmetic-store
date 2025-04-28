import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import styles from "./ProductsDashboard.module.css";

function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    condition: "",
    images: "",
    isAvailable: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("AllProducts").select("*");
    if (error) console.error("Error fetching products:", error.message);
    else setProducts(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const { error } = await supabase
        .from("AllProducts")
        .delete()
        .eq("id", id);
      if (error) console.error("Error deleting product:", error.message);
      else fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async () => {
    const { id, ...updatedData } = editingProduct;
    const { error } = await supabase
      .from("AllProducts")
      .update(updatedData)
      .eq("id", id);
    if (error) console.error("Error updating product:", error.message);
    else {
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleAdd = async () => {
    setLoading(true); // Start loading
    const { error } = await supabase.from("AllProducts").insert([newProduct]);
    if (error) {
      console.error("Error adding product:", error.message);
    } else {
      // Optimistically update the state with the new product
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      // Clear the form
      setNewProduct({
        name: "",
        brand: "",
        condition: "",
        images: "",
        isAvailable: true,
      });
    }
    setLoading(false); // End loading
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Products Dashboard</h1>

        <input
          type="text"
          placeholder="Search by name or brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image"
            value={newProduct.images}
            onChange={(e) =>
              setNewProduct({ ...newProduct, images: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Condition (New, Used, Refurbished)"
            value={newProduct.condition}
            onChange={(e) =>
              setNewProduct({ ...newProduct, condition: e.target.value })
            }
          />
          <button
            onClick={handleAdd}
            className={styles.addButton}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Image URL</th>
              <th>Condition</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      value={editingProduct.brand}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          brand: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.brand
                  )}
                </td>
                <td>
                  <div className={styles.imageBox}>
                    {editingProduct?.id === product.id ? (
                      <input
                        value={editingProduct.images}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            images: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.images
                    )}
                  </div>
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      value={editingProduct.condition}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          condition: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.condition
                  )}
                </td>
                <td>{product.isAvailable ? "Available" : "Not Available"}</td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsDashboard;
