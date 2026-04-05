import type { ApiResponse, ModificationResult, PageResult } from "../../dto";
import type { MemberListItem, MemberSearch } from "../../dto/management/member";
import { handleError } from "../_error_handler";
import { securedClient } from "../_instance";

export async function searchMember(form?:MemberSearch):ApiResponse<PageResult<MemberListItem>> {
    const response = await securedClient().get('/management/member', {params : form}).catch(handleError)
    return response?.data
}

export async function  banMemberWithId(memberId: number):ApiResponse<ModificationResult<boolean>> {
    const response = await securedClient().get(`/management/member/${memberId}`).catch(handleError)
    return response?.data
} 


export async function deleteMemberWithId(requestId: unknown): ApiResponse<ModificationResult<string>> {
      const response = await securedClient().delete(`management/member/${requestId}`).catch(handleError)
      return response?.data
}