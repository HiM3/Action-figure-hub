import "./Auth.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function signup(data) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Register successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/login");
      } else {
        toast.error(res.data.message || "Register failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      console.log(err);
    }
  }

  return (
    <div className="section signup-bg">
      <div className="auth-form-container">
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSubmit(signup)}>
              <h2 className="text-center mb-4-custom">Create Account</h2>
              <div className="form-group-custom">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="Choose a username"
                    required
                    className="form-input-custom"
                  />
                </div>
              </div>
              <div className="form-group-custom">
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    required
                    className="form-input-custom"
                  />
                </div>
              </div>
              <div className="form-group-custom">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Create a password"
                    required
                    className="form-input-custom"
                  />
                </div>
              </div>
              <div className="form-group-custom">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirmpassword")}
                    required
                    className="form-input-custom"
                  />
                </div>
              </div>
              <button type="submit" className="auth-btn btn-primary-custom">
                <FaUserPlus className="me-2" /> Sign Up
              </button>
              <p className="signup text-center mt-4-custom">
                Already have an account?{" "}
                <Link to="/login" className="text-link">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://i.pinimg.com/736x/24/31/fa/2431fa009886b1c1878d16216c6d5bdd.jpg"
              alt="signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
