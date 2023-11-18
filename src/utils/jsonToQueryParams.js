export function jsonToQueryParams(json) {
  if (!json) return "";

  return Object.keys(json)
    .map((key) => {
      // eslint-disable-next-line prefer-template
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}
