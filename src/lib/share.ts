import { openShareDrawer } from "./share/ShareDrawerState.svelte.js";

export type Share = {
	title: string;
	url: string;
	text?: string;
	clipboardText?: string;
	files?: File[];
};
export enum ShareType {
	Native = 'Native',
	UI = 'UI'
}
const { Native, UI } = ShareType;

export function share(
	data: Share,
	preferNative = false
): Promise<ShareType> {
	return new Promise((resolve) => {
		const { title, url, text, files } = data;
		const clipboardText = data.clipboardText || text;
		const openDrawer = () => {
			openShareDrawer(
				{
					title,
					url,
					text: text,
					clipboardMessage: clipboardText,
					files: files
				}
			)
		};
		if (preferNative && navigator.canShare !== undefined && navigator.share) {
			const shareObject = createShareObject(title, url, text, files);
			navigator
				.share(shareObject)
				.then(() => {
					resolve(Native);
				})
				.catch(() => {
					openDrawer();
					resolve(UI);
				});
		} else {
			openDrawer();
			resolve(UI);
		}
	});
}

function createShareObject(title: string, url: string, text?: string, files?: File[]): ShareData {
	const baseShareObject = {
		title,
		url
	};
	if (!navigator.canShare) {
		return baseShareObject;
	}
	if (files && files.length > 0) {
		const fileShareObject = {
			...baseShareObject,
			text,
			files
		};
		if (navigator.canShare(fileShareObject)) {
			return fileShareObject;
		}
	}
	const textShareObject = {
		...baseShareObject,
		text
	};
	if (navigator.canShare(textShareObject)) {
		return textShareObject;
	}
	return baseShareObject;
}
