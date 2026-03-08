import { useForm } from "react-hook-form";
import type { ContactUsForm } from "../../model/dto/anonymous/contact";
import FormError from "../../ui/form-error";
import { contactRequest } from "../../model/client/anonymous/client";
import FormGroup from "../../ui/form-group";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactPhoto1 from '../../assets/contactus/Contact1.jpg';
import ContactPhoto2 from '../../assets/contactus/Contact2.jpg';
import ContactPhoto3 from '../../assets/contactus/Contact3.jpg';
import ContactPhoto4 from '../../assets/contactus/Contact4.jpg';
import ContactPhoto5 from '../../assets/contactus/Contact5.jpg';

export default function ContactUs() {

    const [successMessage, setSuccessMessage] = useState<string>()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<ContactUsForm>()

    async function save(form: ContactUsForm) {
        const response = await contactRequest(form)

        if (response?.id) {
            setSuccessMessage("Your message has been successfully!")
            reset(
                { fullName: '', email: '', phone: '', message: '' }
            )
        } else {
            setSuccessMessage("Something Went Wrong. Please try again.")
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const slideLeftVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const slideRightVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
    };
    
    return (
        <motion.div 
            className="row g-3 px-4 mb-5 pt-4" 
            style={{ backgroundColor: "#ffffff" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <motion.div className="col-md-6 py-2 pe-lg-5" variants={slideLeftVariants}>
                <h1 className="fw-bolder display-5 mt-5">
                      <span className="me-3"  style={{
                            background: "linear-gradient(90deg, #8f23aa 0%, #b54ccc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block"
                        }}>
                    Contact</span>
                    <span style={{ color: "black" }}>Us</span>
                </h1>
                <p className="fs-5 fw-normal text-muted mb-5" style={{ lineHeight: "1.6" }}>
                    Not sure what you need? The team at Square Events will be happy to listen to you and suggest event ideas you hadn't considered.
                </p>

                {successMessage &&
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="my-3 fs-6 font-weight-bold" style={{ backgroundColor: "rgba(143, 35, 170, 0.1)", color: "#8f23aa", padding: "15px", borderRadius: "12px", border: "1px solid rgba(143, 35, 170, 0.2)" }}>
                        {successMessage}
                    </motion.div>
                }

                <form onSubmit={handleSubmit(save)}>
                    <FormGroup label="Full Name" className="mb-4" labelClassName="color-type fw-semibold mb-2">
                        <input type="text" placeholder="Enter your text" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size bg-transparent" style={{ transition: "border-color 0.3s ease", paddingLeft: 0 }} {...register('fullName', { required: true })} />
                        {errors.fullName && <FormError message="Please enter your full name." />}
                    </FormGroup>

                    <FormGroup label="Email" className="mb-4" labelClassName="color-type fw-semibold mb-2">
                        <input type="email" placeholder="Enter your email" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size bg-transparent" style={{ transition: "border-color 0.3s ease", paddingLeft: 0 }} {...register('email', { required: true })} />
                        {errors.email && <FormError message="Please enter your email." />}
                    </FormGroup>

                    <FormGroup label="Phone" className="mb-4" labelClassName="color-type fw-semibold mb-2">
                        <input type="text" placeholder="Enter your phone" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size bg-transparent" style={{ transition: "border-color 0.3s ease", paddingLeft: 0 }} {...register('phone', { required: true })} />
                        {errors.phone && <FormError message="Please enter your phone." />}
                    </FormGroup>

                    <FormGroup label="Message" className="mb-5" labelClassName="color-type fw-semibold mb-2">
                        <input placeholder="Enter your message" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size bg-transparent" style={{ transition: "border-color 0.3s ease", paddingLeft: 0 }} {...register('message', { required: true })} />
                        {errors.message && <FormError message="Please enter message." />}
                    </FormGroup>

                    <div>
                        <motion.button 
                            type="submit" 
                            className="btn btn-purple px-5 py-3 rounded-pill fw-bold shadow-sm"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(143, 35, 170, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            style={{ backgroundColor: "#8f23aa", border: "none", color: "#fff" }}
                        >
                            <i className="bi-save me-2"></i> Get in Touch
                        </motion.button>
                    </div>

                </form>
            </motion.div>
            
            <motion.div className="col-md-6 pt-5 px-5" variants={slideRightVariants}>
                <div className="row g-4 align-items-center">
                    <motion.div className="col-6" variants={imageVariants} whileHover={{ y: -5, scale: 1.02 }}>
                        <img src={ContactPhoto1} alt="Contact Us Photo" className="img-fluid rounded-4 shadow" style={{ objectFit: 'cover', height: "250px", width: "100%" }} />
                    </motion.div>
                    <motion.div className="col-6 d-flex align-items-center justify-content-center" variants={imageVariants} whileHover={{ y: -5, scale: 1.05 }}>
                        <img src={ContactPhoto2} alt="Contact Us Photo" className="img-fluid rounded-4 shadow-sm" style={{ width: "85%" }} />
                    </motion.div>
                </div>
                
                <div className="row g-4 mt-1 align-items-center">
                    <motion.div className="col-6 d-flex align-items-center justify-content-center" variants={imageVariants} whileHover={{ y: -5, scale: 1.05 }}>
                        <img src={ContactPhoto3} alt="Contact Us Photo" className="img-fluid rounded-circle shadow" style={{ maxWidth: '140px', height: '140px', border: "4px solid #fff" }} />
                    </motion.div>
                    <motion.div className="col-6" variants={imageVariants} whileHover={{ y: -5, scale: 1.02 }}>
                        <img src={ContactPhoto4} alt="Contact Us Photo" className="img-fluid rounded-4 shadow" style={{ objectFit: 'cover', height: "200px", width: "100%" }} />
                    </motion.div>
                </div>
                
                <div className="row g-4 mt-1">
                    <motion.div className="col-12 d-flex justify-content-center" variants={imageVariants} whileHover={{ y: -5, scale: 1.05 }}>
                        <img src={ContactPhoto5} alt="Contact Us Photo" className="img-fluid rounded-4 shadow-sm" style={{ width: "60%" }} />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}