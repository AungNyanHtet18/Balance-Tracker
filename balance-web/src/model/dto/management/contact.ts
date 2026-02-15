import type { PageSearch } from ".."

export type ContactUsListItem = {
     id: number,
     fullName: string,
     email: string,
     phone: string,
     message: string,
     createdAt: string
}

export type ContactUsSearch = {
     createFrom?: string,
     createTo?: string,
     keyword?: string
} & PageSearch