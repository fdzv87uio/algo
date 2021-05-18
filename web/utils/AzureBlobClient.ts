import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob'

const account = process.env.STORAGE_ACCOUNT_NAME || ''
const accountKey = process.env.STORAGE_ACCOUNT_KEY || ''

export function getBlobClient(path: string): ContainerClient {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  )

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  )
  return blobServiceClient.getContainerClient(path)
}
