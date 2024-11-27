'use client'
import { ConnectButton } from '@mysten/dapp-kit'
import Image from 'next/image'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useCallback, useEffect, useState } from 'react'
import { getSubdomainAndPath, subdomainToObjectId } from '@/utils/blob'
import { gallery } from '@/contracts'
import { Library } from '@/contracts/gallery'
import { Button } from '@/components/ui/button'
import { UploadImageDialog } from "@/components/upload-image-dialog"
import { AddMemberDialog } from "@/components/add-member-dialog"

export default function Home() {
  const account = useCurrentAccount();
  const [library, setLibrary] = useState<Library | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)

  const fetchDomainData = useCallback(async () => {
    try{
      const url = window.location.origin;
      const parsedUrl = getSubdomainAndPath(url);
      // const parsedUrl = getSubdomainAndPath('https://5jtlzki1vtu7eb1me3ga29fo2dtmqs5chhsq7q8zetg4kv1hyf.walrus.site/');
      if(!parsedUrl) return;
      const objectId =  subdomainToObjectId(parsedUrl.subdomain);
      if(!objectId){
        return;
      }else{
        if(account){
          const libraryData = await gallery.getLibrary(objectId);
          if(libraryData.member.includes(account.address)){
            setLibrary(libraryData);
          }
        }
      }
    } catch(e){
      console.log(e);
    }
  }, [account]);

  useEffect(() => {
    fetchDomainData();
  }, [fetchDomainData,account]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center rounded-full overflow-hidden gap-x-4">
          <p className='text-2xl font-bold'>{library?.name}</p>
          <p className='text-sm text-gray-500 truncate max-w-xs'>{library?.owner}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          {library && account && account.address === library.owner && (
            <>
              <div className='flex items-center gap-x-2'>
                <Button onClick={() => setIsAddMemberDialogOpen(true)}>Add Member</Button>
                <Button onClick={() => setIsUploadDialogOpen(true)}>Add Image</Button>
              </div>
              <AddMemberDialog
                open={isAddMemberDialogOpen}
                onOpenChange={setIsAddMemberDialogOpen}
                libraryId={library.id.id}
                onSuccess={fetchDomainData}
              />
              <UploadImageDialog
                open={isUploadDialogOpen}
                onOpenChange={setIsUploadDialogOpen}
                libraryId={library.id.id}
                onSuccess={fetchDomainData}
              />
            </>
          )}
          <ConnectButton />
        </div>
      </header>
      <div className='flex gap-4 p-4'>
          {library?.blobs.map((blob) => (
            <div className='w-1/4 rounded-lg overflow-hidden shadow-md max-w-sm items-center' key={blob}>
                <Image src={`https://aggregator.walrus-testnet.walrus.space/v1/${blob}`} alt='blob' width={500} height={500} priority className='object-cover' />
            </div>
          ))}
      </div>
    </div>
  );
}
