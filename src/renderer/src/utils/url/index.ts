export function getFilenameFromUrl(url: string | URL) {
  if (url instanceof URL) {
    const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    return filename;
  }

  const filename = url.substring(url.lastIndexOf('/') + 1);
  return filename;
}
