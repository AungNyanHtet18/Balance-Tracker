import { Link, useNavigate } from "react-router";
import FormGroup from "../../ui/form-group";
import { useForm } from "react-hook-form";
import type { SignInForm } from "../../model/dto/anonymous/commons";
import { signInRequest } from "../../model/client/anonymous/client";
import { authStore } from "../../model/store/auth-result.store";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignIn() {

    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm<SignInForm>()
    const {setAuth} = authStore()
    const [deleted, setDeleted] = useState<boolean>(false)

    async function signIn(form : SignInForm) {
        const result = await signInRequest(form)
        setAuth(result)
        
        if(result?.deleted == true) {
             setDeleted(result.deleted)
        }

        else if(result) {
            navigate(`/${result.role.toLocaleLowerCase()}`)
        }
    }

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const slideRightVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const slideLeftVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    return (
        <div className="container-fluid p-0" style={{ minHeight: "100vh", backgroundColor: "#ffffff", overflowX: "hidden", overflowY: "auto" }}>
            <div className="row g-0" style={{ minHeight: "100vh" }}>
                
                {/* Left Side: Form */}
                <motion.div 
                    className="col-lg-5 d-flex flex-column px-4 px-md-5 py-5 mt-4 mt-lg-0"
                    initial="hidden"
                    animate="visible"
                    variants={slideRightVariants}
                    style={{ position: "relative", zIndex: 1, backgroundColor: "#ffffff" }}
                >
                    <div className="mx-auto my-auto" style={{ maxWidth: "450px", width: "100%" }}>
                   

                        <motion.div variants={fadeUpVariants}>
                            <h1 className="display-6 fw-bold mb-2">Welcome Back</h1>
                            <p className="text-muted mb-4 pb-2 fs-5">Log in to your account to continue.</p>

                            {deleted && 
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="alert mb-4 border-0 d-flex align-items-center" style={{ backgroundColor: "#fff1f0", color: "#cf1322", borderRadius: "12px", padding: "16px" }}>
                                    <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                                    <span className="fw-semibold">Focus Account Temporarily Suspended</span>
                                </motion.div>
                            }

                            <form onSubmit={handleSubmit(signIn)} className="mt-2">
                                <FormGroup className="mb-4" label="Email Address" labelClassName="fw-semibold text-secondary mb-2 fs-6">
                                    <div className="position-relative">
                                        <i className="bi bi-envelope position-absolute top-50 translate-middle-y text-muted ms-3"></i>
                                        <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="name@company.com" 
                                            style={{ borderRadius: "12px", paddingLeft: "45px", paddingRight: "20px", fontSize: "1rem", height: "55px", transition: "all 0.3s ease", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
                                            {...register('email', {required : "Please enter email for login."})}/>
                                    </div>
                                    {errors.email && <span className="text-sm text-danger mt-1 d-block fw-medium"><i className="bi bi-exclamation-triangle-fill me-1"></i>{errors.email?.message}</span>}
                                </FormGroup>

                                <FormGroup className="mb-4" label="Password" labelClassName="fw-semibold text-secondary mb-2 fs-6">
                                    <div className="position-relative">
                                        <i className="bi bi-key position-absolute top-50 translate-middle-y text-muted ms-3"></i>
                                        <input type="password" className="form-control form-control-lg bg-light border-0" placeholder="••••••••"
                                            style={{ borderRadius: "12px", paddingLeft: "45px", paddingRight: "20px", fontSize: "1rem", height: "55px", transition: "all 0.3s ease", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
                                            {...register('password', {required : "Please enter password."})}/>
                                    </div>
                                    {errors.password && <span className="text-sm text-danger mt-1 d-block fw-medium"><i className="bi bi-exclamation-triangle-fill me-1"></i>{errors.password?.message}</span>}
                                </FormGroup>

                                <div className="d-flex justify-content-between align-items-center mb-5">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="rememberMe" style={{ accentColor: "#9933ff" }} />
                                        <label className="form-check-label text-muted" htmlFor="rememberMe">Remember me</label>
                                    </div>
                                    <a href="#" className="fw-semibold text-decoration-none" style={{ color: "#9933ff", fontSize: "0.95rem" }}>Forgot password?</a>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(153, 51, 255, 0.4)" }} 
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className="btn btn-lg w-100 fw-bold border-0 text-white d-flex justify-content-center align-items-center mb-4"
                                    style={{ backgroundColor: "#9933ff", borderRadius: "14px", height: "55px", backgroundImage: "linear-gradient(90deg, #9933ff 0%, #b366ff 100%)" }}
                                >
                                    Login to your dashboard <i className="bi bi-arrow-right ms-2 fs-5"></i>
                                </motion.button>

                                <p className="text-center text-muted fs-6">
                                    New to Apex Balance? <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: "#9933ff" }}>Create an account</Link>
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side: Image/Branding */}
                <motion.div 
                    className="col-lg-7 d-none d-lg-block position-relative"
                    initial="hidden"
                    animate="visible"
                    variants={slideLeftVariants}
                >
                    <div className="position-absolute w-100 h-100" style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                        <div className="position-absolute w-100 h-100" style={{ background: "linear-gradient(135deg, rgba(153, 51, 255, 0.8) 0%, rgba(51, 0, 102, 0.9) 100%)" }}></div>
                    </div>
                    
                    <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-white p-5">
                        <motion.div 
                            className="text-center"
                            variants={fadeUpVariants}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="display-4 fw-bolder mb-4" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>Manage Your Wealth<br/>With Absolute Clarity.</h2>
                            <p className="lead fw-normal mx-auto" style={{ maxWidth: "500px", color: "rgba(255,255,255,0.85)" }}>Join thousands of users who have transformed their financial tracking using our enterprise-grade dashboard.</p>
                            
                            <div className="mt-5 p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", maxWidth: "450px", margin: "0 auto" }}>
                                <div className="d-flex text-warning mb-2 justify-content-center">
                                    {[1,2,3,4,5].map(i => <i key={i} className="bi bi-star-fill mx-1"></i>)}
                                </div>
                                <p className="font-italic mb-3">"This platform replaced three different apps I was using. The UI is gorgeous and it actually makes logging expenses enjoyable."</p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded-circle bg-white p-1 me-2" style={{ width: "40px", height: "40px" }}>
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" className="w-100 h-100 rounded-circle" style={{ objectFit: "cover" }} alt="User" />
                                    </div>
                                    <div className="text-start">
                                        <h6 className="mb-0 fw-bold">Amanda D.</h6>
                                        <small style={{ color: "rgba(255,255,255,0.7)" }}>Financial Director</small>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}