export default function PlanInfo({name, value} : {name: string, value: string | number}) {
    return (
        <div className={`d-flex justify-content-between list-group-item`}>
            <label className="fw-semibold d-flex">{name}</label>
            <span className="text-muted">{value}</span>
        </div>
    )

}