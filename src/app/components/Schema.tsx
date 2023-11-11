import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const registerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    // .min(8)
    .matches(passwordRules, {
      message:
        "Your password must contain: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required(),
});

export const adressSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  street: yup.string().required("Require"),
  apartmentNumber: yup.string().required("Require"),
  zipCode: yup.string().required("Require"),
  city: yup.string().required("Require"),
  telephone: yup.string().required("Require"),
});

export const forgotPassword = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export const changePrimaryData = yup.object().shape({
  fullName: yup.string().required("Required"),
  telephone: yup.number().required("Require"),
});
export const changePassword = yup.object().shape({
  currentPassword: yup.string().required("Required"),
  newPassword: yup
    .string()
    .matches(passwordRules, {
      message:
        "Your password have to include at least 1 lower case letter, 1 uppercase letter, 1 numerical digit and one special character",
    })
    .required("Required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});
export const deleteAccount = yup.object().shape({
  currentPassword: yup.string().required("Required"),
});
