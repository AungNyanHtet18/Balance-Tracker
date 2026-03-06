import { Link, useNavigate } from "react-router";
import FormGroup from "../../ui/form-group";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpForm } from "../../model/dto/anonymous/commons";
import { signUpRequest } from "../../model/client/anonymous/client";
import { authStore } from "../../model/store/auth-result.store";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema)
    })
    const {setAuth} = authStore()
    const navigate = useNavigate()

    async function signUp(form:SignUpForm) {
        const response = await signUpRequest(form)
        if(response) {
            setAuth(response)
            navigate(`/${response.role.toLocaleLowerCase()}`)
        }
    }

    return (
        <div className="bg-white border border-1 rounded-3 shadow-sm py-4 px-5">
           
           <div className="d-flex flex-column gap-2">
                 <div className="d-flex justify-content-center align-items-center gap-1">
                        <div className="d-flex justify-content-center">
                            <div className= "d-flex justify-content-center rounded-circle login-circle" >
                            <i className="bi bi-person-fill-check fs-1 text-white"></i>
                            </div>
                        </div>

                        <h1 className="fw-bold color-type">Apex Balance</h1>
                   </div>
                 
                 <h5 className="mt-2 fw-bold"> <i className="bi bi-person-plus me-1"></i>Register an account</h5>
            </div>

            <form onSubmit={handleSubmit(signUp)} className="mt-1">
                <FormGroup className="login-width" >
                    <input type="text" className="form-control bg-light" placeholder="Username" {
                        ...register('name', {required : "Please enter your name."})
                    } />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </FormGroup>

                <FormGroup className="mt-3 login-width">
                    <input type="text" className="form-control bg-light" placeholder="Email " {
                        ...register('email', {required : "Please enter email for login."})
                    } />
                    {errors.email && <span className="text-danger mt-1">{errors.email.message}</span>}
                </FormGroup>

                <FormGroup className="mt-3 login-width">
                    <input type="password" className="form-control bg-light" placeholder="Password" {
                        ...register('password', {required : "Please enter password."})
                    } />
                    {errors.password && <span className="text-danger mt-1">{errors.password.message}</span>}
                </FormGroup>

                <div className="mt-4">
                    <button type="submit" className="btn btn-outline-dark">
                        <i className="bi-person-plus"></i> Sign Up
                    </button>

                    <Link to="/signin" className="btn btn-purple ms-2">
                        <i className="bi-unlock"></i> Sign In
                    </Link>
                </div>
            </form>
        </div>
    )
}