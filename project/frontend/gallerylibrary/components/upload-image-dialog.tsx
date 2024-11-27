import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadBlob } from "@/hooks/useUploadBlob"
import { useState } from "react"
import { addBlob } from "@/contracts/gallery"
import { useNetworkVariables } from "@/config"
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"

interface UploadImageDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    libraryId: string
    onSuccess?: () => void
}

export function UploadImageDialog({
    open,
    onOpenChange,
    libraryId,
    onSuccess
}: UploadImageDialogProps) {
    const [isUploading, setIsUploading] = useState(false)
    const { storeBlob } = useUploadBlob()
    const networkVariables = useNetworkVariables()
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();


    const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            const formData = new FormData(e.currentTarget)
            const file = formData.get('image') as File

            // 1. 上传到 Walrus
            const blobInfo = await storeBlob(file)
            
            console.log(blobInfo)

            // 2. 调用合约添加 blob
            const tx = await addBlob(
                networkVariables,
                libraryId,
                blobInfo.blobId
            )
            await signAndExecuteTransaction({ transaction: tx }, {
                onSuccess: () => {
                    onSuccess?.()
                }
            })

            onOpenChange(false)

        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleImageUpload} className="space-y-4">
                    <div>
                        <Label htmlFor="image">Select Image</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 