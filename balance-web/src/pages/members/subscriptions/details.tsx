import { useParams } from "react-router";
import Page from "../../../ui/page";
import { useEffect, useState } from "react";
import { findSubscriptionById } from "../../../model/client/member/subscription-client";
import type { SubscriptionDetails } from "../../../model/dto/member/subscription";
import Loading from "../../../ui/loading";
import Card from "../../../ui/card";
import Information from "../../../ui/information";
import { NOT_YET } from "../../../model/constants";
import SlipImage from "../../../ui/slip-image";
import { usageValue } from "../../../model/utils";

export default function MemberSubscriptionDetails() {

    const params = useParams()
    const code = params.code

    const [details, setDetails] = useState<SubscriptionDetails>()

    useEffect(() => {
        async function load() {
            if(code) {
                const response = await findSubscriptionById(code)
                setDetails(response)
            }
        }
        load()
    }, [code])

    if(!details) {
        return (
            <Loading />
        )
    }

    return (
        <Page className="p-3 " icon={<i className="bi-credit-card"></i> } title="Subscription Details">
            <div className="row">
                <div className="col-3">
                    <Card className="mb-4" title="New Plan" icon={<i className="bi-shield-check me-2"></i>}>
                        <div className="list-group mt-4 mb-2">
                            <Information label="Plan" value={details.plan.name} />
                            <Information label="Applied At" value={details.currentAppliedAt} />
                            <Information label="Start At" value={details.currentStartAt || NOT_YET} />
                            <Information label="Expired At" value={details.currentExpiredAt || NOT_YET} />
                            <Information label="Extension" value={usageValue(details.usage)} />
                        </div>
                    </Card>

                    {details.previousPlan && 
                        <Card className="mb-4" title="Previous Plan" icon={<i className="bi-clock-history me-2"></i>}>
                            <div className="list-group-item mt-4 mb-2">
                                <Information label="Plan" value={details.previousPlan.name} />
                                <Information label="Applied At" value={details.prevAppliedAt || ''} />
                                <Information label="Start At" value={details.prevStartAt || ''} />
                                <Information label="Expired At" value={details.prevEndAt || ''} />
                            </div>

                        </Card>
                    }
                </div>

                <div className="col">
                    <Card title="Subscription Information" icon={<i className="bi bi-cart-check-fill"></i>} className="pb-3">
                        <Information label="Payment" value={details.payment || ''} />
                        <Information label="Account No" value={details.accountNo || ''} />
                        <Information label="Account Name" value={details.accountName || ''} />
                        <Information label="Fees" value={details.fees || ''} />
                        <Information label="Status" value={details.status || ''} />
                        <Information label="Change At" value={details.statusChangeAt || ''} />
                        <Information label="Change Reason" value={details.reason || ''} />
                        <Information label="Period" value={details.currentStartAt && details.currentExpiredAt ? 
                                `${new Date(details.currentStartAt).toLocaleDateString()} - ${new Date(details.currentExpiredAt).toLocaleDateString()}` : 'Not Defined'} />

                        <Information label="Member ID" value={details.id.memberId} />
                        <Information label="Plan Code" value={details.id.code} />
                       

                    </Card>
                </div>

                <div className="col-3">
                    <div className="card" style={{maxHeight: "450px"}}>
                        <div className="card-body">
                            <h5 className="d-flex gap-2 color-type fw-bold"><i className="bi-filetype-png"></i>Payment Slip</h5>
                            <div className="slip-container">
                                <SlipImage src={details?.paymentSlip}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}