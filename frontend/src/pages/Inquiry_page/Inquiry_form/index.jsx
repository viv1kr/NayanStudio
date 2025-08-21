import React from "react";
import { useFormik } from "formik";
import { inquiryFormSchema } from "./validationSchema";
import "./inquiry_form_style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_cc909wn";
const OWNER_TEMPLATE_ID = "template_rvzc3fy";
const USER_TEMPLATE_ID = "template_1pm47cb";
const PUBLIC_KEY = "VBg5bVcwrH61B7zB1";

const Index = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      details: "",
    },
    validationSchema: inquiryFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const templateParams = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          subject: values.subject,
          eventDetails: values.details,
        };

        // Sends the inquiry email to the owner
        await emailjs.send(
          SERVICE_ID,
          OWNER_TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );

        // Sends the thank you email to the user
        await emailjs.send(
          SERVICE_ID,
          USER_TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );

        // Displays a success toast notification
        toast.success(
          "Got it! Your inquiry has been sent. Expect a reply shortly!"
        );
        // Resets the form fields after a short delay for user feedback
        setTimeout(() => {
          resetForm();
        }, 1500);
      } catch (error) {
        // Displays an error toast notification if email sending fails
        toast.error("Failed to send message. Please try again.");
        // Logs the error to the console for debugging purposes
        console.error("Error submitting form:", error);
      } finally {
        // Ensures the submit button is re-enabled after submission attempt
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="Form_view">
      {/* ToastContainer for displaying system messages (success/error) */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* The main inquiry form */}
      <form className="Inquiry_form" onSubmit={formik.handleSubmit}>
        <div className="Input_text">
          <label htmlFor="Name">
            Name <span>(required)</span>
          </label>
          <div className="Full_name">
            {/* First Name input field */}
            <label htmlFor="firstName" className="user_name">
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange} // Updates Formik state on change
                onBlur={formik.handleBlur} // Triggers validation on blur
                disabled={formik.isSubmitting}
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? "name_field error" // Adds 'error' class if validation fails
                    : "name_field"
                }
              />
              {/* Displays first name validation error message */}
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error_message">{formik.errors.firstName}</div>
              )}
            </label>
            {/* Last Name input field */}
            <label htmlFor="lastName" className="user_name">
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange} // Updates Formik state on change
                onBlur={formik.handleBlur} // Triggers validation on blur
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? "name_field error" // Adds 'error' class if validation fails
                    : "name_field"
                }
              />
              {/* Displays last name validation error message */}
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="error_message">{formik.errors.lastName}</div>
              )}
            </label>
          </div>
        </div>

        <div className="Input_text">
          {/* Email input field */}
          <label htmlFor="email">
            Email Address <span>(required)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange} // Updates Formik state on change
            onBlur={formik.handleBlur} // Triggers validation on blur
            className={
              formik.touched.email && formik.errors.email ? "error" : "" // Adds 'error' class if validation fails
            }
          />
          {/* Displays email validation error message */}
          {formik.touched.email && formik.errors.email && (
            <div className="error_message">{formik.errors.email}</div>
          )}
        </div>

        <div className="Input_text">
          {/* Subject input field */}
          <label htmlFor="subject">
            Subject <span>(required)</span>
          </label>
          <input
            type="text"
            name="subject"
            maxLength={200} // Limits subject input to 200 characters
            value={formik.values.subject}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange} // Updates Formik state on change
            onBlur={formik.handleBlur} // Triggers validation on blur
            className={
              formik.touched.subject && formik.errors.subject ? "error" : "" // Adds 'error' class if validation fails
            }
          />
          {/* Displays subject validation error message */}
          {formik.touched.subject && formik.errors.subject && (
            <div className="error_message">{formik.errors.subject}</div>
          )}
        </div>

        <div className="Input_text">
          {/* Event Dates / Details textarea */}
          <label htmlFor="details">
            Event Dates / Details <span>(required)</span>
          </label>
          <textarea
            name="details"
            cols="30"
            rows="10"
            value={formik.values.details}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange} // Updates Formik state on change
            onBlur={formik.handleBlur} // Triggers validation on blur
            className={
              formik.touched.details && formik.errors.details ? "error" : "" // Adds 'error' class if validation fails
            }
          ></textarea>
          {/* Displays details validation error message */}
          {formik.touched.details && formik.errors.details && (
            <div className="error_message">{formik.errors.details}</div>
          )}
        </div>

        <div className="submit_button">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={formik.isSubmitting ? "submitting" : ""}
          >
            {formik.isSubmitting ? <div className="processed"></div> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
