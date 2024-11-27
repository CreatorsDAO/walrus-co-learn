'use client'
import { ConnectButton, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import Image from 'next/image'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useCallback, useEffect, useState } from 'react'
import { gallery } from '@/contracts'
import { useNetworkVariables } from '@/config'
import { toast } from '@/hooks/use-toast'
import { Library } from '@/contracts/gallery'
import { LibraryCard } from '@/components/LibraryCard'
import { CreateLibraryDialog } from '@/components/CreateLibraryDialog'


export default function Home() {
  const account = useCurrentAccount();
  const networkVariables = useNetworkVariables();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [libraries, setLibraries] = useState<Library[]>([]);


  const fetchLibraries = useCallback(async () => {
    if(!account) return;
    const libraries = await gallery.getLibraries(networkVariables.state);
    setLibraries(libraries);
  }, [account, networkVariables]);

  useEffect(() => {
    fetchLibraries();
  }, [account, fetchLibraries]);

  const handleCreateLibrary = async (name: string) => {
    const tx = await gallery.createLibrary(networkVariables, name);
    await signAndExecuteTransaction({
      transaction: tx,
    }, {
      onSuccess: () => {
        toast({
          title: "Library created successfully",
          description: "Library created successfully",
        });
        fetchLibraries();
      }
    });
  }

  const handleViewDetails = (id: string) => {
    window.open(`https://${id}.walrus.site`, "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center rounded-full overflow-hidden">
          <Image src="/logo/logo.jpg" alt="Sui Logo" width={80} height={40} />
        </div>
        <div className="flex items-center gap-x-4">
          <CreateLibraryDialog onSubmit={handleCreateLibrary} disabled={!account} />
          <ConnectButton />
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
          {libraries.map((library) => (
            <LibraryCard key={library.id.id} library={library} onViewDetails={handleViewDetails} />
          ))}
        </div>
      </main>
    </div>
  );
}
