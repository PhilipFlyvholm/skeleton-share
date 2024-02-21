export function dataURLtoFile(dataurl: string, filename: string) {
	const arr = dataurl.split(',');
	if (arr.length < 2) return null;
	const mime = arr[0].match(/:(.*?);/);
	if (!mime) return null;
	const bstr = atob(arr[arr.length - 1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime[1] });
}
