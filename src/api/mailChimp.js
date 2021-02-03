import axios from "axios";

export default async function contact(email, firstname, lastname) {
  const request = await axios
    .post("https://une-felt.com/mailchimp/", {
      params: { email: email, firstname: firstname, lastname: lastname },
    })
    .then((res) => {
      console.log(res);
    });
  return request;
}
