// src/components/ui/Header.tsx
import Image from "next/image";

export function Header() {
    return (
        <nav className="flex justify-between items-center px-6 lg:px-[55px] pt-8 lg:pt-[44px] mb-8 lg:mb-12">
            <Image 
                src="/logo.png" 
                alt="Appresso Logo"
                width={80}
                height={80}
                className="w-12 h-12 lg:w-20 lg:h-20 object-contain"
            />

            <span className="text-[14px] lg:text-[32px] uppercase tracking-[0.3em] lg:tracking-[0.5em] text-center px-2 font-black"
                  style={{ 
                    fontWeight: 900,
                    WebkitTextStroke: "1px black",
                    textShadow: "0.5px 0px 0px black"
                  }}>
                ロチナ アウトマチザダ
            </span>

            <button className="group flex flex-col items-end gap-[6px] p-2">
                <div className="w-6 lg:w-10 h-[4px] lg:h-[5px] bg-black rounded-none" />
                <div className="w-6 lg:w-10 h-[4px] lg:h-[5px] bg-black rounded-none" />
                <div className="w-6 lg:w-10 h-[4px] lg:h-[5px] bg-black rounded-none mt-1" />
            </button>
        </nav>
    )
}