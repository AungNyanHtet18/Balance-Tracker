import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { getMemberDetails, updateMemberDetail } from "../../../model/client/member/member-profile-client"
import type {MemberForm } from "../../../model/dto/member/member-profile"
import Page from "../../../ui/page"
import Card from "../../../ui/card"
import FormGroup from "../../../ui/form-group"
import { useNavigate } from "react-router"
import MemberImage from "../../../ui/member-image"

export default function MemberInfoEdit() {

     const [email, setEmail] = useState<string>()
     const [memberPhoto, setMemberPhoto] = useState<File | string>()
     const {register, setValue, handleSubmit, reset, formState: {isValid}} = useForm<MemberForm>()
     const fileSelectRef = useRef<HTMLInputElement | null >(null)
     const navigate = useNavigate()

    useEffect(() => {
       async function load() {
           const response =  await getMemberDetails()
           if(response) {
               reset({
                  name: response.name,
                  phone: response.phone,
                  address: response.address
               })

               setEmail(response.email)
               setMemberPhoto(response.profileImage)
           }

           console.log(response);
       }
        load()
    }, [reset])


    function uploadImage() {
       setValue('profileImage', undefined, {shouldValidate : true})
       setMemberPhoto(undefined)
       fileSelectRef.current?.click()
    }

    function changeSelectedFile(e : React.ChangeEvent<HTMLInputElement>) {
       if(e.target.files?.length) {
           setValue('profileImage', e.target.files[0], {shouldValidate: true})
           setMemberPhoto(e.target.files[0])
       }
    }

    async function save(form: MemberForm) {
      const response = await updateMemberDetail(form)
      if(response) {
           navigate("/member")
      }
    }


     return (
          <Page icon={<i className="bi bi-person-check-fill"></i>} title="Member">
               <form onSubmit={handleSubmit(save)} className="row">
                 
                 <input ref={fileSelectRef} type="file" className="d-none" onChange={changeSelectedFile}/>
                 
                 <div className="col-8">
                    <Card icon={<i className="bi bi-person-circle"></i>} title="Member Data">
                         <FormGroup label="Email" className="mb-3">
                              <input type="text" readOnly={true} className="form-control" value={email} />
                         </FormGroup>
                         
                         <FormGroup label="Name" className="mb-3">
                              <input type="text" className="form-control" {...register('name',{required: true})} />
                         </FormGroup>

                         <FormGroup label="Phone" className="mb-3">
                              <input type="text" className="form-control" {...register('phone',{required: true})} />
                         </FormGroup>

                         <FormGroup label="Address" className="mb-3">
                              <textarea rows={4} className="form-control" {...register('address',{required: true})} />
                         </FormGroup>
                    </Card>
                 </div>

                 <div className="col-3">
                    <Card icon={<i className="bi bi-camera2"></i>} title="Member Data">
                       <MemberImage src={memberPhoto} />

                       <div className="mt-2">
                         <button onClick={uploadImage} type="button" className="btn btn-outline-secondary me-2">
                              <i className="bi-upload"></i> Upload Image
                         </button>

                         <button type="submit" disabled={!isValid} className="btn btn-secondary">
                            <i className="bi-save"></i> Save
                         </button>
                       </div>
                    </Card>
                 </div>
               </form>
          </Page>
     )
}