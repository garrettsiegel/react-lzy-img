// This file injects the LazyImage CSS into the document head at runtime.
const css = `
/* LazyImage component styles */
.LazyImage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.LazyImage-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1rem);
  pointer-events: none;
}

.LazyImage-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b00020;
  background: #fff0f0;
  border: 1px solid #f5c2c7;
  border-radius: 6px;
  font-size: 0.95em;
  min-height: 40px;
  min-width: 40px;
  padding: 8px 12px;
  text-align: center;
  box-sizing: border-box;
}

/* LazyPicture component styles */
.LazyPicture-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.LazyPicture-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1rem);
  pointer-events: none;
}

.LazyPicture-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b00020;
  background: #fff0f0;
  border: 1px solid #f5c2c7;
  border-radius: 6px;
  font-size: 0.95em;
  min-height: 40px;
  min-width: 40px;
  padding: 8px 12px;
  text-align: center;
  box-sizing: border-box;
}

/* Shared utility styles */
.grid-stack {
  display: grid;
  grid-template-areas: 'stack';
  place-items: center;
}

.stack-item {
  grid-area: stack;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('react-lzy-img-style')) {
  const style = document.createElement('style');
  style.id = 'react-lzy-img-style';
  style.textContent = css;
  document.head.appendChild(style);
}
