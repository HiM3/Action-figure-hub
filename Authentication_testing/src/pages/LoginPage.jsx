import "./Auth.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  async function login(data) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);

      if (res.data.success) {
        console.log(res.data.checkUser)
        localStorage.setItem('user', JSON.stringify(res.data.checkUser))
        localStorage.setItem('auth-token', res.data.token)
        // localStorage.setItem()
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/")
      } else {
        toast.error(res.data.message || "Login failed!", {
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
    <div className="section signin-bg">
      <div className="auth-form-container">
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://wallpapers.com/images/featured/goku-black-iphone-tjqm4xxvspc8atf9.jpg"
              alt="signin"
            />
          </div>
          <div className="formBx">
            <form onSubmit={handleSubmit(login)}>
              <h2 className="text-center mb-4-custom">Welcome Back!</h2>
              <div className="form-group-custom">
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
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
                    placeholder="Enter your password"
                    {...register("password")}
                    required
                    className="form-input-custom"
                  />
                </div>
              </div>
              <button className="auth-btn btn-primary-custom" type="submit">
                <FaSignInAlt className="me-2" /> Sign In
              </button>
              <p className="signup text-center mt-4-custom">
                Don't have an account?{" "}
                <Link to="/register" className="text-link">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
