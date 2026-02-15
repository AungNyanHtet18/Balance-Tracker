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
   gender : 'Male' | 'Female' 
   dob: string
   address : string
   profileImage : string
}

export type MemberForm = {
	name : string
    address : string
    phone : string
    gender : 'Male' | 'Female'
    dob: string
	profileImage? : File 
}