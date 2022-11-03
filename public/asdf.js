async function yeet() {
	let a = await fetch("/api/stuff");
	console.log(await a.json());
}
