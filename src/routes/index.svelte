<script lang="ts">
	let cells = {}

	const colors = [
		null,
		[0, 0, 0],
		[255, 0, 0],
		[233, 30, 99],
		[156, 39, 176],
		[103, 58, 183],
		[63, 81, 181],
		[33, 150, 243],
		[3, 169, 244],
		[0, 188, 212],
		[0, 150, 136],
		[76, 175, 80],
		[139, 195, 74],
		[205, 220, 57],
		[158, 224, 122],
		[255, 235, 59],
		[255, 193, 7],
		[255, 152, 0],
		[255, 205, 210],
		[255, 87, 34],
		[121, 85, 72],
	];

	let currentColor = [255,0,11];

	function paint(cellId, e: MouseEvent) {
		if((!e || e.buttons == 1 || e.buttons == 3) && cells[cellId] !== currentColor) {
			cells[cellId] = currentColor;
		}
	}

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
<div class="flex flex-col mb-10">
	<div>PICK COLOR</div>
	<div class="flex">
		{#each colors as c}
			<div class="block w-9 h-9" class:bg-slate-500={c} style="{c ? `background: rgb(${c[0]}, ${c[1]}, ${c[2]}` : ''})"
			on:click={() => { currentColor = c}}>
			</div>
		{/each}
	</div>
</div>

<div class="w-full bg-slate-400 pixel-art-container">
{#each Array(20) as _, i}
    {#each Array(20) as _, j}
			{@const cellId = `${i}-${j}`}
			{@const cell = cells[cellId]}
  		<div class="block bg-slate-500"
			style="background: rgb({cell ? `${cell[0]}, ${cell[1]}, ${cell[2]}` : '100,116,139'})"
		 on:click={(e) => { paint(cellId, e) }}
		 on:mouseenter={(e) => { paint(cellId, e); }}
		 on:mouseleave={(e) => { paint(cellId, e); }}
		 ></div>  
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
