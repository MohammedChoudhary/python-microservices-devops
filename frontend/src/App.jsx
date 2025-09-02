import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [products, setProducts] = useState([])

  // State for Add Product form
  const [newId, setNewId] = useState("")
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")

  // State for Update Product form
  const [updateId, setUpdateId] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updatePrice, setUpdatePrice] = useState("")

  // State for Delete Product form
  const [deleteId, setDeleteId] = useState("")

  // Fetch products when app loads
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/products")
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching products!", error)
      })
  }, [])

  return (
    <div>
      <h1>Product Management App</h1>

      {/* Product List Section */}
      <section>
        <h2>All Products</h2>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Product Section */}
      <section>
        <h2>Add Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios.post("http://127.0.0.1:5000/products", {
              id: parseInt(newId),
              name: newName,
              price: parseFloat(newPrice),
            })
            .then(() => axios.get("http://127.0.0.1:5000/products"))
            .then((response) => {
              setProducts(response.data);
              setNewId("");
              setNewName("");
              setNewPrice("");
            })
            .catch((error) => {
              console.error("Error adding product:", error);
            });
          }}
        >
          <input
            type="number"
            placeholder="ID"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      {/* Update Product Section */}
      <section>
        <h2>Update Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios.put(`http://127.0.0.1:5000/products/${updateId}`, {
              name: updateName,
              price: parseFloat(updatePrice),
            })
            .then(() => axios.get("http://127.0.0.1:5000/products"))
            .then((response) => {
              setProducts(response.data);
              setUpdateId("");
              setUpdateName("");
              setUpdatePrice("");
            })
            .catch((error) => {
              console.error("Error updating product:", error);
            });
          }}
        >
          <input
            type="number"
            placeholder="ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Name"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <input
            type="number"
            placeholder="New Price"
            value={updatePrice}
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </section>

      {/* Delete Product Section */}
      <section>
        <h2>Delete Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios.delete(`http://127.0.0.1:5000/products/${deleteId}`)
              .then(() => axios.get("http://127.0.0.1:5000/products"))
              .then((response) => {
                setProducts(response.data);
                setDeleteId("");
              })
              .catch((error) => {
                console.error("Error deleting product:", error);
              });
          }}
        >
          <input
            type="number"
            placeholder="ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button type="submit">Delete</button>
        </form>
      </section>
    </div>
  )
}

export default App
