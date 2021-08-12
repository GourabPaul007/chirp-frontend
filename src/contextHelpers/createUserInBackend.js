import axios from "axios";

export default async function createUserInBackend(uid, email, displayName, name) {
  const url = `http://localhost:5000/api/user/newUser`;
  await axios.post(url, {
    uid: uid,
    name: name,
    username: displayName,
    email: email,
    about: "",
  });
  console.log("CREATE USER IN BACKEND");
  return;
}
