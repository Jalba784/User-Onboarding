import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from 'yup';
import axios from 'axios';


const FormComp = () => {
    return (
        <Form>
            <div className="name-field">
                <label>
                    <Field type="text" name="name" placeholder="John Smith" />
                    Name
                </label>
            </div>
            <div className="email-field">
                <label>
                    <Field type="email" name="email" placeholder="123abc@email.com" />
                    Email
                </label>
            </div>
            <div className="password-terms">
                <label>
                    <Field type="password" name="password" />
                    Password
                </label>
                <label>
                    <Field type="checkbox" name="terms"/>
                    <span>Terms of Service</span>
                </label>
            </div>
            <div className="button">
                <button type="submit">Submit</button>
            </div>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
            terms: values.terms || false
        }
    },
    validationSchema: yup.objec().shape({
        name: yup.string().required('Name is required!'),
        email: yup.string().email().required('Email is required!'),
        password: yup.string().required('Password is required!'),
        terms: yup.boolean().oneOf([true], 'Terms must be agreed')
    }),
    handleSubmit: (values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
            .then((res) => {
                setStatus(res.data)
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }
})(FormComp)