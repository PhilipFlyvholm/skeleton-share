import { type Drawer, type DrawerStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { isShareDrawer as isShareDrawerBase } from '$lib/share/ShareDrawerSettings.js';
const extraOffsetPercentage = 0.5;

let drawerStore: DrawerStore | undefined = undefined;
let initial = { x: 0, y: 0, height: 0 };
let drawer: HTMLElement | null = null;
let prev = 0;
let momentum = 0;

let onClose = $state<(() => void) | undefined>(undefined);

const isTouchEvent = (e: Event): e is TouchEvent => window.TouchEvent && e instanceof TouchEvent;
const isShareDrawer = () => isShareDrawerBase(drawerStore);

function setTranslate(drawer: HTMLElement, y: number) {
	drawer.style.transform = `translateY(${y}px)`;
}

function handleMouseDown(e: CustomEvent<MouseEvent> | TouchEvent) {
	if (!isShareDrawer()) return;
	if (e.detail instanceof MouseEvent && e.detail.button !== 0) return;

	if (!drawerStore || !get(drawerStore).open) return;
	const drawerContent = document.querySelector('.drawer-content');
	if (
		drawerContent &&
		drawerContent.contains(e.target as HTMLElement) &&
		e.target !== drawerContent
	)
		return;
	drawer = document.querySelector('.drawer');
	if (!drawer) return;
	const isTouch = isTouchEvent(e);
	if (!isTouch) e.preventDefault();
	const clientX = isTouch ? e.touches[0].clientX : e.detail.clientX;
	const clientY = isTouch ? e.touches[0].clientY : e.detail.clientY;
	initial = {
		x: clientX,
		y: clientY,
		height: drawer.getBoundingClientRect().height
	};
	drawer.style.overflow = 'unset';
	drawer.style.transition = 'transform .3s ease';
	setTranslate(drawer, 0);
}

function handleMouseMove(e: MouseEvent | TouchEvent) {
	if (!isShareDrawer()) return;
	if (!drawer) return;

	if (!drawerStore || !get(drawerStore).open) return;
	const clientY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;
	let diff = initial.y - clientY;
	if (initial.y - clientY < 0) {
		setTranslate(drawer, clientY - initial.y);
	} else {
		if (initial.y > window.innerHeight) window.innerHeight = initial.y;
		if (initial.y < 0) initial.y = 0;
		if (diff > initial.height * extraOffsetPercentage) {
			diff = initial.height * extraOffsetPercentage;
		}
		setTranslate(drawer, -diff);
	}
	momentum = diff - prev;
	prev = diff;
}

function reset(transform: boolean) {
	if (!drawer) return;
	if (transform) setTranslate(drawer, 0);
	drawer = null;
	initial = { x: 0, y: 0, height: 0 };
}

function handleMouseUp(e: MouseEvent | TouchEvent) {
	if (!isShareDrawer()) return;
	if (e instanceof MouseEvent && e.button !== 0) return;

	if (!drawer) return;
	const target = e.target as HTMLElement;
	if (target && target.classList !== undefined && target.classList.contains('drawer-backdrop')) {
		reset(true);
		return;
	}
	e.preventDefault();

	const clientY = isTouchEvent(e) ? e.changedTouches[0].clientY : e.clientY;
	const diff = initial.y - clientY;

	if (
		initial.height + diff < initial.height / 2 &&
		(momentum < 0 || (initial.height + diff) * 0.1 < initial.height / 2)
	) {
		drawerStore && drawerStore.close();
		onClose?.();
		reset(false);
	} else {
		reset(true);
	}
}

function handleBackdrop(e: CustomEvent<MouseEvent>) {
	if (!isShareDrawer()) return;
	if (!drawer) return;

	e.preventDefault();
	setTimeout(() => {
		if (!drawer && drawerStore) drawerStore.close();
		console.log('backdrop');
		
		onClose?.();
	}, 2);
}

function handleSelect(e: Event) {
	if (!drawer) return;
	e.preventDefault();
}
export function initDrawer(
	drawerComponent: Drawer | undefined,
	drawerStoreInstance: DrawerStore,
	onCloseCallback: typeof onClose
) {
	if (!drawerComponent) return;
	onClose = onCloseCallback;
	drawerStore = drawerStoreInstance;
	drawerComponent.$on('drawer', handleMouseDown);
	drawerComponent.$on('touchstart', handleMouseDown);
	drawerComponent.$on('backdrop', handleBackdrop);
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('touchmove', handleMouseMove);
	window.addEventListener('mouseup', handleMouseUp);
	window.addEventListener('touchend', handleMouseUp);
	window.addEventListener('selectstart', handleSelect);
}

export function destroyDrawer(drawerComponent: Drawer | undefined) {
	if (!drawerComponent) return;
	window.removeEventListener('mousemove', handleMouseMove);
	window.removeEventListener('touchmove', handleMouseMove);
	window.removeEventListener('mouseup', handleMouseUp);
	window.removeEventListener('touchend', handleMouseUp);
	window.removeEventListener('selectstart', handleSelect);

	drawerStore = undefined;
	initial = { x: 0, y: 0, height: 0 };
	drawer = null;
	prev = 0;
	momentum = 0;
}
