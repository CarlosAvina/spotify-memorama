export function getHashParams(): { access_token?: string; state?: string } {
  let hashParams = {};

  let e = /([^&;=]+)=?([^&;]*)/g;
  let r = /([^&;=]+)=?([^&;]*)/g;
  let q = window.location.hash.substring(1);

  // @ts-ignore
  while ((e = r.exec(q))) {
    // @ts-ignore
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function mergeClasses(...classes: Array<string | null>) {
  let result = "";

  const classArray = [...classes];
  classArray.filter(Boolean).map((className) => (result += `${className} `));

  return result.trim();
}
