<script lang="ts">
	import { onMount } from 'svelte';

  const TAU = Math.PI * 2

  export let color: string = "white"
  export let radius: number = 2
  export let spawnChance: number = .28
  export let maxPopulation: number = 300
  export let restDelay: number = 20
  export let mouseInfluence: number = 7000

  let sourceElement: HTMLElement
  let canvas: HTMLCanvasElement
  let canvasWidth: number
  let canvasHeight: number
  $: {
    // Update canvas size to canvas element size
    if (canvas) {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }
  }

  type Particle = {
    x: number,
    y: number,
    ySpeed: number,
    age: number,
  }

  // Initialise state
  let time: number = 0
  let particles: Particle[] = []
  let lastMousePos: [number, number]

  const createParticle = () => {
    if (!canvas || !sourceElement) return

    // Choose random point in bounding box
    const boundingBox = sourceElement.getBoundingClientRect()
    const bx = boundingBox.left + Math.random() * boundingBox.width
    const by = boundingBox.top + Math.random() * boundingBox.height

    // Translate points to canvas space
    const canvasBoundingBox = canvas.getBoundingClientRect()
    const [x, y] = [bx - canvasBoundingBox.left, by - canvasBoundingBox.top]

    particles.push({
      x,
      y,
      ySpeed: Math.random(),
      age: 0,
    })
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Update fill style
    ctx.fillStyle = color

    // Spawn particles
    if (particles.length < maxPopulation && Math.random() < spawnChance)
      createParticle()

    // Update each particle (including culling)
    for (let i = particles.length-1; i >= 0; i--) {
      let particle = particles[i]
      
      // Age
      particle.age += 1
      
      // Move upwards
      particle.y -= Math.random()*.05 + ((Math.sin(time / 10) + 1)/2 * .1)
      if (particle.age > restDelay)
        particle.y -= particle.ySpeed * .5

      // Wind
      particle.x += Math.random()*0.03
      particle.x += ((Math.sin(time / 25)+1)/2) * .1
      
      // If off screen, remove it
      if (particle.y < 0) particles.splice(i, 1)
    }

    // Draw each particle
    for (let p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, TAU)
      ctx.fill()
    }

    // Keep drawing...
    requestAnimationFrame(() => draw(ctx))
  }

  onMount(() => {
    // Get context
    let ctx = canvas.getContext('2d')!
    
    // Start draw loop
    draw(ctx)

    // Setup mouse interactivity handler
    window.addEventListener('mousemove', e => {
      if (!canvas) return
      let canvasBoundingBox = canvas.getBoundingClientRect()
      let [x, y] = [e.clientX - canvasBoundingBox.left, e.clientY - canvasBoundingBox.top]
      
      // first, lets try just moving away
      for (let p of particles) {
        let dsq = Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)
        if (dsq < mouseInfluence) {
          let [dx, dy] = [p.x - x, p.y - y]
          let amt = .05 * (1 - (dsq / mouseInfluence))
          p.x += dx * amt
          p.y += dy * amt
        }
      }
      
      lastMousePos = [ x, y ]
    })
  })

</script>

<style>
  .source {
    width: 12em;
  }

  canvas {
    position: absolute;
    inset: 0;
    width: calc(60vw + 7em);
    height: 100vh;
    transform: translate(calc(-50% + 7em), -60%);
    filter: blur(1.25em);
  }
</style>

<div bind:this={sourceElement} class="source">
  <canvas bind:this={canvas} bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} />
</div>
