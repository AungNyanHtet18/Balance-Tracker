import type { ApiResponse, PageResult } from "../../dto";
import type { ContactUsListItem, ContactUsSearch } from "../../dto/management/contact";
import { handleError } from "../_error_handler";
import { securedClient } from "../_instance";

export async function searchContact(form: ContactUsSearch): ApiResponse<PageResult<ContactUsListItem>> {
     const response = await securedClient().get('/management/contact', {params: form}).catch(handleError)
     return response?.data
}