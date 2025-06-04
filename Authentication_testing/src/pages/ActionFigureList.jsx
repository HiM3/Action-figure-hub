import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import "../assets/style.css";

const API_URL = `${import.meta.env.VITE_API_URL}/products/all`;

const ActionFigureList = () => {
  const [figures, setFigures] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_URL}`, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch figures");
        return res.json();
      })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setFigures(res.data);
        } else {
          setFigures([]);
          setError("Failed to load figures properly.");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load figures. Please try again later.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this figure?")) {
      fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: {
          'Accept': 'application/json'
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete figure");
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            setFigures((prev) => prev.filter((f) => f._id !== id));
          } else {
            throw new Error(res.message || "Failed to delete figure");
          }
        })
        .catch((err) => {
          alert(err.message || "Failed to delete figure. Please try again.");
        });
    }
  };

  const handleEdit = (figure) => {
    window.location.href = `/edit-figure/${figure._id}`;
  };

  const handleView = (figure) => {
    window.location.href = `/figure-details/${figure._id}`;
  };

  const filteredFigures = Array.isArray(figures)
    ? figures
        .filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        )
    : [];

  if (loading) {
    return (
      <main className="list-page-main-content loading-state">
        <div className="list-container text-center">
          <div className="loading-spinner primary-text-color" role="status" aria-hidden="true"></div>
          <h2 className="loading-message mt-3-custom">Loading action figures...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="list-page-main-content error-state">
        <div className="list-container text-center">
          <h2 className="error-message danger-text-color">{error}</h2>
          <button 
            className="btn-custom outline-primary-button mt-3-custom"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="list-page-main-content">
      <div className="list-container">
        <h1 className="list-page-heading">Action Figure Store</h1>

        {/* Controls */}
        <section className="list-controls">
          <input
            type="search"
            placeholder="Search by name..."
            className="custom-form-input search-input"
            style={{ maxWidth: 300 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="custom-button outline-primary-button shadow-button"
            onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          >
            Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </button>
        </section>

        {/* Grid */}
        {filteredFigures.length === 0 ? (
          <section className="no-results-message">
            <p className="no-results-text">No action figures match your search.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No results"
              className="no-results-image"
            />
          </section>
        ) : (
          <section className="figure-grid">
            {filteredFigures.map((figure) => (
              <article key={figure._id} className="figure-card-col">
                <div
                  className="figure-card"
                  tabIndex={0}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <Link
                    to={`/figure-details/${figure._id}`}
                    className="card-link-wrapper"
                    aria-label={`View details of ${figure.title}`}
                  >
                    <div className="figure-image-container">
                      {figure.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${figure.image}`}
                          alt={`Image of ${figure.title}`}
                          className="figure-image"
                          loading="lazy"
                        />
                      ) : (
                        <span className="no-image-text">No Image Available</span>
                      )}
                    </div>

                    <div className="figure-card-content">
                      <h5 className="figure-name">{figure.title}</h5>
                      <p className="figure-price">${Number(figure.price).toFixed(2)}</p>
                      <p className="figure-series muted-text">{figure.anime_name || "N/A"}</p>
                      <div className="figure-rating" aria-label="Rating: 4 out of 5 stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < 4 ? "#ffc107" : "#e4e5e9"}
                            size={18}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>

                  <div className="figure-card-buttons">
                    <button
                      className="custom-button primary-button icon-button"
                      onClick={() => handleEdit(figure)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="custom-button outline-warning-button icon-button"
                      onClick={() => handleView(figure)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="custom-button outline-danger-button icon-button"
                      onClick={() => handleDelete(figure._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Add New Button */}
        <section className="add-new-section">
          <Link
            to="/create-action-figure"
            className="custom-button primary-button lg-button shadow-button"
          >
            ➕ Add New Figure
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ActionFigureList;
