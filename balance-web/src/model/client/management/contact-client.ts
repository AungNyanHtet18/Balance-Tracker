import type { ApiResponse, ModificationResult, PageResult } from "../../dto";
import type { ContactUsListItem, ContactUsSearch } from "../../dto/management/contact";
import { handleError } from "../_error_handler";
import { securedClient } from "../_instance";

export async function searchContact(form: ContactUsSearch): ApiResponse<PageResult<ContactUsListItem>> {
     const response = await securedClient().get('/management/contact', {params: form}).catch(handleError)
     return response?.data
}

export async function deleteContact(requestId: unknown): ApiResponse<ModificationResult<string>> {
      const response = await securedClient().delete(`management/contact/${requestId}`).catch(handleError)
      return response?.data
}