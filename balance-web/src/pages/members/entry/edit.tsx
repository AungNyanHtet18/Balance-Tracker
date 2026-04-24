import { useFieldArray, useForm, useWatch } from "react-hook-form";
import type { LedgerEntryForm, LedgerEntryItem } from "../../../model/dto/member/ledger-entry";
import FormGroup from "../../../ui/form-group";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useMemberLedgerContext } from "../../../model/provider/member-ledger-context";
import FormError from "../../../ui/form-error";
import { createEntry, findEntryById, updateEntry } from "../../../model/client/member/ledger-entry-client";
import { useEffect, useState } from "react";

const BLANK_ITEM:LedgerEntryItem = {item: '', remark: '', quantity: 0, unitPrice: 0}

const getTotal = (item: LedgerEntryItem) => {
    if(item) {
        const total = item.unitPrice * item.quantity
        return total ? total : 0
    }
    return 0
}

const getAllTotal = (items : LedgerEntryItem[]) => items.map(getTotal).reduce((a, b) => a + b)

export default function LedgerEntryEdit() {

    const params = useParams()
    const [query] = useSearchParams()
    const navigate = useNavigate()

    const ledgerType = params.type == 'credit' ? 'Credit' : 'Debit'
    const {ledgers} = useMemberLedgerContext()
    const ledgerOptions = ledgers.filter(a => a.type == ledgerType)
    const [count, setCount] = useState<number>(0)

    const {handleSubmit, control, register, reset, formState : {errors}} = useForm<LedgerEntryForm>({
        defaultValues: {
            code: '',
            particular: '',
            items: [
                {...BLANK_ITEM}
            ]
        }
    })
    
    const {fields, append, remove} = useFieldArray({
        control: control,
        name: 'items'
    })

    useEffect(() => {
        async function load(requestId:unknown) {
            const entry = await findEntryById(requestId)

            if(entry) {
                const {id, particular, items} = entry

                reset({
                    code: id.code,
                    particular: particular,
                    items : items
                })
            }
        }

        const id = query.get("id")
        if(id) {
            load(id)
        }
    }, [query, reset])

    async function save(form: LedgerEntryForm) {
        const existingRequestId = query.get("id")
        const response = existingRequestId ? await updateEntry(existingRequestId, form) : await createEntry(form)
        const requestId = typeof response?.id === 'string' ? response.id : response?.id?.requestId || existingRequestId

        if(requestId) {
            navigate(`/member/balance/${requestId}`)
        }
    }

    function addItem() {
        append({...BLANK_ITEM})
        setCount(count + 1)
    }

    function removeItem(index : number) {
        remove(index)

        if(fields.length == 1) {
            addItem()
        }

        setCount(count -1)
    }

    const itemArray = useWatch({control : control, name : 'items'})

    return (
        <div className="w-100 px-4 py-3">
           <div className="d-flex mb-3">
                <h4 className="fw-bold color-type"><i className="bi-pencil-square me-2"></i>
                    {query.get('id') ? "Edit" : "Create"} {ledgerType} Entry
                </h4>
           </div>
          
           <form onSubmit={handleSubmit(save)}>
                <div className="d-flex justify-content-between align-items-start gap-4">
                    <div className="w-25  rounded-3 border border-2 py-3" style={{height: '420px'}}>
                        <h5 className="color-type text-center fw-bold mb-4"><i className="bi-plus-circle me-1"></i>Ledger Entry</h5>

                        <FormGroup className="px-3 mb-4" label="Ledger">
                            <select {...register('code', {required : true})} className="form-select">
                                <option value="">Select Ledger</option>
                                {ledgerOptions.map(item => 
                                    <option key={item.id.code} value={item.id.code}>{item.name}</option>
                                )}
                            </select>
                            {errors.code && <FormError message="Please select ledger." />}
                        </FormGroup>

                        <FormGroup className="px-3" label="Particular">
                            <textarea {...register('particular', {required : true})} placeholder="Enter Praticular" className="form-control" rows={6} />
                            {errors.particular && <FormError message="Please enter particular message." />}
                        </FormGroup>
                    </div>

                    <div className="w-75 d-flex flex-column gap-4">   
                        <div className="w-100 d-flex align-items-start gap-4">   
                            <div className="w-50 border border-1 shadow rounded-3 p-3">
                                <h5 className="fw-bold mb-3 color-type text-center">
                                    <i className="bi-compass me-1"></i>Ledger Entry Guide</h5>

                                <div className="mb-3">
                                    <span className="fw-bold color-type">Entry Type:</span>
                                    <span className="ms-2 badge" style={{background: 'linear-gradient(80deg, #d847fc, #e08cc0)'}}>{ledgerType}</span>
                                </div>

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-flex flex-column gap-2 small">
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi-journal-check text-success"></i>
                                            <span>Select ledger account</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi-pencil text-primary"></i>
                                            <span>Enter clear particular</span>
                                        </div>

                                    </div>

                                    <div className="d-flex flex-column gap-2 small">
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi-plus-circle text-warning"></i>
                                            <span>Add at least one item</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi-calculator text-info"></i>
                                            <span>Verify quantity & unit price</span>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                
                                <div className="text-center">
                                    {fields.length === 0 ? (
                                    <span className="badge bg-danger">
                                        <i className="bi-exclamation-circle me-1"></i>
                                        No items added
                                    </span>
                                    ) : (
                                    <span className="badge" style={{background: 'linear-gradient(80deg, #d847fc, #e08cc0)'}} >
                                        <i className="bi-check-circle me-1"></i>
                                        Entry looks valid
                                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="w-50 border border-1 shadow rounded-3 p-3">
                                <h5 className="fw-bold text-center mb-3 color-type">
                                    <i className="bi-clipboard-data me-1"></i>
                                    Entry Overview
                                </h5>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total Items</span>
                                    <strong>{fields.length }</strong>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <strong>{getAllTotal(itemArray)}</strong>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Average Item Cost</span>
                                    <strong>
                                    {fields.length
                                        ? Math.round(getAllTotal(itemArray) / fields.length)
                                        : 0}
                                    </strong>
                                </div>

                                <hr />

                                <div className="text-center">
                                    {fields.length === 0 ? (
                                    <span className="badge bg-danger">
                                        <i className="bi-x-circle me-1"></i>No Items Added
                                    </span>
                                    ) : (
                                    <span className="badge" style={{background: 'linear-gradient(80deg, #d847fc, #e08cc0)'}}>
                                        <i className="bi-check-circle me-1"></i>Ready to Save
                                    </span>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="py-3 border border-1 rounded-3 shadow" style={{background: 'linear-gradient(80deg, #d847fc, #e08cc0)'}}>
                            <h5 className="text-white text-center fw-bold mb-3"><i className="bi-file-earmark-text me-1"></i>Ledger Entry Item</h5>

                            {fields.map((item, index) => 
                            <div className="row mb-2 px-3" key={item.id}>
                                <FormGroup label={`${index ? '' : 'Item'}`} className="col" labelClassName="text-white">
                                    <input {...register(`items.${index}.item`, {required : true})} placeholder="Enter Item Name" className="form-control" />
                                    {errors.items && errors.items[index]?.item && <FormError message="Item name is required." />}
                                </FormGroup>

                                <FormGroup label={`${index ? '' : 'Unit Price'}`} className="col-2" labelClassName="text-white">
                                    <input {...register(`items.${index}.unitPrice`, {required: true, min: 0})} type="number" className="form-control text-end" />
                                    {errors.items && errors.items[index]?.unitPrice && <FormError message="Invalid Unit Price." />}
                                </FormGroup>

                                <FormGroup label={`${index ? '' : 'Quantity'}`} className="col-2" labelClassName="text-white">
                                    <input {...register(`items.${index}.quantity`, {required: true, min: 0})} type="number" className="form-control text-end" />
                                    {errors.items && errors.items[index]?.quantity && <FormError message="Invalid Quantity." />}
                                </FormGroup>

                                <FormGroup label={`${index ? '' : 'Total'}`} className="col-2" labelClassName="text-white">
                                    <span className="form-control text-end">{getTotal(itemArray[index])}</span>
                                </FormGroup>

                                <FormGroup label={`${index ? '' : 'Remark'}`} className="col" labelClassName="text-white">
                                    <div className="input-group">
                                        <input {...register(`items.${index}.remark`)} type="text" placeholder="Enter Remark" className="form-control" />
                                        <button type="button" onClick={() => removeItem(index)} className="btn btn-danger">
                                            <i className="bi-trash"></i>
                                        </button>
                                    </div> 
                                </FormGroup>
                            </div>)}

                            <div className="text-end pt-2 px-3">
                                <button type="button" onClick={addItem} className="btn btn-warning">
                                    <i className="bi-plus"></i> Add Item
                                </button>

                                <button type="submit" className="btn btn-dark ms-2">
                                    <i className="bi-save"></i> {`Save ${ledgerType} Entry`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
           </form>
        </div>
    )
}
