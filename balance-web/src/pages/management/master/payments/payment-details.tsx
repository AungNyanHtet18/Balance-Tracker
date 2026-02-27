import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { findPaymentMethod } from "../../../../model/client/management/paymentmethod-client";
import type { PaymentMethodDetails } from "../../../../model/dto/management/payment-method";
import FormGroup from "../../../../ui/form-group";
import paymentBg from "../../../../assets/payment/payment.jpg";

export default function PaymentMethodDetails() {

    const params = useParams()
    const paymentId = params['paymentId']
    const [details, setDetails] = useState<PaymentMethodDetails>()

    useEffect(() => {
        async function load() {
            const response = await findPaymentMethod(paymentId)
            setDetails(response)     
        }

        if(paymentId) {
            load()
        }
    }, [paymentId])

    return (
         <div className="vh-100 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${paymentBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}> 
            <div className="container bg-dark bg-opacity-25">
                <div className="row px-5 py-3 gap-2">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">   
                        <div className="d-flex flex-column gap-3">
                            <h1 className="fs-1 text-white fw-bolder  text-start">Payment Method 4 Subcritpion Plans</h1>
                            <p className="text-white fw-semibold text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate ea sint dignissimos perferendis quod asperiores reiciendis, accusamus quae molestiae, optio mollitia, a voluptates cum porro nostrum dicta voluptatibus ipsa!</p>
                        </div>
                    </div>

                    <div className="bg-white col-md-5 rounded-3 py-4  px-3">
                        <h5 className="fw-semibold"><i className="bi-credit-card me-1"></i>Apex Balance</h5>
                        <h1 className="fw-bolder color-type">{paymentId ?  'Edit' : 'Create' } Payment</h1>
                        <h6 className="fs-5 fw-light pb-3">Please fill the payment correctly below</h6>
                       
                        <FormGroup label="Payment Method Name" className="mb-3">
                            <span className="form-control">{details?.name}</span>
                        </FormGroup>

                        <FormGroup label="Account No" className="mb-3">
                            <span className="form-control">{details?.accountNo}</span>
                        </FormGroup>

                        <FormGroup label="Account Name" className="mb-3">
                            <span className="form-control">{details?.accountName}</span>
                        </FormGroup>
                        
                        <FormGroup label="Status" className="mb-3">
                            <span className="form-control">{details?.active ? "Active" : "Pending"}</span>
                        </FormGroup>

                        <div className="text-center">
                            <Link to={`/admin/master/payment/edit?paymentId=${details?.id}`} className="rounded-5 btn btn-dark w-75">
                                <i className="bi-pencil"></i> Edit Payment Method
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )


}