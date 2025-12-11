// src/stores/lazy.ts
import type { Directive } from 'vue'

export const vLazy: Directive = {
    // el 就是 dom 元素，binding.value 就是真正的地址
    mounted(el, binding) {
        // 1. 先把真实地址藏起来，不然浏览器会立刻去下载
        el.dataset.src = binding.value

        // 2. 请一个“店员”来盯梢
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]            // 先拿第一个
                if (entry?.isIntersecting) {        // ✅ 可选链，防止 undefined
                    el.src = el.dataset.src!
                    el.removeAttribute('data-src')
                    observer.unobserve(el)
                }
            },
            { rootMargin: '50px' }
        )

        // 3. 让这个店员专门盯当前元素
        observer.observe(el)

        // 4. 元素销毁时也让店员下班，防止内存泄漏
        el._observer = observer
    },

    unmounted(el) {
        el._observer?.disconnect()
    }
}