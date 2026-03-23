import Image, { ImageLoaderProps } from "next/image";
import { useS3Objects } from "../hooks/useS3Objects";

export function S3Image(props: {src: string; alt?: string; width: number; height: number; className?: string; fill?: boolean; sizes?: string; priority?: boolean}) {
    const { getUrl } = useS3Objects();
    
    const loader = ({ src }: ImageLoaderProps) => getUrl(String(src));

    return(
        <Image
            loader={loader}
            src={props.src}
            alt={props.alt || ""}
            width={props.width}
            height={props.height}
            className={props.className}
            fill={props.fill}
            sizes={props.sizes}
            priority={props.priority}
        />
    )
}