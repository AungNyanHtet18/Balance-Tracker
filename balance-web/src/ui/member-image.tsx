import { useEffect, useState } from 'react'
import MemberSrc from '../assets/MemberDefaultProfile.jpg'
import { authStore } from '../model/store/auth-result.store'

export default function MemberImage({src} : {src? : string | File}) {
    
    if(!src) {
        return  (
            <img src={MemberSrc} className='img-fluid' alt="There is no upload photo" />
        )
    }

    if(typeof src === 'string') {
        return (
            <SecuredImage src={src} />
        )
    }
    
    return (
        <img src={URL.createObjectURL(src)} className='img-fluid' alt="Member Photo" />
    )
}

function SecuredImage({src} : {src : string}) {

    const [url, setUrl] = useState('')
    const {auth} = authStore()

    useEffect(() => {
        if(auth) {
            fetch(`http://localhost:8080/userinfo/${src}`, {
                headers: {
                    Authorization : `Bearer ${auth.accessToken}`
                }
            })
            .then(res => res.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(memberUrl => setUrl(memberUrl))
        }
    }, [src, auth])

    if(!url) {
        return (
            <></>
        )
    }

    return (
        <img src={url} className='img-fluid' alt={src} />
    )
}