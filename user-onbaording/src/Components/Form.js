import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as yup from 'yup';
import axios from 'axios';


const FormComp = ({ errors, touched, status }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (status) {
            setUser([...user, status])
        }
    }, [status]);

    return (
        <Form>
            <div className="name-field">
                <label>
                    {touched.name && errors.name && <p className="error">{errors.name}</p>}
                    <Field type="text" name="name" placeholder="John Smith" />
                    Name
                </label>
            </div>
            <div className="email-field">
                <label>
                    {touched.email && errors.email && <p className="error">{errors.email}</p>}
                    <Field type="email" name="email" placeholder="123abc@email.com" />
                    Email
                </label>
            </div>
            <div className="password-terms">
                <label>
                    {touched.password && errors.password && <p className="error">{errors.password}</p>}
                    <Field type="password" name="password" />
                    Password
                </label>
                <label>
                    {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
                    <Field type="checkbox" name="terms"/>
                    <span>Terms of Service</span>
                </label>
            </div>
            <div className="button">
                <button type="submit">Submit</button>
            </div>
            {user.map((user) => (
                <div>User: {user.name}</div>
            )}
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
    validationSchema: yup.object().shape({
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