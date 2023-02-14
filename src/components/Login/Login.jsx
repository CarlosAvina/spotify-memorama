import { generateRandomString } from "../../utils/utils";
import { stateKey } from "../../constants/constants";

function logIn() {
  const client_id = import.meta.env.VITE_CLIENT_ID; // Your client id
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI; // Your redirect uri

  const state = generateRandomString(16);

  localStorage.setItem(stateKey, state);
  const scope = "user-read-private user-read-email user-library-read";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location = url;
}

function Login() {
  return (
    <div>
      <h1>You need to log into Spotify</h1>
      <button onClick={logIn}>Log in</button>
    </div>
  );
}

export default Login;
