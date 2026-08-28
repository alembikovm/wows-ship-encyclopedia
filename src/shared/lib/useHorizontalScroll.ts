// src/shared/lib/useHorizontalScroll.ts
import { ref, computed, onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

export function useHorizontalScroll(
  getElement: () => HTMLElement | null,
  stepSize: MaybeRefOrGetter<number>,
) {
  const scrollLeft = ref(0)
  const scrollWidth = ref(0)
  const clientWidth = ref(0)

  function sync(): void {
    const element = getElement()
    if (!element) return

    scrollLeft.value = element.scrollLeft
    scrollWidth.value = element.scrollWidth
    clientWidth.value = element.clientWidth
  }

  const canScrollBackward = computed(() => scrollLeft.value > 1)
  const canScrollForward = computed(
    () => scrollLeft.value + clientWidth.value < scrollWidth.value - 1,
  )

  function scrollByPage(direction: -1 | 1): void {
    const element = getElement()
    if (!element) return

    const step = toValue(stepSize)
    const stepsPerPage = Math.max(1, Math.floor(element.clientWidth / step) - 1)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    element.scrollBy({
      left: direction * stepsPerPage * step,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    const element = getElement()
    if (!element) return

    element.addEventListener('scroll', sync, { passive: true })
    resizeObserver = new ResizeObserver(sync)
    resizeObserver.observe(element)
    sync()
  })

  onUnmounted(() => {
    getElement()?.removeEventListener('scroll', sync)
    resizeObserver?.disconnect()
  })

  return { canScrollBackward, canScrollForward, scrollByPage }
}
