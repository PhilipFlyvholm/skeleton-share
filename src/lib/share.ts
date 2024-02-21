import type { DrawerStore } from '@skeletonlabs/skeleton';
import { shareDrawerSettings } from './share/ShareDrawerSettings.js';

type Share = {
	title: string;
	url: string;
	text?: string;
	clipboardText?: string;
	files?: File[];
};

export function share(
	data: Share,
	drawerStore: DrawerStore
) {
    const { title, url, text, files } = data;
    const clipboardText = data.clipboardText || text;
	if (navigator.canShare !== undefined && navigator.share) {
		console.log('Sharing');
		const shareObject = createShareObject(title, url, text, files);
		navigator
			.share(shareObject)
			.then(() => {
				console.log('Share was successful.');
			})
			.catch(() => {
				console.log('Sharing via UI');
				drawerStore.open(
					shareDrawerSettings({
						title,
						url,
						text,
						clipboardMessage: clipboardText || text,
						files: files
					})
				);
			});
	} else {
		console.log('Sharing (directly) via UI');

		drawerStore.open(
			shareDrawerSettings({
				title,
				url,
				text: text,
				clipboardMessage: clipboardText,
				files: files
			})
		);
	}
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
