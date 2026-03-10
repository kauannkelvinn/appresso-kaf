import Image from "next/image";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <nav className="flex justify-between items-center px-[40px] pt-[44px] mb-12">
            <Image 
                src="/logo.png" 
                alt="Appresso Logo"
                width={80}
                height={80}
                className="object-contain"
            />

            <span className="text-[32px] font-black tracking-[0.5em] uppercase">
                ロチナ アウトマチザダ
            </span>

            <button className="p-2">
                <Menu className="w-12 h-12 stroke-[3] border-none"/>
            </button>
        </nav>
    )
}