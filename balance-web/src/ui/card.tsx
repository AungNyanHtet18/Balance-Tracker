import type React from "react";

export default function Card({title, icon, className, children} : {title?: string, icon? : React.ReactNode, className?: string, children?: React.ReactNode}) {
    return (
        <div className={`card ${className}`}>
            <div className="card-body">
                {title && 
                    <h5 className="d-flex gap-2 color-type fw-bold">{icon}{title}</h5>
                }

                {children}
            </div>
        </div>
    )
}