import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';

export type ShareDrawerData = {
	title: string;
	url: string;
	clipboardMessage?: string;
	text?: string;
	files?: File[];
};

export const shareId = 'share-drawer';

export function shareDrawerSettings(data: ShareDrawerData, drawerSettings?: Omit<DrawerSettings, "id" | "position">): DrawerSettings {
	return {
		...drawerSettings,
		id: shareId,
		position: 'bottom',
		bgDrawer: drawerSettings?.bgDrawer || 'bg-[#F2F2F2] text-[#383838]',
		width: drawerSettings?.width || 'w-full lg:w-auto lg:max-w-[680px] mx-auto',
		height: drawerSettings?.rounded || 'h-auto',
		rounded: drawerSettings?.rounded || 'rounded-t-xl',
		meta: {...drawerSettings, ...data}
	};
}

export function isShareDrawer(drawerStore: DrawerStore | undefined): boolean {
	return drawerStore !== undefined && get(drawerStore).id === shareId;
}