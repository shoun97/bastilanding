// components/RemoteImage.tsx
import Image, { ImageProps } from 'next/image';

export default function RemoteImage(props: ImageProps) {
  return (
    <Image
      {...props}
      loader={({ src }) => src} 
      unoptimized               
    />
  );
}
