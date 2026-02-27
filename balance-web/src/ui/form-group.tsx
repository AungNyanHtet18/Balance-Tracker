import type React from "react";

export default function FormGroup({label, className, labelClassName, children}:{label:string, className?: string, labelClassName?: string , children?: React.ReactNode}) {
    return (
        <div className={className}>
            {label && 
                <label className={`form-label fw-semibold ${labelClassName}`} style={{color: '#8f23aa'}}>{label}</label>
            }
            {children}
        </div>
    )
}