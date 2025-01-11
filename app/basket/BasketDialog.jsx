"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function BasketDialog(){
    const router=useRouter()
    
    return(
        <Dialog open onOpenChange={()=>router.back()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Your Basket</DialogTitle>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
    )
}