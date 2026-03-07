import { Link, useNavigate } from "react-router";
import FormGroup from "../../ui/form-group";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpForm } from "../../model/dto/anonymous/commons";
import { signUpRequest } from "../../model/client/anonymous/client";
import { authStore } from "../../model/store/auth-result.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

export default function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema)
    })
    const {setAuth} = authStore()
    const navigate = useNavigate()

    async function signUp(form:SignUpForm) {
        const response = await signUpRequest(form)
        if(response) {
            setAuth(response)
            navigate(`/${response.role.toLocaleLowerCase()}`)
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
                            <h1 className="display-6 fw-bold mb-2">Create Account</h1>
                            <p className="text-muted mb-4 pb-2 fs-5">Join us to start managing your balance today.</p>

                            <form onSubmit={handleSubmit(signUp)}>
                                <FormGroup className="mb-4" label="Full Name" labelClassName="fw-semibold text-secondary mb-2 fs-6">
                                    <div className="position-relative">
                                        <i className="bi bi-person position-absolute top-50 translate-middle-y text-muted ms-3"></i>
                                        <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="John Doe" 
                                            style={{ borderRadius: "12px", paddingLeft: "45px", paddingRight: "20px", fontSize: "1rem", height: "55px", transition: "all 0.3s ease", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
                                            {...register('name', {required : "Please enter your name."})}/>
                                    </div>
                                    {errors.name && <span className="text-sm text-danger mt-1 d-block fw-medium"><i className="bi bi-exclamation-triangle-fill me-1"></i>{errors.name.message}</span>}
                                </FormGroup>

                                <FormGroup className="mb-4" label="Email Address" labelClassName="fw-semibold text-secondary mb-2 fs-6">
                                    <div className="position-relative">
                                        <i className="bi bi-envelope position-absolute top-50 translate-middle-y text-muted ms-3"></i>
                                        <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="name@company.com" 
                                            style={{ borderRadius: "12px", paddingLeft: "45px", paddingRight: "20px", fontSize: "1rem", height: "55px", transition: "all 0.3s ease", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
                                            {...register('email', {required : "Please enter email for login."})}/>
                                    </div>
                                    {errors.email && <span className="text-sm text-danger mt-1 d-block fw-medium"><i className="bi bi-exclamation-triangle-fill me-1"></i>{errors.email.message}</span>}
                                </FormGroup>

                                <FormGroup className="mb-5" label="Password" labelClassName="fw-semibold text-secondary mb-2 fs-6">
                                    <div className="position-relative">
                                        <i className="bi bi-key position-absolute top-50 translate-middle-y text-muted ms-3"></i>
                                        <input type="password" className="form-control form-control-lg bg-light border-0" placeholder="Create a strong password"
                                            style={{ borderRadius: "12px", paddingLeft: "45px", paddingRight: "20px", fontSize: "1rem", height: "55px", transition: "all 0.3s ease", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
                                            {...register('password', {required : "Please enter password."})}/>
                                    </div>
                                    {errors.password && <span className="text-sm text-danger mt-1 d-block fw-medium"><i className="bi bi-exclamation-triangle-fill me-1"></i>{errors.password.message}</span>}
                                </FormGroup>

                                <motion.button 
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(153, 51, 255, 0.4)" }} 
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className="btn btn-lg w-100 fw-bold border-0 text-white d-flex justify-content-center align-items-center mb-4"
                                    style={{ backgroundColor: "#9933ff", borderRadius: "14px", height: "55px", backgroundImage: "linear-gradient(90deg, #9933ff 0%, #b366ff 100%)" }}
                                >
                                    Create Account <i className="bi bi-arrow-right ms-2 fs-5"></i>
                                </motion.button>

                                <p className="text-center text-muted fs-6">
                                    Already have an account? <Link to="/signin" className="fw-bold text-decoration-none" style={{ color: "#9933ff" }}>Sign in here</Link>
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
                        backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                        <div className="position-absolute w-100 h-100" style={{ background: "linear-gradient(135deg, rgba(82, 0, 153, 0.85) 0%, rgba(25, 0, 51, 0.95) 100%)" }}></div>
                    </div>
                    
                    <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-white p-5">
                        <motion.div 
                            className="text-center"
                            variants={fadeUpVariants}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="display-4 fw-bolder mb-4" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>Your Journey to<br/>Financial Clarity.</h2>
                            <p className="lead fw-normal mx-auto" style={{ maxWidth: "500px", color: "rgba(255,255,255,0.85)" }}>Setting up your account takes less than a minute. Gain instant access to our powerful tracking tools and insights.</p>
                            
                            <div className="mt-5 row g-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
                                <div className="col-12 p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                                    <h5 className="fw-bold mb-2"><i className="bi bi-shield-check text-success me-2 fs-4"></i>Enterprise Security</h5>
                                    <p className="mb-0 text-white-50">Your financial data is encrypted and protected with bank-level security protocols.</p>
                                </div>
                                <div className="col-12 p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                                    <h5 className="fw-bold mb-2"><i className="bi bi-graph-up-arrow text-info me-2 fs-4"></i>Actionable Insights</h5>
                                    <p className="mb-0 text-white-50">Get detailed reports and predictive analytics to help you make better business decisions.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}