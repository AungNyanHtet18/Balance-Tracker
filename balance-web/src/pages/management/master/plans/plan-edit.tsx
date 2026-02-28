import { useNavigate, useSearchParams } from "react-router";
import FormGroup from "../../../../ui/form-group";
import { useForm } from "react-hook-form";
import type { SubscriptionPlanForm } from "../../../../model/dto/management/subscription-plan";
import { createPlan, findPlanById, searchPlan, updatePlan } from "../../../../model/client/management/subscription-plan-client";
import { useEffect } from "react";
import FormError from "../../../../ui/form-error";
import { useManagementPlan } from "../../../../model/provider/management-plan-context";

export default function EditSubscriptionPlan() {

    const [params] = useSearchParams()
    const planId = params.get("planId")
    const navigate = useNavigate()
    const {setPlans} = useManagementPlan()

    const {handleSubmit, reset, register, watch,formState : {errors}} = useForm<SubscriptionPlanForm>()

    useEffect(() => {
        async function load() {
            const response = await findPlanById(planId)
            if(response) {
                reset({
                    name: response.name,
                    fees: response.fees,
                    months: response.months,
                    maxLedgers: response.maxLedgers,
                    dailyEntry: response.dailyEntry,
                    monthlyEntry: response.monthlyEntry,
                    defaultPlan: response.defaultPlan,
                    active: response.active
                })
            }
        }

        if(planId) {
            load()
        }
    }, [planId, reset])

    async function save(form:SubscriptionPlanForm) {
        if(planId) {
            await updatePlan(planId, form)
        } else {
            await createPlan(form)
        } 

        const response = await searchPlan({})
        if(response) {
            setPlans(response)
            navigate(`/admin/master/plan`)
        }
    }

    return (
        <div className="vh-100 position-relative " >
           <div className="h-25 p-2 d-flex justify-content-center align-items-center gap-3" style={{backgroundColor: '#8f23aa'}}>
              <div>
                <h1 className="text-center text-white">Subcription Plan Form</h1>
                <h5 className="text-end text-white">Fill the form completely!</h5>
              </div>
              <i className="bi bi-ui-checks text-white" style={{fontSize: '80px'}}></i>
           </div>

            <div className="position-absolute border border-1  rounded-4 shadow-sm  w-75 p-3 bg-white" style={{top: '21%', right: '12%', height: '430px'}}>
               <h5 className="fw-bold text-end color-type"><i className="bi bi-plus-circle me-1"></i>{ planId ? 'Edit' : 'Create' } Subcription Plan </h5>
                
                <form onSubmit={handleSubmit(save)}>
                    <div className="row mb-3">
                        <FormGroup label="Plan Type" className="col-6">
                            <select {...register('defaultPlan', {required: true})} className="form-select">
                                <option value="">Select Plan Type</option>
                                <option value="true">Default Plan</option>
                                <option value="false">Paid Plan</option>
                            </select>
                            {errors.active && <FormError message="Please select plan type" />}
                        </FormGroup>

                        <FormGroup label="Plan Name" className="col-6">
                            <input {...register('name', {required: true})} type="text" placeholder="Enter Subscription Plan Name" className="form-control" />
                            {errors.name && <FormError message="Please enter plan name." />}
                        </FormGroup>
                    </div>

                    <div className="row mb-3">
                        <FormGroup className="col-6" label="Fees">
                            <input {...register('fees', {required: true})} type="number" placeholder="Enter fees" className="form-control" />
                            {errors.fees && <FormError message="Please enter fees." />}
                        </FormGroup>
                        <FormGroup className="col-6" label="Months">
                            <input {...register('months', {required: true})} type="number" placeholder="Enter Months" className="form-control" />
                            {errors.months && <FormError message="Please enter months." />}
                        </FormGroup>
                    </div>

                    <div className="row mb-3">
                        <FormGroup className="col-4" label="Maximum Ledger">
                            <input {...register('maxLedgers', {required : true})} type="number" placeholder="Enter Maximum Ledger" className="form-control" />
                            {errors.fees && <FormError message="Please enter fees." />}
                        </FormGroup>
                        <FormGroup className="col-4" label="Daily Entry Limit">
                            <input {...register('dailyEntry', {required :true})} type="number" placeholder="Enter Daily Entry Limit" className="form-control" />
                            {errors.fees && <FormError message="Please enter daily entry limit." />}
                        </FormGroup>
                        <FormGroup className="col-4" label="Monthly Entry Limit">
                            <input {...register('monthlyEntry', {required : true})} type="number" placeholder="Enter Monthly Entry Limit" className="form-control" />
                            {errors.monthlyEntry && <FormError message="Please enter monthly entry limit." />}
                        </FormGroup>
                    </div>

                    <div className="mb-3 form-check">
                        <input {...register('active')} type="checkbox" className="form-check-input" id="status" />
                        <label htmlFor="status" className="form-check-label color-type fw-bold">{watch('active') ? "Active" : "Pending"}</label>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-purple">
                            <i className="bi-save"></i> Save Subscription Plan
                        </button>
                    </div>

                </form>
            </div>
            
        </div>
    )
}