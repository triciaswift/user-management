# Project: User Management

### Objective

Develop a well-designed user management interface that displays a list of users retrieved from an API. Implement functionality to edit user information using a form.

### Duration

Approximately four hours.

### Requirements

1. **Setup**
    - Create a new React TypeScript project using the tool of your choice.
    - Include Tailwind CSS for styling.
    - Feel free to use third-party libraries.
2. **API Integration**
    - Utilize the [dummyJSON Users API](https://dummyjson.com/docs/users) to fetch a list of users.
    - Prepare a mock `fetch` request for submitting updated user data (the dummyJSON API doesn't support actual data mutation).
3. **Functionality**
    - Display a list of twenty users returned from the dummyJSON Users API. The list should display the user’s image, first name, last name, and email address.
    - Clicking on a user should open a form to edit a subset of the user’s information. This form can appear inline with the list, on a new page, or in a dialog. The form should allow users to edit the following information:
        - First name
        - Last name
        - Email
        - Date of birth
        - Gender (male or female)
        - The US state portion of their address
    - Include code to submit the edited information using a `fetch` request. This code won’t actually write any information, but should indicate whether the mock mutation has been completed successfully.
4. **TypeScript Utilization**
    - Define TypeScript types or interfaces for user data.
    - Ensure type safety across all components, including data and events.
5. **Design**
    - Use Tailwind to create a clean, consistent interface. Focus on simplicity and a clear hierarchy rather than novelty.
    - Indicate when network requests are in progress (e.g., loading the list of users, processing the update request).
6. **Additional Features (Optional)**
    - Implement client-side validation for the edit form. In addition to validating that all fields have values and are of the appropriate type, ensure that birth dates are between 01-01-1900 and 12-31-2100.
    - Add a feature to add a new user or delete existing users (mock functionality).

### Submission

- Submit the source code via a GitHub repository.

### Evaluation Criteria

- Functionality: Does the application meet the specified requirements?
- Code Quality: Is the code well-organized, readable, and maintainable?
- Use of React: Are components and state managed effectively?
- TypeScript Integration: Is TypeScript used correctly for type safety and data modeling?
- Styling: Is the UI visually appealing and user-focused?
