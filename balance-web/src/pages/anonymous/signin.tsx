import { Link, useNavigate } from "react-router";
import FormGroup from "../../ui/form-group";
import { useForm } from "react-hook-form";
import type { SignInForm } from "../../model/dto/anonymous/commons";
import { signInRequest } from "../../model/client/anonymous/client";
import { authStore } from "../../model/store/auth-result.store";
import { useState } from "react";

export default function SignIn() {

    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm<SignInForm>()
    const {setAuth} = authStore()
    const [deleted, setDeleted] = useState<boolean>(false)

    async function signIn(form : SignInForm) {
        const result = await signInRequest(form)
        setAuth(result)
        
        if(result?.deleted == true) {
             setDeleted(result.deleted)
        }

        else if(result) {
            navigate(`/${result.role.toLocaleLowerCase()}`)
        }
    }

    return (
        <div className="border border-1 rounded-3 shadow-sm py-4 px-5 login-height">
            <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-center align-items-center gap-1">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center rounded-circle login-circle" >
                            <i className="bi bi-person fs-1 text-white"></i>
                        </div>
                    </div>
                    <h1 className="fw-bold color-type">Apex Balance</h1>
                </div>

                 
                 <h5 className="mt-2 fw-bold"><i className="bi-unlock me-1"></i>Have an account?</h5>
            </div>
           

            {deleted && 
                <h5 className="text-danger bg-danger-subtle p-2 rounded rounded-3 border border-danger">Temporarily Banned</h5>
            }

            <form onSubmit={handleSubmit(signIn)} className="mt-1">
                <FormGroup className="login-width">
                    <input type="text" className="form-control bg-light" placeholder="Email" 
                        {...register('email', {required : "Please enter email for login."})}/>
                    {errors.email && <span className="text-sm text-danger">{errors.email?.message}</span>}
                </FormGroup>

                <FormGroup  className="mt-3 login-width">
                    <input type="password" className="form-control bg-light" placeholder="Password"
                        {...register('password', {required : "Please enter password."})}/>
                    {errors.password && <span className="text-sm text-danger mt-3">{errors.password?.message}</span>}
                </FormGroup>

                <div className="mt-4">
                    <button type="submit" className="btn btn-outline-dark">
                        <i className="bi-unlock"></i> Sign In
                    </button>

                    <Link to="/signup" className="btn btn-purple ms-2">
                        <i className="bi-person-plus"></i> Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}