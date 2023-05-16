const user = {
  id: 2,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
}

const invalidEmail = {
  email: "tfc.com",
  password: "123456",
}

const invalidPassword = {
  email: "tfc@user.com",
  password: "123",
}

const withoutPassword = {
  email: "tfc@projeto.com"
}

const notFoundUser = {
  email: 'invalid@user.com',
  password: '123456',
}

export { user, invalidEmail, invalidPassword, withoutPassword, notFoundUser };