export const validateLogin = (input) => {
	const errors = {};

	if (!input.username) {
		errors.username = "Username is required.";
	} else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
		errors.username = "Username has invalid characters.";
	}

	if (!input.password.trim()) {
		errors.password = "Password is required";
	} else if (input.password.length < 7) {
		errors.password = "Password must be at least 7 characters long.";
	} else if (!/[A-Z]/.test(input.password)) {
		errors.password = "Password must contain at least one uppercase letter.";
	} else if (!/[0-9]/.test(input.password)) {
		errors.password = "Password must contain at least one number.";
	} else if (!/[^A-Za-z0-9]/.test(input.password)) {
		errors.password = "Password must contain at least one special character.";
	}

	return errors;
};
