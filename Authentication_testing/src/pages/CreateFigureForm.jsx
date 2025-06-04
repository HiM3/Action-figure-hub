import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/products/all`;

const CreateFigureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setValue("title", data.data.title);
            setValue("anime_name", data.data.anime_name);
            setValue("price", data.data.price);
            setValue("description", data.data.description);
            setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${data.data.image}`);
          }
        })
        .catch((error) => console.error("Error fetching product data:", error))
        .finally(() => setIsLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    
    // Append all text fields
    formData.append("title", data.title);
    formData.append("anime_name", data.anime_name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    
    // Append image if it's a file
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await fetch(id ? `${API_URL}/${id}` : `${API_URL}/create`, {
        method: id ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        alert(id ? "Product updated successfully!" : "Product added successfully!");
        reset();
        navigate("/products");
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-edit-page">
      <div className="form-page-container">
        <h2 className="section-heading primary-text-color">
          {id ? "Edit Product" : "Add New Product"}
        </h2>
        <form
          className="figure-form card-style"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Title</label>
            <input
              type="text"
              className="form-input-custom"
              {...register("title", { required: "Title is required" })}
            />
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Anime Name</label>
            <input
              type="text"
              className="form-input-custom"
              {...register("anime_name", { required: "Anime name is required" })}
            />
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Price ($)</label>
            <input
              type="number"
              className="form-input-custom"
              {...register("price", { 
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              })}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Product Image</label>
            <input
              type="file"
              className="form-input-custom"
              accept="image/*"
              {...register("image", { required: !id && "Image is required" })}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Description</label>
            <textarea
              className="form-textarea-custom"
              {...register("description", { required: "Description is required" })}
              rows={4}
              placeholder="Add description about the product..."
            />
          </div>

          <div className="button-group form-buttons">
            <button
              type="submit"
              className={`btn-custom ${id ? "btn-warning-custom" : "btn-success-custom"} flex-grow`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (id ? "Update Product" : "Add Product")}
            </button>

            <Link to="/products" className="btn-custom btn-outline-primary-custom flex-grow">
              View Products
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFigureForm;
