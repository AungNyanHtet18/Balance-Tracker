import { useEffect, useRef, useState } from "react"
import type { ContactUsListItem, ContactUsSearch } from "../../../model/dto/management/contact"
import {deleteContact, searchContact } from "../../../model/client/management/contact-client"
import Page from "../../../ui/page"
import { useForm } from "react-hook-form"
import type { PageResult } from "../../../model/dto"
import FormGroup from "../../../ui/form-group"
import NoData from "../../../ui/no-data"
import Pagination from "../../../ui/pagination"

export default function ContactUsManagement() {
    
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [result, setResult] = useState<PageResult<ContactUsListItem>>({contents: []})
    const {contents, pager} = result
    const [searchForm, setSearchForm] = useState<ContactUsSearch>({ 
        page: 0,
        size: 10
    })

    async function search(form: ContactUsSearch) {
         const response = await searchContact(form)
         if(response) {
             setResult(response)
             setSearchForm(form)
         }
    }

    async function deleteContactUs(requestId: string) {
         const response = await deleteContact(requestId)

         if(response) {
             console.log(response.message);
             
             const searchResponse = await searchContact(searchForm)
             if(searchResponse) {
                 setResult(searchResponse)
             }
          }
    }

    return (
        <Page icon={<i className="bi bi-chat-dots"></i>} title="Contact Us Management">
           <SearchForm page={page} size={size} onSearch={search} />

            <section className="my-3">
                <ListView list={contents} deleteContactUs={deleteContactUs}/>
            </section>
            
            <Pagination pageChange={setPage} sizeChange={setSize} pager={pager} />
        </Page>
     )
}

function SearchForm({page = 0, size= 10, onSearch} : {page: number, size: number, onSearch : (form: ContactUsSearch) => void}) {

    const {reset, handleSubmit, register, getValues} = useForm<ContactUsSearch>()
    const searchForm = useRef<HTMLFormElement | null> (null)

    useEffect(() => {
         if(searchForm.current) {
             reset({...getValues(), page: page, size: size})
             searchForm.current.requestSubmit()
         }
    }, [page, size, reset, getValues])

   return (
     <form ref={searchForm} onSubmit={handleSubmit(onSearch)} className="row">
        <FormGroup label="Create From" className="col-auto">
            <input {...register('createFrom')} type="date" className="form-control"/>
        </FormGroup>

        <FormGroup label="Create To" className="col-auto">
            <input {...register('createTo')} type="date" className="form-control"/>
        </FormGroup>

        <FormGroup label="Keyword" className="col-auto">
            <input {...register('keyword')} placeholder="Search Keyword" className="form-control"/>
        </FormGroup>

        <div className="col btn-wrapper">
            <button type="submit" className="btn btn-dark">
                <i className="bi-search"></i> Search
            </button>
        </div>
     </form>
   )
}

function ListView({list, deleteContactUs} : {list: ContactUsListItem[], deleteContactUs : (requestId: string) => void} ) {
    
    if(!list.length) {
         return (
            <NoData name="Contact List"/>
         )
    }


    return (
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Created At</th>
                    <th className="text-center">Delete</th>
                    
                </tr>
            </thead>

            <tbody>
                {list.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.message}</td>
                        <td>{item.createdAt}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteContactUs(item.id.toString())}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}