import axios from "axios";

export async function getUserByUsername(username) {
  const userdata = await axios.get(`http://localhost:5000/api/user/${username}/getUserByUsername`);
  console.log(userdata);
  return userdata.data;
}
