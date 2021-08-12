import axios from "axios";

export default async function usernameExistsInBackend(username) {
  const url = `http://localhost:5000/api/user/checkUsername/${username}`;
  const data = await axios.get(url);
  console.log(data);
  // if (data.data === true) {
  //   return true;
  // } else {
  //   return false;
  // }
  return data.data;
}
