export const handleChange = (event, formdata, setFormData) => {
  const { name, value } = event.target;
  setFormData({ ...formdata, [name]: value });
};
