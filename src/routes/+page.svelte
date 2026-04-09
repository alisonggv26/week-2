<script lang="ts">
  import { onMount } from 'svelte';

  let toastMessage = $state('');
  let toastVisible = $state(false);
  let toastTimer: ReturnType<typeof setTimeout>;
  let cardEl: HTMLElement;
  let featureEls: HTMLElement[] = [];

  const messages = [
    'Ready when you are!',
    'The journey begins here.',
    'Something great is coming.',
    "Let's build something amazing.",
  ];

  function showToast(msg: string) {
    toastMessage = msg;
    toastVisible = true;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastVisible = false), 3000);
  }

  function onCardMouseMove(e: MouseEvent) {
    const rect = cardEl.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    cardEl.style.transform = `perspective(800px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  }

  function onCardMouseLeave() {
    cardEl.style.transition = 'transform 0.5s ease';
    cardEl.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    setTimeout(() => (cardEl.style.transition = ''), 500);
  }

  const features = [
    { icon: '⚡', title: 'Fast', desc: 'SvelteKit + Vite. Instant HMR, tiny bundles.' },
    { icon: '✨', title: 'Modern', desc: 'Clean design with smooth animations.' },
    { icon: '🌐', title: 'Responsive', desc: 'Looks great on every screen size.' },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );

    featureEls.forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Hello World</title>
</svelte:head>

<!-- Background blobs -->
<div class="bg-blobs" aria-hidden="true">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
</div>

<main class="container">
  <!-- Hero card -->
  <div
    class="card"
    bind:this={cardEl}
    onmousemove={onCardMouseMove}
    onmouseleave={onCardMouseLeave}
  >
    <span class="badge">Welcome</span>
    <h1 class="headline">
      Hello, <span class="gradient-text">World</span>
    </h1>
    <p class="subtext">A clean, modern starting point for your next big idea.</p>
    <div class="actions">
      <button
        class="btn btn-primary"
        onclick={() => showToast(messages[Math.floor(Math.random() * messages.length)])}
      >
        Get Started
      </button>
      <button
        class="btn btn-ghost"
        onclick={() => showToast('You already know everything you need. Go build!')}
      >
        Learn More
      </button>
    </div>
    <p class="toast" class:show={toastVisible}>{toastMessage}</p>
  </div>

  <!-- Feature cards -->
  <div class="features">
    {#each features as feature, i}
      <div
        class="feature-card"
        bind:this={featureEls[i]}
        style="animation-delay: {0.15 + i * 0.1}s"
      >
        <div class="feature-icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    {/each}
  </div>
</main>

<footer>
  <p>Built with <span class="heart">♥</span> and SvelteKit.</p>
</footer>

<style>
  /* --- Background blobs --- */
  .bg-blobs {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.35;
    animation: drift 12s ease-in-out infinite alternate;
  }

  .blob-1 {
    width: 600px;
    height: 600px;
    background: #7c3aed;
    top: -200px;
    left: -150px;
    animation-duration: 14s;
  }

  .blob-2 {
    width: 500px;
    height: 500px;
    background: #ec4899;
    bottom: -100px;
    right: -100px;
    animation-duration: 10s;
    animation-delay: -4s;
  }

  .blob-3 {
    width: 400px;
    height: 400px;
    background: #3b82f6;
    top: 40%;
    left: 55%;
    animation-duration: 16s;
    animation-delay: -8s;
  }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.08); }
  }

  /* --- Layout --- */
  .container {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 4rem 1.5rem 2rem;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
  }

  /* --- Main card --- */
  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 1.25rem;
    padding: 3.5rem 3rem;
    text-align: center;
    width: 100%;
    max-width: 620px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
    animation: fadeUp 0.7s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .badge {
    display: inline-block;
    background: linear-gradient(135deg, #7c3aed, #ec4899);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    margin-bottom: 1.5rem;
  }

  .headline {
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .gradient-text {
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtext {
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 440px;
    margin: 0 auto 2.25rem;
  }

  /* --- Buttons --- */
  .actions {
    display: flex;
    gap: 0.875rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.75rem;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    outline-offset: 3px;
  }

  .btn:active {
    transform: scale(0.96);
  }

  .btn-primary {
    background: linear-gradient(135deg, #7c3aed, #ec4899);
    color: #fff;
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.45);
  }

  .btn-primary:hover {
    box-shadow: 0 6px 28px rgba(124, 58, 237, 0.65);
    transform: translateY(-2px);
  }

  .btn-ghost {
    background: transparent;
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-ghost:hover {
    border-color: rgba(255, 255, 255, 0.25);
    color: #e2e8f0;
    transform: translateY(-2px);
  }

  /* --- Toast --- */
  .toast {
    margin-top: 1.25rem;
    font-size: 0.875rem;
    color: #a78bfa;
    min-height: 1.25rem;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  .toast.show {
    opacity: 1;
  }

  /* --- Feature cards --- */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    width: 100%;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 1.25rem;
    padding: 2rem 1.5rem;
    text-align: center;
    transition: transform 0.2s ease, border-color 0.2s ease, opacity 0.5s ease;
    animation: fadeUp 0.7s ease both;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(167, 139, 250, 0.35);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.875rem;
  }

  .feature-card h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .feature-card p {
    font-size: 0.875rem;
    color: #94a3b8;
    line-height: 1.6;
  }

  /* --- Footer --- */
  footer {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 1.5rem;
    font-size: 0.85rem;
    color: #94a3b8;
  }

  .heart {
    color: #ec4899;
  }

  /* --- Responsive --- */
  @media (max-width: 500px) {
    .card {
      padding: 2.5rem 1.5rem;
    }
  }
</style>
