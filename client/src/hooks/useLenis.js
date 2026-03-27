/**
 * useLenis — lightweight hook to access the Lenis instance.
 *
 * NOTE: Lenis is initialised + driven by the GSAP ticker inside
 * <SmoothScroll>. This hook is kept purely for convenience — useful
 * if a sub-component needs to call lenis.scrollTo() or listen to events
 * WITHOUT going through context.
 *
 * For tree-wide access prefer: useLenisContext() from LenisContext.jsx
 */
export { useLenisContext as useLenis } from '../context/LenisContext';
