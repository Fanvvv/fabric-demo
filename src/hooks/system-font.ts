import { onMounted, ref } from 'vue'

export function useSystemFont() {
  const systemFont = ref<Array<string>>([])

  onMounted(async () => {
    systemFont.value = await getSystemFont()
  })

  function getSystemFont(): Promise<Array<string>> {
    return new Promise((res, rej) => {
      const fontCheck = [
        'Arial',
        'Calibri',
        'Cambria',
        'Comic Sans MS',
        'Consolas',
        'Constantia',
        'Corbel',
        'Courier New',
        'Georgia',
        'Palatino Linotype',
        'Segoe UI',
        'STIXGeneral',
        'Times New Roman',
        'Trebuchet MS',
        'Verdanna',
      ]

      try {
        document.fonts?.ready.then(() => {
          const fontAvailable = new Set<string>()
          for (const font of fontCheck.values()) {
            if (document.fonts?.check(`12px ${font}`)) {
              fontAvailable.add(font)
            }
          }
          res(Array.from(fontAvailable.values()))
        })
      }
      catch (error) {
        rej(error)
      }
    })
  }

  return {
    systemFont,
    getSystemFont,
  }
}
