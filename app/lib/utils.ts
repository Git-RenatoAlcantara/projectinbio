import { ClassValue, clsx } from 'clsx'
import imageCompression from 'browser-image-compression'
import { use } from 'react';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}


export function sanitizeLink(link?: string) {
    if (!link) return "";

    return link
        .replace(/\s/g, "")
        .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,^.<>\/?]+/, "")
        .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
    const compressPromises = files.map(async (file) => {
        try {
            return await compressImage(file);
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    return (await (Promise.all(compressPromises))).filter((file) => file !== null) as File[];
}

export const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {

        const options = {
            maxSizeMB: 0.2, // 200KB
            maxWidthOrHeight: 900,
            useWebWorker: true,
            fileType: 'image/png'
        }

        imageCompression(file, options).then((compressedFile: File) => {
            resolve(compressedFile)
        });
    });
}

export function formatUrl(url: string) {
    const formattedUrl = url.startsWith("http")
        ? url
        : `https:${url}`

    return formattedUrl
}


export function triggerImageInput(id: string) {
    document.getElementById(id)?.click()
}


export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
    }
    return null;
}
