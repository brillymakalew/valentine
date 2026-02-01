import { ReactNode } from "react";

export function ScreenLayout({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`app-wrapper flex flex-col items-center justify-center p-6 text-center relative w-full h-full ${className}`}>
            {children}
        </div>
    );
}
