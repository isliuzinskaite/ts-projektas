const getAdmin = () => {
  const adminString = localStorage.getItem('admin');
  if (adminString) {
    return JSON.parse(adminString);
  }
  return null;
};

export default getAdmin;
