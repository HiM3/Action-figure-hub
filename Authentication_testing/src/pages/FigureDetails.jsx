import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";
import "../assets/style.css"; // Import custom styles

const API_URL = "https://682604ee397e48c91314a719.mockapi.io/figures";

const FigureDetails = () => {
  const { id } = useParams();
  const [figure, setFigure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Figure not found");
        return res.json();
      })
      .then((data) => {
        setFigure(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    alert(`${quantity} x ${figure.name} added to cart!`);
    // Replace with real cart logic as needed
  };

  if (loading)
    return (
      <>
        {/* <Navbar /> */}
        <main
          className="details-page-main-content loading-state text-center"
          aria-live="assertive"
          aria-busy="true"
        >
          <div
            className="loading-spinner primary-text-color"
            role="status"
            aria-hidden="true"
          ></div>
          <p className="loading-message mt-3-custom fs-5-custom fw-light-custom">Loading figure details...</p>
        </main>
      </>
    );

  if (error)
    return (
      <>
        {/* <Navbar /> */}
        <main
          className="details-page-main-content error-state text-center danger-text-color fs-5-custom fw-semibold-custom"
          aria-live="assertive"
        >
          {error}
          <div className="mt-3-custom">
            <Link to="/action-figures" className="btn-custom outline-primary-button">
              ← Back to List
            </Link>
          </div>
        </main>
      </>
    );

  return (
    <>
      <Helmet>
        <title>
          {figure ? `${figure.name} | Action Figure Details` : "Loading..."}
        </title>
      </Helmet>

      {/* <Navbar /> */}
      <main className="details-page-main-content">
        <div className="details-container">
          <Link to="/action-figures" className="btn-custom outline-secondary-button mb-4-custom shadow-button">
            ← Back to List
          </Link>

          <div className="figure-details-card card-style" style={{ maxWidth: 700, margin: "0 auto" }}> {/* Keep inline margin for centering */}
            {/* Image */}
            <div className="figure-image-display justify-content-center-custom mb-5-custom">
              <div
                className="figure-image-wrapper"
                style={{
                  width: 400,
                  height: 400,
                  borderRadius: "1.5rem",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.12)",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0", // Keep specific color for now
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {figure.image ? (
                  <img
                    src={figure.image}
                    alt={figure.name}
                    className="figure-image-details"
                    loading="lazy"
                  />
                ) : (
                  <span className="no-image-text muted-text fs-5-custom">No Image Available</span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="figure-details-content" style={{ color: "#222", textAlign: "left" }}> {/* Keep inline color/text-align if specific */} 
              <h1 className="figure-name-details fw-bold-custom mb-4-custom" style={{ color: "#2c3e50" }}> {/* Keep specific color */} 
                {figure.name}
              </h1>

              <button
                onClick={toggleFavorite}
                className={`btn-custom mb-4-custom flex-align-center gap-2-custom px-4-custom py-2-custom ${isFavorite ? "btn-danger-custom" : "btn-outline-danger-custom"}`}
                aria-pressed={isFavorite}
                style={{ fontWeight: "600", fontSize: "1.1rem", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                {isFavorite ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <p className="figure-series fs-5-custom mb-2-custom">
                <strong>Series / Franchise: </strong>
                <span className="muted-text">{figure.series || "N/A"}</span>
              </p>

              <p
                className="figure-price-details fs-3-custom fw-bold-custom mb-4-custom"
                style={{ color: "#27ae60", letterSpacing: "0.03em" }} // Keep specific color/spacing
              >
                ${Number(figure.price).toFixed(2)}
              </p>

              <div className="quantity-control flex-align-center mb-4-custom gap-3-custom">
                <label
                  htmlFor="quantity"
                  className="form-label-custom fw-semibold-custom mb-0-custom"
                  style={{ fontSize: "1.1rem" }}
                >
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-input-custom w-25-custom text-center-custom"
                  aria-label="Select quantity"
                  style={{
                    borderRadius: "0.5rem",
                    border: "1.5px solid #ddd",
                    fontSize: "1.1rem",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#27ae60")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-custom success-button flex-align-center gap-2-custom px-5-custom py-3-custom fw-semibold-custom shadow-button"
                style={{
                  fontSize: "1.25rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 6px 12px rgba(39, 174, 96, 0.5)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e8449";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#27ae60";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaCartPlus size={24} />
                Add to Cart
              </button>

              <div className="mt-5-custom">
                <h4 className="figure-description-heading fw-semibold-custom mb-3-custom" style={{ color: "#34495e" }}> {/* Keep specific color */} 
                  Description
                </h4>
                <p
                  className="figure-description-text"
                  style={{
                    fontStyle: "italic",
                    color: "#555", // Keep specific color
                    fontSize: "1.05rem",
                    lineHeight: "1.6",
                  }}
                >
                  {figure.description || "No description available for this figure."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FigureDetails;
    