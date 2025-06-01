import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import Navbar from "./Navbar";

const API_URL = "https://682604ee397e48c91314a719.mockapi.io/figures";

const CreateFigureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("name", data.name);
          setValue("series", data.series);
          setValue("price", data.price);
          setValue("image", data.image);
          setValue("description", data.description || ""); // Set description if exists
        })
        .catch((error) => console.error("Error fetching figure data:", error));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const figureData = { ...data, id: id || uuidv4() };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(figureData),
        });
        alert("Action Figure updated successfully!");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(figureData),
        });
        alert("Action Figure added successfully!");
      }
      reset();
      navigate("/action-figures"); // redirect to the list page
    } catch (error) {
      console.error("Error saving figure:", error);
    }
  };

  return (
    <div className="create-edit-page">
      {/* <Navbar /> */}
      <div className="form-page-container">
        <h2 className="section-heading primary-text-color">
          {id ? "Edit Action Figure" : "Add New Action Figure"}
        </h2>
        <form
          className="figure-form card-style"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Figure Name</label>
            <input
              type="text"
              className="form-input-custom"
              {...register("name")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Series/Franchise</label>
            <input
              type="text"
              className="form-input-custom"
              {...register("series")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Price ($)</label>
            <input
              type="number"
              className="form-input-custom"
              {...register("price")}
              required
              step="0.01"
              min="0"
            />
          </div>
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Figure Image URL</label>
            <input
              type="text"
              className="form-input-custom"
              {...register("image")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label-custom secondary-text-color">Description</label>
            <textarea
              className="form-textarea-custom"
              {...register("description")}
              rows={4}
              placeholder="Add description about the action figure..."
              required
            />
          </div>

          <div className="button-group form-buttons">
            <button
              type="submit"
              className={`btn-custom ${id ? "btn-warning-custom" : "btn-success-custom"} flex-grow`}
            >
              {id ? "Update Figure" : "Add Figure"}
            </button>

            <Link to="/action-figures" className="btn-custom btn-outline-primary-custom flex-grow">
              View Figures
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFigureForm;
