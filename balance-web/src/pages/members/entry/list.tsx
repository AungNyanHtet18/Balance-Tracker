import { Link, useParams } from "react-router";
import Page from "../../../ui/page";
import { useEffect, useRef, useState } from "react";
import type { LedgerType } from "../../../model/constants";
import Loading from "../../../ui/loading";
import Pagination from "../../../ui/pagination";
import { useForm } from "react-hook-form";
import type { LedgerEntryListItem, LedgerEntrySearch } from "../../../model/dto/member/ledger-entry";
import { deleteEntry, searchEntry } from "../../../model/client/member/ledger-entry-client";
import NoData from "../../../ui/no-data";
import FormGroup from "../../../ui/form-group";
import { useMemberLedgerContext } from "../../../model/provider/member-ledger-context";
import type { PageResult } from "../../../model/dto";

export default function LedgerEntryManagement() {

    const params = useParams()
    const ledgerType = params.type == 'credit' ? "Credit" : "Debit"
    
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [result, setResult] = useState<PageResult<LedgerEntryListItem>>({contents: []})
    const [searchForm, setSearchForm] = useState<LedgerEntrySearch>({
        type: params.type == 'credit' ? "Credit" : "Debit",
        page: 0,
        size: 10
    })
    const {contents, pager} = result
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card')

    useEffect(() => {
        setPage(0)
    }, [size, setPage])

    if(!ledgerType) {
        return <Loading />
    }

    const icon = ledgerType === 'Credit' ? <i className="bi-bag-plus"></i> : <i className="bi-bag-dash"></i>

    async function search(form:LedgerEntrySearch) {
        const response = await searchEntry(form)
        if(response) {
            setResult(response)
            setSearchForm(form)
        }
    }

    async function deleteLedgerEntry(requestId: string) { 
       const response = await deleteEntry(requestId)
       
       if(response) {
         console.log(response.message);
            const searchResponse = await searchEntry(searchForm)
            if(searchResponse) {
                setResult(searchResponse)
            }
       }


    }

    return (
        <Page icon={icon} title={`${ledgerType} Management`} actions={
                <div className="d-flex justify-content-end mb-3">
                    <div className="btn-group shadow-sm">
                        <button type="button" className={`btn btn-sm ${viewMode === 'card' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setViewMode('card')} title="Card View">
                            <i className="bi-grid"></i>
                        </button>
                        <button type="button" className={`btn btn-sm ${viewMode === 'table' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setViewMode('table')} title="Table View">
                            <i className="bi-table"></i>
                        </button>
                    </div>
                </div>
        }>
            <SearchForm page={page} size={size} type={ledgerType} onSearch={search} />

            <section className="my-3">

                <ListView list={contents} viewMode={viewMode} deleteLedgerEntry={deleteLedgerEntry} />
            </section>

            <Pagination pageChange={setPage} sizeChange={setSize} pager={pager} />
        </Page>
    )
}

function SearchForm({type, page, size, onSearch} : {type: LedgerType, page : number, size : number, onSearch : (form:LedgerEntrySearch) => void}) {

    const formRef = useRef<HTMLFormElement | null>(null)
    const {reset, handleSubmit, register} = useForm<LedgerEntrySearch>()
    const {ledgers} = useMemberLedgerContext()

    const ledgerOptions = ledgers.filter(a => a.type == type)

    useEffect(() => {
        if(formRef.current) {
            reset({type : type, page : page, size : size})
            formRef.current.requestSubmit()
        }
    }, [type, page, size,reset])

    return (
        <form className="row" ref={formRef} onSubmit={handleSubmit(onSearch)}>
            <FormGroup className="col-auto" label="Ledger">
                <select {...register('code')} className="form-select">
                    <option value="">Search All</option>
                    {ledgerOptions.map(item => 
                        <option key={item.id.code} value={item.id.code}>{item.name}</option>
                    )}
                </select>
            </FormGroup>

            <FormGroup className="col-auto" label="From Date">
                <input {...register('from')} type="date" className="form-control" />
            </FormGroup>

            <FormGroup className="col-auto" label="To Date">
                <input {...register('to')} type="date" className="form-control" />
            </FormGroup>

            <FormGroup className="col-auto" label="Keyword">
                <input {...register('keyword')} placeholder="Search Keyword" className="form-control" />
            </FormGroup>

            <div className="col btn-wrapper">
                <button className="btn btn-dark" type="submit">
                    <i className="bi-search"></i> Search
                </button>

                <Link to={`/member/entry/${type.toLowerCase()}/edit`} className="btn btn-purple ms-2">
                    <i className="bi-plus"></i> Add New
                </Link>
            </div>
        </form>
    )
}

function ListView({list, viewMode, deleteLedgerEntry} : {list : LedgerEntryListItem[], viewMode: 'table' | 'card', deleteLedgerEntry : (requestId: string) => void}) {

    if(!list.length) {
        return (
            <NoData name="Ledger Entry" />
        )
    }

    if (viewMode === 'card') {
        return (
            <div className="row g-3">
                {list.map(item => (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id.requestId}>
                        <div className="card h-100 shadow-sm border-2">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="badge" style={{backgroundColor: '#8f23aa'}}>{item.id.code}</span>
                                    <small className="text-muted"><i className="bi-calendar3 me-1"></i> {item.issueAt}</small>
                                </div>
                                <h5 className="card-title text-truncate fw-bold mb-2 " title={item.ledgerName}>{item.ledgerName}</h5>
                                <p className="card-text text-muted mb-3 flex-grow-1">{item.particular || '-'}</p>
                                <div className="d-flex justify-content-between align-items-start mt-auto pt-3 border-top">
                                    <span className="fs-5 font-monospace mb-0">{item.amount.toLocaleString()}</span>
                                    <Link to={`/member/balance/${item.id.requestId}`} className="icon-link color-type text-decoration-none">
                                        <i className="bi bi-arrow-right-circle-fill fs-4"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>Issue At</th>
                    <th>Code</th>
                    <th>Ledger</th>
                    <th>Particular</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Delete</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
            {list.map(item => 
                <tr key={item.id.requestId}>
                    <td>{item.issueAt}</td>
                    <td>{item.id.code}</td>
                    <td>{item.ledgerName}</td>
                    <td>{item.particular}</td>
                    <td className="text-end">{item.amount.toLocaleString()}</td>
                    <td className="text-center">
                        <button className="btn btn-danger" onClick={() => {deleteLedgerEntry(item.id.requestId)}}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </td>
                    <td className="text-center">
                        <Link to={`/member/balance/${item.id.requestId}`} className="icon-link color-type mt-2">
                            <i className="bi-arrow-right"></i>
                        </Link>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}