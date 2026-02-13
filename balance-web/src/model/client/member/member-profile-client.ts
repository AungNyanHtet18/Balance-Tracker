import type { ApiResponse, ModificationResult } from "../../dto";
import type { CurrentPlan, MemberDetails, MemberForm } from "../../dto/member/member-profile";
import { userName } from "../../store/auth-result.store";
import { handleError } from "../_error_handler";
import { securedClient } from "../_instance";

export async function getCurrentPlan():ApiResponse<CurrentPlan> {
    const response = await securedClient().get(`/member/${userName()}/dashboard/plan`).catch(handleError)
    return response?.data
}

export async function updateMemberDetail(form: MemberForm):ApiResponse<ModificationResult<number>>{
     const response = await securedClient().put(`member/${userName()}/info` ,form, {
        headers: {'Content-Type' : 'multipart/form-data'}
     }).catch(handleError)
     return response?.data
}

export async function getMemberDetails():ApiResponse<MemberDetails> { 
    const response = await securedClient().get(`/member/${userName()}/info`).catch(handleError)
    return response?.data
}