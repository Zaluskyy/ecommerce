import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const registerSchema = yup.object().shape({
    name: yup
    .string()
    .required("Required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup.string()
        // .min(8)
        .matches(passwordRules, {message: "Your password have to include at least 1 lower case letter, 1 uppercase letter, 1 numerical digit and one special character"})
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Required")
})

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .required()
})

export const adressSchema = yup.object().shape({
    name: yup
        .string()
        .required("Require"),
    surname: yup
        .string()
        .required("Require"),
    street: yup
        .string()
        .required("Require"),
    apartmentNumber: yup
        .string()
        .required("Require"),
    zipCode: yup
        .string()
        .required("Require"),
    city: yup
        .string()
        .required("Require"),
    telephone: yup
        .string()
        .required("Require"),
    email: yup
        .string()
        .required("Require"),
})

export const forgotPassword = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
})





export const changePrimaryData = yup.object().shape({
    name: yup
        .string()
        .required("Required"),
    surname: yup
        .string()
        .required("Required"),
    telephone: yup
        .number()
        .required("Require"),
})

export const changeEmail = yup.object().shape({
    currentEmail: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    newEmail: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    confirmNewEmail: yup
        .string()
        .oneOf([yup.ref('newEmail')], "Emails must match")
        .required("Required")
})

export const changePassword = yup.object().shape({
    currentPassword: yup
        .string()
        .required("Required"),
    newPassword: yup
        .string()
        .matches(passwordRules, {message: "Your password have to include at least 1 lower case letter, 1 uppercase letter, 1 numerical digit and one special character"})
        .required("Required"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], "Passwords must match")
        .required("Required")
})