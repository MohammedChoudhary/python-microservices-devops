from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# temporary in-memory "database"
products = []

@app.route("/")
def home():
    return "Let's check, Backend is working!"

# CREATE product (POST)
@app.route("/products", methods=["POST"])
def create_product():
    data = request.get_json()
    products.append(data)
    return jsonify({"message": "Product added"}), 201

# READ all products (GET)
@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products), 200

# READ one product by ID (GET)
@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    for product in products:
        if product["id"] == product_id:
            return jsonify(product), 200
    return jsonify({"message": "Product not found"}), 404


# UPDATE product by ID (PUT)
@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()
    for product in products:
        if product["id"] == product_id:
            product["name"] = data.get("name", product["name"])
            product["price"] = data.get("price", product["price"])
            return jsonify({"message": "Product updated"}), 200
    return jsonify({"message": "Product not found"}), 404


# DELETE product by ID (DELETE)
@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    for product in products:
        if product["id"] == product_id:
            products.remove(product)
            return jsonify({"message": "Product deleted"}), 200
    return jsonify({"message": "Product not found"}), 404


# --- server actually runs ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
