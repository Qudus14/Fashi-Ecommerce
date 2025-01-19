"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Basket from "./mini-basket";

export default function BasketDialog(){
    const router = useRouter()

    function onDismiss(){
        router.back();
    }
    
    return(
        <Dialog open onOpenChange={(isOpen) => {
            if (!isOpen) {
                onDismiss();
            }
        }}>
            <DialogContent className="h-[90vh] bg-white w-full max-w-2xl overflow-hidden flex flex-col scrollbar-hide">
                <DialogHeader>
                    <DialogTitle>Basket</DialogTitle>
                    <DialogDescription>
                        Contents of your basket
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-hidden">
                    <Basket />
                </div>
            </DialogContent>
        </Dialog>
    );
}

