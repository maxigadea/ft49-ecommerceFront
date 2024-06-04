import { LoginErrorProps, LoginProps, RegisterErrorProps, RegisterProps } from "@/types";

export function validateLoginForm(values: LoginProps): LoginErrorProps  {
    let errors: LoginErrorProps = {}
    
    if(!values.email) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    } else if(!values.password) {
        errors.password = "Password is required"
    }

    return errors;
}

export function validateRegisterForm(values: RegisterProps): RegisterErrorProps  {
    let errors: LoginErrorProps = {}
    
    if(!values.email) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    } else if(!values.password) {
        errors.password = "Password is required"
    }
    else if(!values.name) {
        errors.password = "Name is required"
    }
    else if(!values.address) {
        errors.password = "Address is required"
    }
    else if(!values.phone) {
        errors.password = "Phone number is required"
    }

    return errors;
}