const createTokenUser = (user) => {
  return { name: user.name, id: user._id };
};
export default createTokenUser;
