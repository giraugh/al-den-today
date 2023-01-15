<script>
	import PastaNoodles from './PastaNoodles.svelte';
import Steam from './Steam.svelte';

  export const potIsVisible = true
</script>

<style lang="scss">
  section {
    --table-height: 8em;
    --burner-width: 20em;
    --pot-width: 14em;
    --pot-height: 11em;
    --burner-panel-width: 2.5em;
    display: flex;
    align-items: flex-end;
    min-height: 30em;
  }

  .table {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    background: var(--col-table);
    min-height: var(--table-height);
    border-bottom: 1em solid var(--col-table-shadow);
  }

  .working-spot {
    position: relative;
    height: max-content;
    transform: translate();

    >* { position: absolute; }
  }

  .pot {
    width: var(--pot-width);
    height: var(--pot-height);
    transform: translate(-50%, -95%);

    .inside {
      position: absolute;
    }

    > svg.handle {
      position: absolute;
      left: -80%;
      right: 100%;
      top: 20%;
    }

    > svg.body {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
    }

    > svg.back {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 100%;
      left: 0;
      top: -7%;
    }
  }

  .burner {
    width: var(--burner-width);
    height: calc(.65 * var(--table-height));
    background: var(--col-burner);
    border-bottom: .5em solid var(--col-burner-shadow);
    transform: translate(calc(-50% + calc(var(--burner-panel-width)) / 2), -50%);
  
    display: grid;
    column-gap: .5em;
    grid-template-columns: 1fr var(--burner-panel-width);
    padding: .5em;

    .lpanel {
      display: flex;
      position: relative;
      inset: 0;
      margin-top: .5em;
      margin-left: .5em;
    }

    .rpanel {
      display: grid;
      grid-template-rows: 1fr 5fr;
      gap: .5em;

      .label, .dial {
        background: var(--col-burner-dial);
        box-shadow: 0px 2px 0px 0px var(--col-burner-dial-shadow);
      }
    }
  }

  .ring {
    border: 5px solid var(--col-burner-shadow);
    border-radius: 50%;
    position: absolute;
    inset: .7em 2.5em;
  }

  .hob {
    border-radius: 50%;
    position: absolute;
    inset: .3em .9em;

    .raised-surface {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      transform: translateY(-.5em);
      background: grey;
    }

    /* Put flames in middle */
    .flames {
      position: absolute;
      inset: -.3em;
      display: flex;
      justify-content: space-around;
      align-items: center;
    
      &.back {
        transform: translateY(-.7em);
      }
    }
  }

  .flame {
    background: var(--grad-flame);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    min-height: 1.4em;
    width: 1.2em;
    transform: translateY(calc(calc(var(--y-off) * 1em) - .3em));
    animation: FlameFlicker .7s linear infinite;
    animation-delay: calc(var(--a-off) * -.5s);
    transform-origin: 50% 100%;
    --anim-scale-mag: .8;
  }

  @keyframes FlameFlicker {
    0% { scale: 1 }
    10% { scale: calc(1 + calc(var(--anim-scale-mag) * -0.07)); }
    20% { scale: calc(1 + calc(var(--anim-scale-mag) *  0.05)); }
    40% { scale: calc(1 + calc(var(--anim-scale-mag) * -0.12)); }
    60% { scale: calc(1 + calc(var(--anim-scale-mag) *  0.10)); }
    80% { scale: calc(1 + calc(var(--anim-scale-mag) * -0.20)); }
    100% { scale: 1 }
  }

  .dials {
    display: flex;
    flex-direction: column;
    gap: .4em;
  }

  .dial {
    border-radius: 50%;
    aspect-ratio: 1.9 / 1;
  
    .inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  
    .notch {
      width: 30%;
      height: .15em;
      margin-inline-end: .2em;
      background: var(--col-burner-shadow);
      transform: translate(50% 50%);
    }
  }

  .pasta-noodle {
    width: 10em;
    height: 1em;
    transform: rotate(60deg);
    background: var(--col-pasta);
  }

  /* .bobbing-pasta {
    display: flex;
    gap: .5em;
    padding-inline: 1em;
  }

  .pasta {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background: var(--col-pasta);
    animation: Bob 1s infinite linear;
    animation-delay: calc(var(--a-off) * 1s);
  } */

  /* @keyframes Bob {
    0% { transform: translateY(0%); }
    25% { transform: translateY(-10%); }
    50% { transform: translateY(10%); }
    50% { transform: translateY(-10%); }
    100% { transform: translateY(0%); }
  }  */

  @media (max-width: 400px) {
    section {
      font-size: .8rem;
    }
  }

  @media (min-width: 1000px) {
    section {
      font-size: 1.1rem;
    }
  }
</style>

<section>
  <div class='table'>
    <div class='working-spot'>
    <div class='burner'>
      <div class='lpanel'>
        <div class='ring'>
          <div class='hob'>
            <div class='flames back'>
              {#each [1, 2, 3, 4, 5, 6] as flame, i}
                <div class="flame" style="--y-off: {Math.sin(3.14 + (i / 5) * 3.14)}; --a-off: {Math.random()}" />
              {/each}
            </div>
            <div class='raised-surface' />
            <div class='flames'>
              {#each [1, 2, 3, 4, 5, 6] as flame, i}
                <div class="flame" style="--y-off: {-Math.sin(3.14 + (i / 5) * 3.14)}; --a-off: {Math.random()}" />
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class='rpanel'>
        <div class='label'/>
        <div class='dials'>
          {#each [1, 2] as dial}
            <!-- Can be swivelled? -->
            <div class='dial'>
              <div class='inner'>
                <div class='notch'/>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    {#if potIsVisible}
      <div class='pot'>
        <svg class="handle" viewBox="0 0 616 153" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="78" width="538" height="135" fill="#E7E7E7"/>
          <rect x="78" y="29" width="538" height="106" fill="#D9D9D9"/>
          <path d="M0 0H533V94C533 110.569 519.569 124 503 124H0V0Z" fill="#B3B3B3"/>
          <path d="M0 29H533V123C533 139.569 519.569 153 503 153H30C13.4315 153 0 139.569 0 123V29Z" fill="#9D9D9D"/>
        </svg>
        <svg class="back" viewBox="0 0 694 483" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 31L98.4226 17.669C263.388 -4.675 430.612 -4.67499 595.577 17.669L694 31V453C694 469.569 680.569 483 664 483H30C13.4315 483 0 469.569 0 453V31Z" fill="#9E9E9E"/>
          <path d="M0 48.2104L107.726 34.1748C266.571 13.4791 427.429 13.4791 586.274 34.1748L694 48.2104V453C694 469.569 680.569 483 664 483H30C13.4315 483 0 469.569 0 453V48.2104Z" fill="#B4C9CA"/>
        </svg>
        <div class="inside">
          <Steam />
          <PastaNoodles />
        </div>
        <svg class="body" viewBox="0 0 694 492" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0V0C230.748 23.2743 463.252 23.2743 694 0V0V451.594C694 451.83 693.834 452.035 693.602 452.084L665.934 457.939C446.291 504.42 219.151 502.421 0.359211 452.083V452.083C0.148985 452.034 0 451.847 0 451.631V0Z" fill="url(#paint0_linear_7_207)"/>
          <defs>
          <linearGradient id="paint0_linear_7_207" x1="-3.79666e-07" y1="262" x2="694" y2="253.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#C2C2C2"/>
          <stop offset="0.66682" stop-color="#F7F7F7"/>
          <stop offset="1" stop-color="#B5B5B5"/>
          </linearGradient>
          </defs>
        </svg>
      </div>
    {/if}
  </div>
</section>

