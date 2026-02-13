export type CurrentPlan = {
    planId : number
    planName : string
    startAt : string
    expiredAt : string
    expired: boolean
}

export type MemberDetails = { 
   name : string
   email : string
   phone : string 
   address : string
   profileImage : string
}

export type MemberForm = {
	name : string
    address : string
    phone : string
	profileImage? : File 
}