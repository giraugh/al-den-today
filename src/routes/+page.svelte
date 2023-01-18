<script lang="ts">
  import dayjs from 'dayjs'

  import type { PageData } from './$types'
  import TitleSection from '$components/TitleSection.svelte'
	import PotSection from '$components/PotSection.svelte'
	import SpoonCursor from '$components/SpoonCursor.svelte'
	import RecipeSection from '$components/RecipeSection.svelte';
	import FooterSection from '$components/FooterSection.svelte';

  // Get server data
  export let data: PageData
  let { holidayName, date } = data

  // Create reactive meta info
  $: title = `${holidayName}`
  $: description = `${dayjs(date).format('DD MMMM YYYY')} is ${holidayName}`
</script>

<style lang="scss">
  main {
    margin: 0;
    padding: 0;
  }
</style>

<main>
  <SpoonCursor />
  <TitleSection {date} {holidayName} />
  <PotSection />
  <RecipeSection {date} />
  <FooterSection />
</main>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:url" content="https://pasta.ewanb.me" />
  <meta property="og:type" content="website" />
  <meta name="description" content="{description}">
  <meta name="keywords" content="pasta, pastafarian, fsm, holiday">
  <meta name="author" content="Ewan Breakey">
</svelte:head>
