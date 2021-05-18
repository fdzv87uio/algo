import { NextApiRequest, NextApiResponse } from 'next'
import { getBlobClient } from '../../../../../../utils/AzureBlobClient'

const STORAGE_ACCOUNT_CONTAINER = process.env.STORAGE_ACCOUNT_CONTAINER || ''
const BLOB_READ_SAS = process.env.BLOB_READ_SAS || ''

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, pose } = req.query

  if (!id) {
    res.status(400)
    return
  }

  if (pose !== 'front' && pose !== 'side') {
    res.status(400)
    return
  }

  if (req.method === 'POST') {
    const response = await saveImageToAzureBlobStorage(
      JSON.parse(req.body).image as string,
      id as string,
      pose
    )
    res.status(200).json(response)
    return
  } else {
    // Handle any other HTTP method
    res.status(400)
    return
  }

  async function saveImageToAzureBlobStorage(
    base64Image: string,
    userId: string,
    pose: string
  ) {
    const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    const type = matches[1]
    const buffer = Buffer.from(matches[2], 'base64')
    const containerPath = STORAGE_ACCOUNT_CONTAINER
    const blobContainerClient = await getBlobClient(containerPath)
    const blockBlobClient = blobContainerClient.getBlockBlobClient(
      `${userId}_${pose}Pose.${type.replace('image/', '')}`
    )
    try {
      const uploadBlobResponse = await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: type,
        },
      })
      return {
        uploadBlobResponse,
        url: `${blockBlobClient.url}?${BLOB_READ_SAS}`,
      }
    } catch (err) {
      return { err, blockBlobClient }
    }
  }
}

export default handler
