const getUsers = async (req, res, next) => {
  const users = [
    {
      email: 'abc@gmail.com',
    },
    {
      email: 'def@gmail.com',
    },
  ];
  return res.status(200).json({
    users,
  });
};

module.exports = {
  getUsers,
};
