import { useForm } from "react-hook-form";
import type { ContactUsForm } from "../../model/dto/anonymous/contact";
import FormError from "../../ui/form-error";
import { contactRequest } from "../../model/client/anonymous/client";
import FormGroup from "../../ui/form-group";
import { useState } from "react";
import ContactPhoto1 from '../../assets/contactus/Contact1.jpg';
import ContactPhoto2 from '../../assets/contactus/Contact2.jpg';
import ContactPhoto3 from '../../assets/contactus/Contact3.jpg';
import ContactPhoto4 from '../../assets/contactus/Contact4.jpg';
import ContactPhoto5 from '../../assets/contactus/Contact5.jpg';

export default function ContactUs() {
    
   const [successMessage, setSuccessMessage] = useState<string>()
    const {handleSubmit, register, reset, formState : {errors}} = useForm<ContactUsForm>()

    async function save(form: ContactUsForm) {
       const response = await contactRequest(form)
       
       if(response?.id) {
          setSuccessMessage("Your message has been successfully!")
          reset(
            {fullName: '', email: '', phone: '', message: ''}
          )
      }else {
         setSuccessMessage("Something Went Wrong. Please try again.")
       }
   }
   
   return (
         <div className="row g-3 px-4">
            <div className="col-md-6 py-2">
               <h1 className="color-type fw-bold">Contact Us</h1>
               <p className="fs-6 fw-lighter">Not sure what you need?The team at Square Events will be happy to listen to you and suggest event ideas you hadn't considered</p>

                  { successMessage &&
                  <div className="my-3 fs-7 text-white" style={{backgroundColor: "#8f23aa", padding: "10px", borderRadius: "8px"}}>Your has been successfully</div>
                  }

               <form onSubmit={handleSubmit(save)}>
                   <FormGroup label="Full Name"  className="mb-4" labelClassName="color-type">
                     <input type="text" placeholder="Enter your text" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size" {...register('fullName',{required: true})}/>
                      {errors.fullName && <FormError message="Please enter your full name."/>}
                  </FormGroup>

                  <FormGroup label="Email" className="mb-4" labelClassName="color-type">
                     <input type="email" placeholder="Enter your email" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size" {...register('email',{required: true})} />
                      {errors.email && <FormError message="Please enter your email."/>}
                  </FormGroup>

                  <FormGroup label="Phone" className="mb-4" labelClassName="color-type">
                     <input type="text" placeholder="Enter your phone" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size" {...register('phone',{required: true})} />
                      {errors.phone && <FormError message="Please enter your phone."/>}
                  </FormGroup>

                  <FormGroup label="Message" className="mb-4" labelClassName="color-type">
                     <input placeholder="Enter your message" className="form-control border-0 border-bottom rounded-0 shadow-none fs-6 bottom-border-size" {...register('message',{required: true})}/>
                      {errors.message && <FormError message="Please enter message."/>}
                  </FormGroup>

                  <div>
                     <button type="submit" className="btn btn-purple">
                        <i className="bi-save">Get in Touch</i>
                     </button>
                  </div>

               </form>
            </div>
            <div className="col-md-6 pt-5 px-5">
               <div className="row">
                  <div className="col-6 p-0">
                     <img src={ContactPhoto1} alt="Contact Us Photo" className="w-100" style={{objectFit: 'cover'}} />
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                     <img src={ContactPhoto2} alt="Contact Us Photo" className="w-75 h-auto"/>
                  </div>
               </div>
               <div className="row">
                  <div className="col-6 d-flex align-items-center justify-content-center">
                     <img src={ContactPhoto3} alt="Contact Us Photo" style={{maxWidth: '120px', height:'auto'}} />
                  </div>
                  <div className="col-6 p-0">
                     <img src={ContactPhoto4} alt="Contact Us Photo" className="w-100" style={{objectFit: 'cover'}} />
                  </div>
               </div>
               <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                     <img src={ContactPhoto5} alt="Contact Us Photo" className="w-50"/>
                  </div>
               </div>
            </div>
        </div>)
}