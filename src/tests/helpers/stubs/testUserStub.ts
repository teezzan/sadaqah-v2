export const testUser = {
  name: "Taiwo Hassan Yusuf",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GiElBx6WH-wpDlisQycxVg8U8J_vxHRZ6MGxv-yOg=s96-c",
  id: "73081a33-419f-f819-8583-7d41dbae5750",
  iss: "https://securetoken.google.com/sadaqah-4743e",
  aud: "sadaqah-4743e",
  auth_time: 1651949976,
  user_id: "8zK6sk786895ne3n4UHi86ew13d5g3453h3",
  sub: "8zK6sk786895ne3n4UHi86ew13d5g3453h3",
  iat: new Date().getTime(),
  exp: new Date().getTime() + 3600 * 24,
  email: "test@gmail.com",
  email_verified: true,
  firebase: {
    identities: {
      "google.com": ["1054866032214949553922498"],
      email: ["test@gmail.com"],
    },
    sign_in_provider: "google.com",
  },
  uid: "8zK6sk786895ne3n4UHi86ew13d5g3453h3",
};

export default { testUser };
