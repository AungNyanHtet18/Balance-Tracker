import { useEffect, useRef, useState } from "react";
import Page from "../../../ui/page";
import Pagination from "../../../ui/pagination";
import { useForm } from "react-hook-form";
import type { BalanceReportListItem, BalanceReportSearch } from "../../../model/dto/member/balance-report";
import NoData from "../../../ui/no-data";
import { searchBalance } from "../../../model/client/member/reporting-client";
import FormGroup from "../../../ui/form-group";
import { Link } from "react-router";
import type { PageResult } from "../../../model/dto";

export default function BalanceManagement() {

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [result, setResult] = useState<PageResult<BalanceReportListItem>>({contents : []})
    const {contents, pager} = result
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card')

    useEffect(() => {
        setPage(0)
    }, [size, setPage] )

    async function search(form: BalanceReportSearch) {
        const response = await searchBalance(form)
        if(response) {
            setResult(response)
        }
    }

    return (
        <Page title="Balance Management" icon={<i className="bi-pie-chart"></i>} actions={
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
            <SearchForm onSearch={search} page={page} size={size} />

            <section className="my-3">
                <ListView list={contents} viewMode={viewMode} />
            </section>

            <Pagination pager={pager} pageChange={setPage} sizeChange={setSize} />
        </Page>
    )
}

function SearchForm({page, size, onSearch} : {page: number, size : number, onSearch:(form:BalanceReportSearch) => void}) {

    const formRef = useRef<HTMLFormElement | null>(null)
    const {handleSubmit, reset, register} = useForm<BalanceReportSearch>()

    useEffect(() => {
        if(formRef.current) {
            reset({page : page, size : size})
            formRef.current.requestSubmit()
        }
    }, [page, size, reset])

    return (
        <form ref={formRef} onSubmit={handleSubmit(onSearch)} className="row">
            <FormGroup className="col-auto" label="Date From">
                <input {...register('from')} type="date" className="form-control" />
            </FormGroup>
            <FormGroup className="col-auto" label="Date To">
                <input {...register('to')} type="date" className="form-control" />
            </FormGroup>
            <div className="col btn-wrapper">
                <button type="submit" className="btn btn-dark">
                    <i className="bi-search"></i> Search
                </button>
            </div>
        </form>
    )
}

function ListView({list, viewMode} : {list : BalanceReportListItem[], viewMode: 'table' | 'card'}) {

    if(!list.length) {
        return (
            <NoData name="Balance Report" />
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
                                <h5 className="card-title text-truncate fw-bold mb-2 " title={item.ledger}>{item.ledger}</h5>
                                <p className="card-text text-muted mb-3 flex-grow-1">{item.particular || '-'}</p>
                                
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted small">Debit:</span>
                                    <span className="font-monospace text-danger">{item.debit.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                    <span className="text-muted small">Credit:</span>
                                    <span className="font-monospace text-success">{item.credit.toLocaleString()}</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-start mt-auto pt-1">
                                    <span className="fs-5 font-monospace mb-0">{item.balance.toLocaleString()}</span>
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
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
            {list.map(item => 
                <tr key={item.id.requestId}>
                    <td>{item.issueAt}</td>
                    <td>{item.id.code}</td>
                    <td>{item.ledger}</td>
                    <td>{item.particular}</td>
                    <td className="text-end">{item.debit.toLocaleString()}</td>
                    <td className="text-end">{item.credit.toLocaleString()}</td>
                    <td className="text-end">{item.balance.toLocaleString()}</td>
                    <td className="text-center">
                        <Link to={`/member/balance/${item.id.requestId}`} className="icon-link color-type">
                            <i className="bi-arrow-right"></i>
                        </Link>
                    </td>
                </tr>
            )}    
            </tbody>
        </table>
    )
}