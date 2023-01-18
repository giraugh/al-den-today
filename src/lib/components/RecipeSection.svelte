<script lang="ts">
  import dayjs from 'dayjs'
  import { TwitterIcon, Mail, FacebookIcon, LinkedinIcon, Share2 } from 'lucide-svelte'

  import { PASTA_LIST, OTHER_LIST, METHOD_LIST } from '$lib/data/recipes'
	import { onMount } from 'svelte';

  export let date: Date

  // Get a unique recipe from the day
  const day = date.getDay()
  const pasta = PASTA_LIST[day % PASTA_LIST.length]
  const other = OTHER_LIST[day % OTHER_LIST.length]
  const method = METHOD_LIST[day % METHOD_LIST.length]

  // Setup share resources
  const url = 'https://pasta.ewanb.me'
  const shareText = `-- Pasta recipe idea for ${dayjs(date).format('DD MMMM YYYY')} --\nFirst take a little ${pasta.toLocaleLowerCase()}, add some ${other.toLocaleLowerCase()} and then ${method.toLocaleLowerCase()}.\n\nFind future recipes at ${url}`
  const shareData = {
    title: `Pasta Recipe for ${dayjs(date).format('DD MMMM YYYY')}`,
    text: shareText,
    url,
  }


  // Determiner whether sharing w/ web share api is possible
  let canShare = false
  onMount(() => { canShare = !!navigator?.share })

  // Setup sharing
  const onShare = async () => {
    navigator.share(shareData)
      .catch(console.warn)
  }
</script>

<style lang="scss">
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 10em;
  }

  .content {
    background: var(--col-surface);
    color: var(--col-text-dark);
    min-height: 20em;
    width: min(60%, 30em);
    padding: 2em;

    h2, h3 {
      text-align: center;
    }
    
    h2:first-of-type {
      margin-block-start: 0;
    }
  }

  .recipe-grid {
    display: grid;
    padding-block: .5em;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "pasta pasta"
                         "other method";

    > div {
      /* border: 4px solid black; */
      min-height: 5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        font-size: 1em;
        opacity: .75;
        text-align: center;
      }

      strong {
        font-size: 1.3em;
        text-align: center;
      }

      @media (max-width: 500px) {
        strong {
          font-size: 1.1em;
        }
      }
    }

    .pasta-ingredient {
      grid-area: pasta;
      background: var(--col-pasta);
      color: var(--col-pasta-text);
    }

    .other-ingredient {
      grid-area: other;
      background: var(--col-table);
      color: var(--col-table-text);
    }

    .cooking-method {
      grid-area: method;
      background: var(--col-method);
      color: var(--col-method-text);
    }
  }

  .share {
    margin-block-start: 2em;

    .icon-list {
      display: flex;
      justify-content: center;
      gap: .7em;
    
      a, button {
        color: inherit;
        background: none;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        cursor: pointer;

        &:hover, &:active, &:focus {
          opacity: .4;
        }
      }
    }
  }
</style>

<section>
  <div class='content'>
    <h2>&dash; Today's Recipe Idea &dash;</h2>
    <div class='recipe-grid'>
      <div class='pasta-ingredient'>
        <span>Take a little</span>
        <strong>{pasta}</strong>
      </div>
      <div class='other-ingredient'>
        <span>add some</span>
        <strong>{other}</strong>
      </div>
      <div class='cooking-method'>
        <span>and then</span>
        <strong>{method}</strong>
      </div>
    </div>
    <div class='share'>
      <h3>Share with your friends</h3>
      <div class='icon-list'>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text={encodeURIComponent(shareText)}"><TwitterIcon /></a>
        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(url)}"><FacebookIcon /></a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/shareArticle?url={encodeURIComponent(url)}"><LinkedinIcon /></a>
        <a target="_blank" rel="noreferrer" href="mailto:?subject={shareText}"><Mail /></a>
        {#if canShare }<button on:click={onShare}><Share2 /></button>{/if}
      </div>
    </div>
  </div>
</section>
