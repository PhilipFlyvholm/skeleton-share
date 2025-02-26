<script>
	import '../app.css';
	import DrawerHandler from './DrawerHandler.svelte';
	import Footer from './footer.svelte';

	let { children } = $props();
</script>

<DrawerHandler />
{@render children()}
<Footer />
