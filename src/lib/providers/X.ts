import type { ShareProvider } from './index.js';
import XImage from '$lib/assets/x.webp';

const XProvider: ShareProvider = {
	name: 'X',
	icon: 'tabler:brand-x',
	image: XImage,
	getShareUrl: (shareData) => {
		const text = encodeURIComponent(shareData.text || shareData.title);
		const url = new URL(shareData.url);
		const urlEncoded = encodeURIComponent(url.toString());
		const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${urlEncoded}`;
		return shareUrl;
	}
};

export default XProvider;
