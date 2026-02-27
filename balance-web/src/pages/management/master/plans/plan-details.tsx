import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { findPlanById } from "../../../../model/client/management/subscription-plan-client";
import type { SubscriptionPlanDetails } from "../../../../model/dto/management/subscription-plan";
import FormGroup from "../../../../ui/form-group";
import { limitValue } from "../../../../model/utils";

export default function SubscriptionPlanDetails() {

    const params = useParams()
    const planId = params['planId']
    const [plan, setPlan] = useState<SubscriptionPlanDetails>()

    useEffect(() => {
        async function load() {
            const result = await findPlanById(planId)
            setPlan(result)
        }

        if(planId) {
            load()
        }
    }, [planId])

    if(!plan) {
        return <></>
    }

    return (
        <div className="vh-100 position-relative " >
            <div className="h-25 p-2 d-flex justify-content-center align-items-center gap-3" style={{backgroundColor: '#8f23aa'}}>
                <div>
                    <h1 className="text-center text-white">Subcription Plan Detail</h1>
                    <h5 className="text-end text-white">Watch Detail Form!</h5>
                </div>
                <i className="bi bi-ui-checks text-white" style={{fontSize: '80px'}}></i>
            </div>

            <div className="position-absolute border border-1  rounded-4 shadow-sm  w-75 p-3 bg-white" style={{top: '21%', right: '12%', height: '390px'}}>
                <div className="d-flex justify-content-between align-items-center rounded-1 mb-3" style={{backgroundColor: '#8f23aa'}}>
                    <span className="fw-semibold fs-5 text-white  bg-black rounded-start-1 p-2">Status: <label className="text-decoration-underline">{plan.active ? "Active" : "Pending"} </label> </span>
                    <h5 className="fw-bold text-white pe-2"><i className="bi-bookmark-heart me-1"></i> Subcription Plan</h5>
                </div>
                
               
                <div className="row mb-3">
                    <FormGroup label="Plan Type" className="col-6">
                        <span className="form-control">{plan.defaultPlan ? "Default Plan" : "Paid Plan"}</span>
                    </FormGroup>
                    <FormGroup label="Plan Type" className="col-6">
                        <span className="form-control">{plan.name}</span>
                    </FormGroup>
                </div>

                <div className="row mb-3">
                    <FormGroup label="Fees" className="col-6">
                        <span className="form-control">{plan.fees} MMK</span>
                    </FormGroup>
                    <FormGroup label="Months" className="col-6">
                        <span className="form-control">{plan.months} Months</span>
                    </FormGroup>
                </div>

                <div className="row mb-3">
                    <FormGroup label="Maximum Ledger" className="col-4">
                        <span className="form-control">{limitValue(plan.maxLedgers || 0)}</span>
                    </FormGroup>
                    <FormGroup label="Daily Entry Limit" className="col-4">
                        <span className="form-control">{limitValue(plan.dailyEntry || 0)}</span>
                    </FormGroup>
                    <FormGroup label="Monthly Entry Limit" className="col-4">
                        <span className="form-control">{limitValue(plan.monthlyEntry || 0)}</span>
                    </FormGroup>
                </div>
               
                <div className="text-end">
                    <Link to={`/admin/master/plan/edit?planId=${plan.id}`} className="btn btn-dark" style={{padding: '6px 75px'}} >
                        <i className="bi-pencil"></i> Edit Plan
                    </Link>
                </div>

            </div>
        </div>
    )
}