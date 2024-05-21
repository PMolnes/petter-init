<script lang="ts">
	import { page } from "$app/stores";
	import { Toaster } from "$lib/components/ui/sonner";
	import { getFlash } from "sveltekit-flash-message";
	import "../app.pcss";
	import { ModeWatcher } from "mode-watcher";
	import { toast } from "svelte-sonner";

	const flash = getFlash(page);

	// Show toast when a flash message is sent
	$: if ($flash) {
		switch ($flash.type) {
			case "success":
				toast.success($flash.message);
				break;
			case "error":
				toast.error($flash.message);
				break;
			case "info":
				toast($flash.message);
				break;
		}

		$flash = undefined;
	}
</script>

<!-- 
  Dark/light/system preference theme 
  For more details on how to use this theme library visit: https://github.com/svecosystem/mode-watcher
-->
<ModeWatcher />
<!-- For toast options visit: https://svelte-sonner.vercel.app/ -->
<Toaster />

<slot />
