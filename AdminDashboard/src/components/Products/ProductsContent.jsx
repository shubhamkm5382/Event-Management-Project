import React from "react";
import styles from "./ProductsContent.module.css";
import { Link } from "react-router-dom";

function ProductsContent() {
  return (
    <div>
      {/* Page Title Section */}
      <div className={`${styles.pageTitle} mb-4`}>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <h1 className="h3 fw-bold text-dark mb-0">Products</h1>
          <Link to="/add-product" className="btn btn-primary px-4 shadow-sm">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div
        className={`${styles.contentCard} p-4 shadow-sm rounded mb-4 bg-white`}
      >
        <div className="container-fluid">
          <div className="row g-3">
            {/* Select 1 */}
            <div className="col-lg-6">
              <select
                className="form-select"
                aria-label="Select category"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="1">Electronics</option>
                <option value="2">Clothing</option>
                <option value="3">Accessories</option>
              </select>
            </div>

            {/* Select 2 */}
            <div className="col-lg-6">
              <select
                className="form-select"
                aria-label="Select status"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="1">Available</option>
                <option value="2">Out of Stock</option>
                <option value="3">Upcoming</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="col-12 text-center mt-2">
              <button className="btn btn-success px-4">Search</button>
              <button className="btn btn-outline-danger ms-2 px-4">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className={`${styles.contentCard} p-4 shadow-sm rounded bg-white`}>
        <h5 className="mb-3 fw-semibold text-secondary">Product List</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsContent;
