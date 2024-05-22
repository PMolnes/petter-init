<!-- 
	THIS FILE DOES NOT CONTAIN ANYTHING INPORTANT FOR THE CONFIGURATION OF THE LIBRARIES. 
	IT JUST SERVES AS A DEMO/FRONT PAGE FOR THE TEMPLATE.
-->
<script lang="ts">
	import { setMode } from "mode-watcher";
	import { toast } from "svelte-sonner";
	import {
		Paintbrush,
		CreditCard,
		Sun,
		Moon,
		Bell,
		TextCursorInput,
		SquareCheck,
		Zap,
		Sparkle,
		Github
	} from "lucide-svelte";

	const LIBRARIES = [
		{
			name: "Tailwind",
			link: "https://tailwindcss.com/",
			description: "A utility-first CSS framework.",
			svg: Paintbrush
		},
		{
			name: "Shadcn",
			link: "https://www.shadcn-svelte.com/",
			description: "UI components library.",
			svg: CreditCard
		},
		{
			name: "Mode Watcher",
			link: "https://github.com/svecosystem/mode-watcher",
			description: "Simple utilities to manage light & dark mode in your SvelteKit app.",
			svg: Sun
		},
		{
			name: "Sonner",
			link: "https://svelte-sonner.vercel.app/",
			description: "An opinionated toast component for Svelte.",
			svg: Bell
		},
		{
			name: "Superforms",
			link: "https://superforms.rocks/",
			description: "Server and client form validation.",
			svg: TextCursorInput
		},
		{
			name: "Zod",
			link: "https://zod.dev/",
			description: "TypeScript-first schema validation with static type inference.",
			svg: SquareCheck
		},
		{
			name: "Flash message",
			link: "https://github.com/ciscoheat/sveltekit-flash-message",
			description: "Flash messages to client after redirect.",
			svg: Zap
		},
		{
			name: "Lucide svelte",
			link: "https://lucide.dev/",
			description: "Beatiful & consistent icons.",
			svg: Sparkle
		}
	] as const;
</script>

<!-- Theme toggler -->
<div class="flex rounded border absolute top-4 right-4">
	<button on:click={() => setMode("light")} class=" px-4 py-3 border-r"
		><Sun class="w-4 h-4" /></button
	>
	<button on:click={() => setMode("dark")} class="px-4 py-4"><Moon class="w-4 h-4" /></button>
</div>

<main class="flex flex-col relative h-screen max-w-[1000px] mx-auto pt-16 pb-4 overflow-hidden">
	<svg
		class="absolute h-screen left-1/2 top-2/3 -translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"
		viewBox="0 0 1000 1000"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient id="b" gradientTransform="rotate(-45 .5 .5)">
				<stop offset="0%" stop-color="#FFE53B" /><stop offset="100%" stop-color="#FF2525" />
			</linearGradient>
			<clipPath id="a">
				<path
					fill="currentColor"
					d="M779.5 659.5Q684 819 510.5 800t-307-159.5Q70 500 188 332t329.5-198.5Q729 103 802 301.5t-22.5 358Z"
				/>
			</clipPath>
		</defs>
		<g clip-path="url(#a)">
			<path
				fill="url(#b)"
				d="M779.5 659.5Q684 819 510.5 800t-307-159.5Q70 500 188 332t329.5-198.5Q729 103 802 301.5t-22.5 358Z"
			/>
		</g>
	</svg>
	<h1 class="text-5xl font-bold">DevKit</h1>
	<p class="mb-8 text-sm text-muted-foreground">
		A SvelteKit template for enhancing web development with advanced features and tools.
	</p>
	<div class="flex gap-2 mb-8">
		<button
			class="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded"
			on:click={() => toast.info("This is a toast")}
		>
			<Bell class="w-4 h-4 mr-2" />Show toast
		</button>
		<a
			href="https://github.com/PMolnes/petter-init"
			target="_blank"
			class="flex items-center rounded bg-background px-4 py-2 border"
		>
			<Github class="w-4 h-4 mr-2" />GitHub
		</a>
	</div>
	<div class="flex-grow grid grid-cols-3 place-content-start gap-4">
		{#each LIBRARIES as lib}
			<a
				href={lib.link}
				target="_blank"
				class="flex items-center gap-4 border rounded p-4 bg-background/70 backdrop-blur-lg backdrop-filter"
			>
				<svelte:component this={lib.svg} />
				<div>
					<h2>{lib.name}</h2>
					<p class="text-xs text-muted-foreground">{lib.description}</p>
				</div>
			</a>
		{/each}
	</div>
	<p class="text-sm text-muted-foreground">
		CLI made by <a href="https://molnes.dev/" target="_blank" class="underline">Petter Molnes</a>.
		Template by
		<a href="https://edvardsen.dev/" target="_blank" class="underline">Joakim Edvardsen</a>
	</p>
</main>
