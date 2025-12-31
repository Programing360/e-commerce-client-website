import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { UseContext } from '../../Context/UseContext';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { FiEyeOff } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';

const Register = () => {
    const { signInWithUser, googleLogin, errorMessage, setErrorMessage } = useContext(UseContext);
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleRegister = async (data) => {
        try {
            const result = await signInWithUser(data.email, data.password);
            const user = result.user;

            // 🔥 update name after register
            await updateProfile(user, {
                displayName: data.name,
            });

            if (user) {
                navigate(from || '/'); // Redirect after successful registration
            }

        } catch (error) {
            if (error) {
                const err = <><p>email already use</p></>
                setErrorMessage(err);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            if (result.user) {
                // console.log("Google login successful:", result.user);
                navigate('/'); // Redirect after successful Google login
            }
        } catch (error) {
            if (error) {
                const err = <><p>email already use</p></>
                setErrorMessage(err);
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">

                <div className="card bg-base-100 w-full max-w-3xl py-10 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-amber-500 px-6">
                            Register Now!
                        </h1>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <fieldset className="fieldset space-y-2">

                                {/* Name */}
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="input md:w-full outline-0 border-amber-600"
                                    placeholder="Your Name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}

                                {/* Email */}
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    className="input w-full border outline-0 border-amber-600"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                                {/* password */}
                                <label className="label">Password</label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: 6
                                        })}
                                        className="input w-full border outline-0 border-amber-600 pr-10"
                                        placeholder="Password"
                                    />

                                    {/* Show / Hide Icon */}
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <BsEye size={20} />}
                                    </span>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}

                                <button className="btn bg-amber-400 mt-4 text-white hover:bg-amber-700">
                                    Register
                                </button>
                                {
                                    errorMessage && (<p className="text-red-500 mt-2">{errorMessage}</p>
                                    )
                                }
                            </fieldset>
                        </form>

                        <p className="mt-4">
                            Already have an account?
                            <Link to="/login">
                                <u className="font-bold text-amber-500 ml-2">Log In</u>
                            </Link>
                        </p>

                        {/* Google Login */}
                        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
