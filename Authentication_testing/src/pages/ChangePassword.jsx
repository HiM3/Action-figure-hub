import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "../assets/style.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const Change_Password = async (data) => {
    // Validation
    if (data.new_password !== data.confirmpassword) {
      toast.error("New passwords don't match!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");

      // Format the data according to backend expectations
      const requestData = {
        current_password: data.current_password,
        new_password: data.new_password,
        confirmpassword: data.confirmpassword,
      };
      console.log("Sending data to backend:", requestData); // Debug log

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend response:", response.data); // Debug log

      if (response.data.success) {
        toast.success("Password changed successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data); // Debug log
      toast.error(
        error.response?.data?.message ||
          "Failed to change password. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section signin-bg">
      <div className="auth-form-container">
        <div className="user signinBx">
          <div className="formBx">
            <form onSubmit={handleSubmit(Change_Password)}>
              <h2 className="text-center mb-4-custom">Change Password</h2>

              <div className="form-group-custom">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword.current ? "text" : "password"}
                    placeholder="Current Password"
                    {...register("current_password", {
                      required: "Current password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`form-input-custom ${
                      errors.current_password ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("current")}
                  >
                    {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.current_password && (
                  <span className="error-message">
                    {errors.current_password.message}
                  </span>
                )}
              </div>

              <div className="form-group-custom">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="New Password"
                    {...register("new_password", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`form-input-custom ${
                      errors.new_password ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.new_password && (
                  <span className="error-message">
                    {errors.new_password.message}
                  </span>
                )}
              </div>

              <div className="form-group-custom">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    {...register("confirmpassword", {
                      required: "Please confirm your password",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`form-input-custom ${
                      errors.confirmpassword ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmpassword && (
                  <span className="error-message">
                    {errors.confirmpassword.message}
                  </span>
                )}
              </div>

              <button
                className="auth-btn btn-primary-custom"
                type="submit"
                disabled={loading}
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
