import React from 'react';
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
// import axios from 'axios';

const Title = styled.h1`
    text-align: center;
`;

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
            sf
        }
    }
});