export default function NoData({name} : {name?: string}) {
    return (
        <div className="py-2 px-3 rounded-3 text-white d-flex" style={{backgroundColor: "#8f23aa"}}>
            <h5>There is {name ?? 'data'}. Please search again.</h5>
        </div>
    )
}