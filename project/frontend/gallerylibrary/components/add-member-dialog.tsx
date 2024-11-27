import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { z } from "zod"
import { isValidSuiAddress } from "@mysten/sui/utils"
import { addMember } from "@/contracts/gallery"
import { useNetworkVariables } from "@/config"
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"

// 创建验证 schema
const formSchema = z.object({
    memberAddress: z.string().refine((val) => isValidSuiAddress(val), {
        message: "Invalid Sui address",
    }),
})

interface AddMemberDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    libraryId: string
    onSuccess?: () => void
}

export function AddMemberDialog({
    open,
    onOpenChange,
    libraryId,
    onSuccess
}: AddMemberDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const networkVariables = useNetworkVariables()
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const formData = new FormData(e.currentTarget)
            const memberAddress = formData.get('memberAddress') as string

            // 验证地址
            const validationResult = formSchema.safeParse({ memberAddress })

            if (!validationResult.success) {
                setError(validationResult.error.errors[0].message)
                return
            }

            const tx = await addMember(networkVariables, libraryId, memberAddress)
            await signAndExecuteTransaction({ transaction: tx }, {
                onSuccess: () => {                    
                    onSuccess?.()
                }
            })
            onOpenChange(false)
        } catch (error) {
            console.error('Failed to add member:', error)
            setError(error instanceof Error ? error.message : 'Failed to add member')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="memberAddress">Member Address</Label>
                        <Input
                            id="memberAddress"
                            name="memberAddress"
                            placeholder="Enter Sui address (0x...)"
                            required
                            onChange={() => setError(null)} // 清除错误信息当用户开始输入
                        />
                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Member'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 