// 定义数据库名称和版本
const DB_NAME = 'FileStorage'
const DB_VERSION = 1
const STORE_NAME = 'files'

// 打开数据库
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      // 使用 uuid 作为 key
      db.createObjectStore(STORE_NAME, { keyPath: 'uuid' })
    }
  })
}

// 存储文件
export async function storeFile(db: IDBDatabase, file: File, uuid: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const fileData = {
      uuid,
      name: file.name,
      data: file,
      lastModified: new Date(),
    }
    const request = store.add(fileData)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

// 获取文件
export async function getFile(fileName: string): Promise<File | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(fileName)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result ? request.result.data : null)
  })
}

// 删除文件
export async function deleteFile(fileName: string): Promise<void> {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(fileName)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

// 通过uuid批量删除文件
export async function deleteFilesByUUID(uuid: string[] | string): Promise<void> {
  const db = await openDB()
  return new Promise<void>((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    if (Array.isArray(uuid)) {
      uuid.forEach(uuid => store.delete(uuid))
    }
    else {
      store.delete(uuid)
    }
    resolve()
  })
}

// 获取所有文件
export async function getAllFiles(): Promise<{ uuid: string, name: string, data: File, lastModified: Date }[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const files = request.result.map((entry: any) => ({
        uuid: entry.uuid,
        name: entry.name,
        data: entry.data,
        lastModified: entry.lastModified,
      }))
      resolve(files)
    }
  })
}
