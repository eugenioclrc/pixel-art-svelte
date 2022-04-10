<script context="module">
  export const prerender = true;
</script>
<script lang="ts">
	let cells = {}

	function paint(cellId) {
		console.log(cellId);
		cells[cellId] = [255,0,11];
		cells = {...cells};
	}

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
<div class="w-full bg-slate-400 pixel-art-container">
{#each Array(20) as _, i}
    {#each Array(20) as _, j}
			{@const cellId = `${i}-${j}`}
			{@const cell = cells[cellId]}
  		<div class="block bg-slate-500"
			style="background: rgb({cell ? `${cell[0]}, ${cell[1]}, ${cell[2]}` : '100,116,139'})"
		 on:click={() => { paint(cellId) }}></div>  
		{/each}
{/each}
	
</div>

</section>

<style>
	.pixel-art-container {
		width: 400px;
		height: 400px;
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		grid-template-rows: repeat(20, 1fr);
		grid-column-gap:1px;
		grid-row-gap: 1px;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
