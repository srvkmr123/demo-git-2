import * as yup from 'yup'
console.log('sign up validation');
export  const signUpValidationSchema = yup.object().shape({
    name:yup
    .string()
    .required('Email Address is Required'),
    emailAddress: yup
      .string()
      // .email("Please enter valid email")
      .required('Email Address is Required')
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Please enter valid email')
      ,
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .matches(
        /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
       'need one special character'),
    confirmPassword: yup.string().required('Please Re-enter Password')
       .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })