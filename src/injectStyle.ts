// This file injects the LazyImage CSS into the document head at runtime.
const css = `
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
