export type MediaQuery = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const useMediaQuery = (): MediaQuery =>
    window.matchMedia('(min-width: 1536px)').matches ? '2xl' :
    window.matchMedia('(min-width: 1280px)').matches ? 'xl' :
    window.matchMedia('(min-width: 1024px)').matches ? 'lg' :
    window.matchMedia('(min-width: 768px)').matches ? 'md' : 'sm';
