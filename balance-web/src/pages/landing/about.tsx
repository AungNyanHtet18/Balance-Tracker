import { motion } from "framer-motion";
import { Users, Target, Zap, ShieldCheck, Activity, Briefcase } from "lucide-react";

export default function AboutUs() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    const floatAnimation = {
        y: [0, -15, 0],
        transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#333", minHeight: "100vh", padding: "80px 20px", position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
            {/* Soft Background Gradients */}
            <div className="position-absolute" style={{ top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(153, 51, 255, 0.08) 0%, transparent 70%)", zIndex: 0, filter: "blur(60px)" }}></div>
            <div className="position-absolute" style={{ bottom: "-20%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(204, 153, 255, 0.1) 0%, transparent 70%)", zIndex: 0, filter: "blur(60px)" }}></div>

            <div className="container position-relative" style={{ zIndex: 1 }}>
                
                {/* Hero / Header */}
                <motion.div 
                    className="text-center mb-5 pb-5"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="d-inline-flex align-items-center mb-4 px-4 py-2 rounded-pill shadow-sm"
                        style={{ backgroundColor: "#fdfaff", border: "1px solid rgba(153, 51, 255, 0.2)" }}
                    >
                        <ShieldCheck size={18} className="me-2" style={{ color: "#9933ff" }} />
                        <span style={{ color: "#6600cc", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>Trusted by over 50k Users</span>
                    </motion.div>
                    
                    <h1 className="display-3 fw-bolder mb-3" style={{ color: "#111", letterSpacing: "-1px" }}>
                        Redefining <span style={{ background: "linear-gradient(45deg, #9933ff, #cc66ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Financial Clarity</span>
                    </h1>
                    
                    <p className="lead mx-auto" style={{ maxWidth: "700px", color: "#555", fontSize: "1.25rem", lineHeight: "1.8" }}>
                        Apex Balance empowers modern professionals and teams to seamlessly track, analyze, and optimize their financial landscape in one beautifully designed platform.
                    </p>
                </motion.div>

                {/* Main Vision Section - Glassmorphism Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="row align-items-center mb-5 p-5 shadow-lg" 
                    style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)", borderRadius: "32px", border: "1px solid rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}
                >
                    <div className="position-absolute" style={{ top: 0, left: 0, width: "6px", height: "100%", background: "linear-gradient(to bottom, #9933ff, #e6ccff)" }}></div>
                    
                    <div className="col-lg-6 mb-5 mb-lg-0 pe-lg-5">
                        <motion.div animate={floatAnimation}>
                            <Target size={50} style={{ color: "#9933ff" }} className="mb-4" />
                        </motion.div>
                        <h2 className="fw-bolder mb-4" style={{ color: "#111", fontSize: "2.5rem" }}>Our Vision</h2>
                        <p className="fs-5" style={{ color: "#444", lineHeight: "1.8", fontWeight: "400" }}>
                            We set out to create more than just a ledger. Our vision is a dynamic ecosystem where your data works for you. By combining the latest in secure cloud architecture with an uncompromising dedication to UI/UX, we're building the future of personal wealth management.
                        </p>
                        <ul className="list-unstyled mt-4">
                            {[
                                "Intuitive, seamless data entry",
                                "Real-time, actionable analytics",
                                "Enterprise-grade encryption"
                            ].map((item, index) => (
                                <li key={index} className="d-flex align-items-center mb-3">
                                    <div className="p-1 rounded-circle me-3" style={{ background: "rgba(153, 51, 255, 0.1)" }}>
                                        <Zap size={16} color="#9933ff" />
                                    </div>
                                    <span className="fw-medium text-secondary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="col-lg-6 text-center">
                        <motion.div 
                            className="position-relative mx-auto rounded-circle d-flex align-items-center justify-content-center" 
                            style={{ width: "350px", height: "350px", background: "radial-gradient(circle, #f8f4ff 0%, #ffffff 70%)", boxShadow: "inset 0 0 50px rgba(153, 51, 255, 0.1), 0 20px 50px rgba(0,0,0,0.05)", border: "1px solid rgba(153, 51, 255, 0.1)" }}
                        >
                             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="position-absolute w-100 h-100 rounded-circle" style={{ border: "2px dashed rgba(153, 51, 255, 0.2)" }}></motion.div>
                             <div className="text-center z-index-1 position-relative">
                                <h3 className="display-4 fw-bold mb-0" style={{ color: "#9933ff" }}>$2B+</h3>
                                <p className="text-muted fw-semibold">Transactions Tracked</p>
                             </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Core Pillars - Complex Grid layout */}
                <div className="text-center mb-5 mt-5 pt-5">
                    <span className="text-uppercase fw-bold" style={{ color: "#9933ff", letterSpacing: "2px", fontSize: "0.85rem" }}>The Architecture of Wealth</span>
                    <h2 className="fw-bolder mt-2 mb-4" style={{ color: "#111", fontSize: "2.5rem" }}>Platform Capabilities</h2>
                </div>

                <motion.div 
                    className="row g-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {[
                        { title: "User-Centric Design", desc: "Every pixel is engineered to reduce friction, ensuring a fluid experience across all devices.", icon: <Users size={28} />, span: "col-lg-4" },
                        { title: "Lightning Fast Engine", desc: "Built on modern React stacks, your dashboard updates without reloading, saving you precious time.", icon: <Zap size={28} />, span: "col-lg-4" },
                        { title: "Encrypted Storage", desc: "Bank-level AES-256 encryption guarantees that your private financial details stay exactly that—private.", icon: <ShieldCheck size={28} />, span: "col-lg-4" },
                        { title: "Advanced Analytics", desc: "Dive deep into your spending habits with interactive charts and AI-driven insights that highlight trends and opportunities.", icon: <Activity size={28} />, span: "col-lg-8" },
                        { title: "Multi-Account Sync", desc: "Connect diverse ledgers and accounts into a single, cohesive timeline.", icon: <Briefcase size={28} />, span: "col-lg-4" }
                    ].map((feature, idx) => (
                        <motion.div key={idx} className={`${feature.span} col-md-6`} variants={sectionVariants}>
                            <motion.div 
                                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(153, 51, 255, 0.12)" }} 
                                className="p-5 h-100" 
                                style={{ backgroundColor: "#ffffff", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                            >
                                <div className="position-absolute" style={{ top: 0, right: 0, width: "100px", height: "100px", background: "radial-gradient(circle at top right, rgba(153, 51, 255, 0.1), transparent)", borderBottomLeftRadius: "100px" }}></div>
                                <div className="mb-4 d-inline-flex p-3 rounded-4 shadow-sm" style={{ backgroundColor: "#fdfaff", color: "#9933ff", border: "1px solid rgba(153, 51, 255, 0.15)" }}>
                                    {feature.icon}
                                </div>
                                <h4 className="fw-bold mb-3" style={{ color: "#222" }}>{feature.title}</h4>
                                <p style={{ color: "#666", lineHeight: "1.7", fontSize: "1.05rem", margin: 0 }}>{feature.desc}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Call to Action styled card */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-5 pt-5 text-center"
                >
                    <div className="py-5 px-4 rounded-4 shadow-sm" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #ffffff 100%)", border: "1px solid rgba(153, 51, 255, 0.2)" }}>
                        <h2 className="fw-bolder mb-3" style={{ color: "#111" }}>Ready to Take Control?</h2>
                        <p className="text-muted mb-4 fs-5 w-75 mx-auto">Join the movement of thousands actively securing their financial future.</p>
                        <button className="btn btn-lg rounded-pill px-5 py-3 fw-bold text-white shadow" style={{ backgroundColor: "#9933ff", border: "none" }}>Join Apex Balance Today</button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}