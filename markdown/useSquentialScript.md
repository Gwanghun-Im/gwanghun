# react에서 script불러오기

```tsx
import { useEffect } from "react"

function useSequentialScripts(scripts, onAllLoaded) {
  useEffect(() => {
    const loadScriptSequentially = async () => {
      for (const src of scripts) {
        if (src) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = src
            script.async = true
            script.onload = resolve
            script.onerror = reject
            document.body.appendChild(script)
          })
        }
      }
      if (onAllLoaded) onAllLoaded()
    }
    loadScriptSequentially()
    return () => {
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`)
        if (script) {
          document.body.removeChild(script)
        }
      })
    }
  }, [scripts, onAllLoaded])
}

export default useSequentialScripts
```
