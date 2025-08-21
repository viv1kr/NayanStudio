# NayanStudio Website

This repository contains the code for the NayanStudio website, inquiry form that sends emails directly from the frontend.

---

## 🛠️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* An EmailJS account with configured services and templates (refer to EmailJS documentation for details).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure EmailJS in `src/components/InquiryForm/Index.jsx`:**
    Open `src/components/InquiryForm/Index.jsx` and replace the placeholder values with your actual EmailJS credentials:

    ```javascript
    const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
    const OWNER_TEMPLATE_ID = "YOUR_OWNER_EMAILJS_TEMPLATE_ID";
    const USER_TEMPLATE_ID = "YOUR_USER_THANK_YOU_EMAILJS_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
    ```
    * **IMPORTANT**: Ensure your EmailJS templates are configured correctly:
        * **Owner Template**: The "To Email" field in the EmailJS dashboard for this template should be your **fixed email address**.
        * **User Thank You Template**: The "To Email" field in the EmailJS dashboard for this template should be `{{email}}` to dynamically use the user's email from the form.

---

## ▶️ How to Run the Project

### 1. Start or Run the Project

From the `frontend` directory:
```bash
npm start
# or
yarn start
