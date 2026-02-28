import { useNavigate, useSearchParams } from "react-router";
import FormGroup from "../../../../ui/form-group";
import type { PaymentMethodForm } from "../../../../model/dto/management/payment-method";
import { createPaymentMethod, findPaymentMethod, updatePaymentMethod } from "../../../../model/client/management/paymentmethod-client";
import { useForm } from "react-hook-form";
import FormError from "../../../../ui/form-error";
import { useEffect } from "react";
import paymentBg from "../../../../assets/payment/payment.jpg";

export default function EditPaymentMethod() {

    const [params] = useSearchParams()
    const paymentId = params.get("paymentId")
    const navigate = useNavigate()

    const {handleSubmit, register, watch, reset, formState : {errors}} = useForm<PaymentMethodForm>()

    useEffect(() => {

        async function load(id: unknown) {
            const response = await findPaymentMethod(id)
            if(response) {
                reset({
                    name: response.name,
                    accountNo: response.accountNo,
                    accountName: response.accountName,
                    active: response.active
                })
            }
        }

        if(paymentId) {
            load(paymentId)
        }

    }, [paymentId, reset])

    async function save(form:PaymentMethodForm) {
        if(paymentId) {
            await updatePaymentMethod(paymentId, form)
        } else {
            await createPaymentMethod(form)
        }
        navigate(`/admin/master/payment`)
    }

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

                        <form onSubmit={handleSubmit(save)}>
                            <FormGroup label="Payment Name" className="mb-3">
                                <input type="text" placeholder="Enter Payment Method Name" className="form-control" {
                                    ...register('name', {required : true})
                                } />
                                {errors.name && <FormError message="Please enter Payment Method Name." />}
                            </FormGroup>

                            <FormGroup label="Account No" className="mb-3">
                                <input type="text" placeholder="Enter Account Number" className="form-control" {
                                    ...register('accountNo', {required : true})
                                } />
                                {errors.accountNo && <FormError message="Please enter account no." />}
                            </FormGroup>

                            <FormGroup label="Account Name" className="mb-3">
                                <input type="text" placeholder="Enter Account Name" className="form-control" {
                                    ...register('accountName', {required : true})
                                } />
                                {errors.accountName && <FormError message="Please enter account name." />}
                            </FormGroup>

                            <div className="form-check mb-3">
                                <input id="active" type="checkbox" className="form-check-input" {...register('active')} />
                                <label htmlFor="active" className="form-check-label color-type fw-bold">{watch('active') ? "Active" : "Pending"}</label>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="rounded-5 btn btn-purple  w-75">
                                    <i className="bi-save"></i> Save Payment Method
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}