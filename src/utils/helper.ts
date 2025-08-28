const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? ""
    : "Invalid email format";
};

const validatePassword = (value: string) => {
  if (value.length < 6) return "Password must be at least 6 characters";
  return "";
};
