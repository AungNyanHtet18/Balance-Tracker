import { motion } from "framer-motion";
import { Link } from "react-router";
import { TrendingUp, PieChart, Shield, ArrowRight, CheckCircle, Star, Quote } from "lucide-react";

export default function Home() {
    // Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const slideLeftVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const slideRightVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#333", minHeight: "100vh", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
            {/* Hero Section */}
            <section className="position-relative d-flex align-items-center" style={{ minHeight: "85vh", background: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop') center/cover no-repeat" }}>
                <div className="position-absolute w-100 h-100" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248, 244, 255, 0.85) 100%)", backdropFilter: "blur(5px)" }}></div>
                
                <div className="container position-relative py-5">
                    <div className="row align-items-center py-5">
                        <motion.div 
                            className="col-lg-6 mb-5 mb-lg-0 pe-lg-5"
                            variants={slideLeftVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="d-inline-flex align-items-center mb-4 px-3 py-2 rounded-pill shadow-sm"
                                style={{ backgroundColor: "#fff", border: "1px solid rgba(153, 51, 255, 0.2)" }}
                            >
                                <span className="spinner-grow spinner-grow-sm me-2" style={{ color: "#9933ff" }} role="status" aria-hidden="true"></span>
                                <span style={{ color: "#6600cc", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "0.5px" }}>New Next-Gen Dashboard Live</span>
                            </motion.div>
                            
                            <h1 className="display-3 fw-bolder mb-4" style={{ color: "#111", letterSpacing: "-1.5px", lineHeight: "1.1" }}>
                                The Smart Way to <br/>
                                <span style={{ position: "relative", display: "inline-block" }}>
                                    Manage Wealth
                                    <svg className="position-absolute w-100" style={{ bottom: "-10px", left: 0, height: "12px" }} viewBox="0 0 200 12" preserveAspectRatio="none">
                                        <path d="M0,10 Q100,-5 200,10" fill="none" stroke="#cc99ff" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>
                            
                            <p className="lead mb-5" style={{ color: "#555", fontSize: "1.2rem", lineHeight: "1.6", maxWidth: "90%" }}>
                                Apex Balance combines powerful analytics with effortless data entry. Take absolute control over your financial destiny with our beautiful, intuitive platform.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-3">
                                <Link to="/signup" className="btn btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg d-flex align-items-center" style={{ backgroundColor: "#9933ff", color: "#fff", border: "none", transition: "transform 0.2s" }}>
                                    Get Started Free <ArrowRight className="ms-2" size={20} />
                                </Link>
                                <Link to="/about" className="btn btn-lg rounded-pill px-5 py-3 fw-bold d-flex align-items-center" style={{ backgroundColor: "#fff", color: "#333", border: "1px solid #e0e0e0", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                                    How it Works
                                </Link>
                            </div>
                            
                            <div className="mt-5 d-flex align-items-center">
                                <div className="d-flex me-3">
                                    {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'].map((img, i) => (
                                        <img key={i} src={img} alt="User" className="rounded-circle border border-2 border-white" style={{ width: "40px", height: "40px", marginLeft: i === 0 ? "0" : "-15px", objectFit: "cover" }} />
                                    ))}
                                </div>
                                <div>
                                    <div className="d-flex text-warning mb-1">
                                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>Loved by 10,000+ creators</span>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="col-lg-6 text-center"
                            variants={slideRightVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="position-relative mx-auto" style={{ maxWidth: "500px" }}>
                                <div className="position-absolute w-100 h-100 rounded-circle" style={{ background: "radial-gradient(circle, rgba(153, 51, 255, 0.2) 0%, transparent 60%)", top: "-10%", left: "-10%", filter: "blur(40px)", zIndex: 0 }}></div>
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Preview" className="img-fluid rounded-4 shadow-lg position-relative" style={{ zIndex: 1, border: "8px solid #fff" }} />
                                
                                {/* Floating Element 1 */}
                                <motion.div 
                                    className="position-absolute bg-white rounded-4 shadow-lg p-3 d-flex align-items-center"
                                    style={{ top: "10%", left: "-10%", zIndex: 2, border: "1px solid rgba(0,0,0,0.05)" }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                >
                                    <div className="p-2 rounded-circle me-3" style={{ backgroundColor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}>
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-start">
                                        <p className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>Payment Recieved</p>
                                        <p className="mb-0 text-success fw-bold">+ $1,250.00</p>
                                    </div>
                                </motion.div>

                                {/* Floating Element 2 */}
                                <motion.div 
                                    className="position-absolute bg-white rounded-4 shadow-lg p-3 text-center"
                                    style={{ bottom: "10%", right: "-5%", zIndex: 2, border: "1px solid rgba(0,0,0,0.05)" }}
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                >
                                    <PieChart size={32} color="#9933ff" className="mb-2" />
                                    <p className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>Analytics Updated</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="py-5 bg-light" style={{ position: "relative" }}>
                <div className="container py-5">
                    <motion.div 
                        className="text-center mb-5 pb-3"
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="display-5 fw-bolder mb-3 text-dark">Engineered for Excellence</h2>
                        <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>Everything you need to manage your personal finances, wrapped in a beautiful, lightning-fast interface.</p>
                    </motion.div>

                    <div className="row g-5 align-items-center mb-5 pb-5">
                        <motion.div className="col-lg-6" variants={slideLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" alt="Feature Analytics" className="img-fluid rounded-4 shadow-lg border border-5 border-white" />
                        </motion.div>
                        <motion.div className="col-lg-6 ps-lg-5" variants={slideRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="mb-4 d-inline-block p-3 rounded-circle shadow-sm" style={{ backgroundColor: "#fdfaff", color: "#9933ff", border: "1px solid rgba(153, 51, 255, 0.2)" }}>
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="h2 fw-bold mb-4">Real-Time Insights</h3>
                            <p className="text-muted fs-5 mb-4" style={{ lineHeight: "1.7" }}>
                                Watch your wealth grow with interactive, real-time charts. We automatically categorize your transactions and provide actionable insights so you instantly know where your money goes.
                            </p>
                            <ul className="list-unstyled mb-0">
                                {["Automated transaction mapping", "Custom spending categories", "Visual goal tracking progress"].map((item, i) => (
                                    <li key={i} className="mb-3 d-flex align-items-center fs-5 text-dark">
                                        <CheckCircle size={20} className="me-3" color="#9933ff" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div className="row g-5 align-items-center flex-row-reverse mb-5 pb-3">
                        <motion.div className="col-lg-6" variants={slideRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" alt="Feature Security" className="img-fluid rounded-4 shadow-lg border border-5 border-white" />
                        </motion.div>
                        <motion.div className="col-lg-6 pe-lg-5" variants={slideLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="mb-4 d-inline-block p-3 rounded-circle shadow-sm" style={{ backgroundColor: "#fdfaff", color: "#9933ff", border: "1px solid rgba(153, 51, 255, 0.2)" }}>
                                <Shield size={32} />
                            </div>
                            <h3 className="h2 fw-bold mb-4">Bank-Level Security</h3>
                            <p className="text-muted fs-5 mb-4" style={{ lineHeight: "1.7" }}>
                                Your privacy isn't just a feature, it's our foundation. Leveraging enterprise-grade AES-256 encryption, your sensitive financial data remains strictly yours.
                            </p>
                            <ul className="list-unstyled mb-0">
                                {["Two-factor authentication (2FA)", "End-to-End data encryption", "Zero-knowledge architecture"].map((item, i) => (
                                    <li key={i} className="mb-3 d-flex align-items-center fs-5 text-dark">
                                        <CheckCircle size={20} className="me-3" color="#9933ff" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-5 position-relative overflow-hidden" style={{ backgroundColor: "#0f001f", color: "#fff" }}>
                <div className="position-absolute" style={{ top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at top right, rgba(153, 51, 255, 0.15) 0%, transparent 50%)" }}></div>
                
                <div className="container py-5 position-relative z-index-1">
                    <motion.div className="text-center mb-5" variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className="display-5 fw-bold mb-3">Loved by our Users</h2>
                        <p className="lead" style={{ color: "#d9b3ff" }}>Don't just take our word for it. See what others are saying.</p>
                    </motion.div>

                    <motion.div 
                        className="row g-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {[
                            { name: "Sarah Jenkins", role: "Freelance Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", text: "Apex Balance completely changed how I handle my freelance income. The UI is gorgeous, and the charts make absolute sense." },
                            { name: "Michael Chen", role: "Small Business Owner", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", text: "Finally, a financial tool that isn't clunky. The Next-Gen dashboard is blazingly fast and helps me track expenses in half the time." },
                            { name: "Elena Rodriguez", role: "Software Engineer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", text: "As a developer, I appreciate good software architecture. Apex's security features and fluid animations show they actually care." }
                        ].map((testimonial, idx) => (
                            <motion.div key={idx} className="col-lg-4" variants={fadeUpVariants}>
                                <div className="card h-100 border-0 p-4 position-relative" style={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1) !important" }}>
                                    <Quote size={40} style={{ color: "rgba(153, 51, 255, 0.3)", position: "absolute", top: "20px", right: "20px" }} />
                                    <div className="d-flex text-warning mb-3">
                                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="mb-4 fs-5" style={{ color: "#e0e0e0", fontStyle: "italic", lineHeight: "1.6" }}>"{testimonial.text}"</p>
                                    <div className="d-flex align-items-center mt-auto">
                                        <img src={testimonial.img} alt={testimonial.name} className="rounded-circle me-3 border border-2" style={{ width: "50px", height: "50px", borderColor: "#9933ff" }} />
                                        <div>
                                            <h5 className="mb-0 fw-bold">{testimonial.name}</h5>
                                            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>{testimonial.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}