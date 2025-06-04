import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/products/all`;

const EditFigureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Edit Product";
    if (id) {
      setIsLoading(true);
      setError(null);

      fetch(`${API_URL}/${id}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((res) => {
          if (res.success && res.data) {
            const product = res.data;
            setValue("title", product.title);
            setValue("anime_name", product.anime_name);
            setValue("price", product.price);
            setValue("description", product.description);
            if (product.image) {
              setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${product.image}`);
            }
          } else {
            throw new Error(res.message || "Failed to fetch product data");
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    // Append all text fields
    formData.append("title", data.title);
    formData.append("anime_name", data.anime_name);
    formData.append("price", data.price);
    formData.append("description", data.description);

    // Append image if it's a new file
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert("Product updated successfully!");
        navigate("/products");
      } else {
        throw new Error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.response?.data?.message || error.message || "Error updating product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="create-edit-page">
        <div className="form-page-container text-center">
          <div className="loading-spinner primary-text-color" role="status" aria-hidden="true"></div>
          <p className="loading-message mt-3-custom">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="create-edit-page">
        <div className="form-page-container text-center">
          <h2 className="error-message danger-text-color">{error}</h2>
          <button
            className="btn-custom outline-primary-button mt-3-custom"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-edit-page">
      <div className="form-page-container">
        <h2 className="section-heading warning-text-color">Edit Product</h2>
        <form
          className="figure-form card-style"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Title</label>
            <input
              type="text"
              className={`form-input-custom ${errors.title ? 'is-invalid' : ''}`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Anime Name</label>
            <input
              type="text"
              className={`form-input-custom ${errors.anime_name ? 'is-invalid' : ''}`}
              {...register("anime_name", { required: "Anime name is required" })}
            />
            {errors.anime_name && (
              <span className="error-message">{errors.anime_name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Price ($)</label>
            <input
              type="number"
              className={`form-input-custom ${errors.price ? 'is-invalid' : ''}`}
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              })}
              step="0.01"
              min="0"
            />
            {errors.price && (
              <span className="error-message">{errors.price.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Product Image</label>
            <input
              type="file"
              className="form-input-custom"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    marginTop: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Description</label>
            <textarea
              className={`form-textarea-custom ${errors.description ? 'is-invalid' : ''}`}
              {...register("description", { required: "Description is required" })}
              rows={4}
              placeholder="Add description about the product..."
            />
            {errors.description && (
              <span className="error-message">{errors.description.message}</span>
            )}
          </div>

          <div className="button-group form-buttons">
            <button
              type="submit"
              className="btn-custom btn-warning-custom flex-grow"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              className="btn-custom btn-secondary-custom flex-grow"
              onClick={() => navigate("/products")}
              disabled={isLoading}
            >
              Cancel & Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFigureForm;
