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
            <h1 className="title">Add New Users</h1>
            <div className="column-field">
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                <Field type="text" name="name" placeholder="John Smith" className="field-len" />
                <label className="field-len">
                    Name
                </label>
            </div>
            <div className="column-field" id="email-field">
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <Field type="email" name="email" placeholder="123abc@email.com" className="field-len" />
                <label className="field-len">
                    Email
                </label>
            </div>
            <div className="here">
                <label className="pass-col">
                    {touched.password && errors.password && <p id="two-errors" className="error">{errors.password}</p>}
                    <Field type="password" name="password" />
                    Password
                </label>
                <label>
                    {touched.terms && errors.terms && <p id="two-errors" className="error">{errors.terms}</p>}
                    <Field type="checkbox" name="terms"/>
                    <span>Terms of Service</span>
                </label>
            </div>
            <div className="button">
                <button type="submit" className="sub-button">Submit</button>
            </div>
            {user.map((user, index) => (
                <div className="new-user" key={index}>User# {index + 1}:  {user.name}</div>
            ))}
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