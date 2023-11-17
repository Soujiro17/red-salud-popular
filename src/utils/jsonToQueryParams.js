export function jsonToQueryParams(json) {
  return Object.keys(json)
    .map((key) => {
      // eslint-disable-next-line prefer-template
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}
