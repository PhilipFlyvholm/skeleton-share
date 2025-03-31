import type { ShareProvider } from './index.js';
import FacebookImage from '$lib/assets/facebook.webp';

const FacebookProvider: ShareProvider = {
	name: 'Facebook',
	icon: 'tabler:brand-facebook',
	image: FacebookImage,
	getShareUrl: (shareData) => {
		const text = shareData.text || shareData.title;
		const url = new URL(shareData.url);
		url.searchParams.append('title', text);
		const urlEncoded = encodeURIComponent(url.toString());
		const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + urlEncoded;
		return shareUrl;
	}
};

export default FacebookProvider;
