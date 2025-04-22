import { useEffect } from "react";

export default function useOnClickOutside(
    ref: React.RefObject<HTMLElement | null> | null,
    handler?: (event: MouseEvent | ToggleEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as HTMLElement;

            if (!ref?.current || ref.current.contains(target)) {
                return;
            }

            if (handler) {
                handler(event as MouseEvent | ToggleEvent)
            }
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);

}