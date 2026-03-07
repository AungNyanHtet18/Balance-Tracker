export default function Footer() {
     return (
        <div className="pb-4 bg-dark">
            <div className="px-5 py-4 d-flex justify-content-between align-items-center">
               <div className="d-flex flex-column text-white">
                   <h2 className="fw-bold">APEX</h2>
                   <span>Balance Management App for User</span>
               </div>

               <div className="text-white text-end">
                   <h6>+1234 535 553 544</h6>
                   <h6>apex@gmail.com</h6>
               </div>

            </div>

            <hr className="mx-4 text-white"/>

            <div className="px-5 py-2 text-white row">
                <div className="col-3">
                    <h6 className="fw-bold">About Us</h6>
                    <span className="fs-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ratione sapiente quisquam facere esseo</span>
                </div>

                <div className="col-3 d-flex flex-column gap-2">
                    <h6 className="fw-bold">Useful Links</h6>
                    <span>Contact</span>
                    <span>Pricing</span>
                    <span>Alfilates</span>
                    <span>Recommended Tools</span>
                </div>

                <div className="col-3 d-flex flex-column gap-2">
                    <h6 className="fw-bold">Resources</h6>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center">Events </a></span>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center">Community</a></span>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center">Social Media</a></span>
                    <span>Newletters</span>
                </div>

                <div className="col-3 d-flex flex-column gap-1">
                    <h6 className="fw-bold">Follow Us</h6>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center"> <i className="bi bi-facebook me-1 fs-5"></i>Facebook</a></span>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center"><i className="bi bi-instagram me-1 fs-5"></i>Instagram</a></span>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center"> <i className="bi bi-twitter-x me-1 fs-5"></i>Twitter</a></span>
                    <span><a href="#" className="text-decoration-none text-white d-flex align-items-center"> <i className="bi bi-whatsapp me-1 fs-5"></i>Whatsapp</a></span>
                </div>
            </div>

            <hr className="mx-4 text-white"/>

            <div className="px-5 py-2 text-white d-flex justify-content-between align-items-center">
                <h6>&copy; 2025 Graphy.All rights reserved.</h6>

                <div className="d-flex justify-content-evenly gap-3">
                    <span><a href="#" className="text-decoration-none border-bottom border-1 text-white d-flex align-items-center">Privacy Policy</a></span>
                     <span><a href="#" className="text-decoration-none border-bottom border-1 text-white d-flex align-items-center">Terms of Service</a></span>
                      <span><a href="#" className="text-decoration-none border-bottom border-1 text-white d-flex align-items-center">Cookies Settings</a></span>
                </div>
            </div>
        </div>
     )
}