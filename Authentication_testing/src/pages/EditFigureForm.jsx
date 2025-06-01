import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://682604ee397e48c91314a719.mockapi.io/figures";

const EditFigureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    document.title = "Edit Action Figure";
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("name", data.name);
          setValue("series", data.series);
          setValue("price", data.price);
          setValue("image", data.image);
          setValue("description", data.description || "");  // Add description here
        })
        .catch((error) => console.error("Error fetching figure data:", error));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Action Figure updated successfully!");
      reset();
      navigate("/action-figures");
    } catch (error) {
      console.error("Error updating figure:", error);
    }
  };

  return (
    <div className="create-edit-page">
      <div className="form-page-container">
        <h2 className="section-heading warning-text-color">Edit Action Figure</h2>
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
            //   placeholder="Add description about the action figure..."
              required
            />
          </div>
          <button type="submit" className="btn-custom btn-warning-custom w-100-mobile my-2-custom">
            Update Figure
          </button>
        </form>
        <div className="mt-4-custom">
          <button className="btn-custom btn-secondary-custom w-100-mobile" onClick={() => navigate("/action-figures")}>
            Cancel & Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFigureForm;
