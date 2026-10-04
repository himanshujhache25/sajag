/* Handing a file to the phone.

   This looks like three lines of boilerplate and is not. The anchor has to
   be inside the document for Chromium to honour `download`, and the object
   URL has to outlive the click, or the browser cancels the save without
   saying anything. A journey test caught both at once: the safety card drew
   perfectly and then saved nothing. */
export function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 0);
}
