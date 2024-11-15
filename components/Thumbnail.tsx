import Image from 'next/image';
import React from 'react';

import { cn, getFileIcon } from '@/lib/utils';
interface Props {
	type: string;
	extension: string;
	url?: string;
	imageClassName?: string;
	className?: string;
}

const Thumbnail = ({
	type,
	extension,
	url = '',
	imageClassName,
	className,
}: Props) => {
	const isImage = type === 'image' && extension !== 'svg';
	//* ถ้าหากว่าไฟล์นั้นเป็นรูปภาพก็ให้รูปนั้นเป็น Thumbnail ไปเลย
	//! ยกเว้นไฟล์ที่เป็น type อื่นๆและ รูปภาพที่เป็นแบบ SVG จะไม่ถูกนำมาเป็น Thumbnail จะให้เป็น Icon แทน
	return (
		<figure className={cn('thumbnail', className)}>
			<Image
				src={isImage ? url : getFileIcon(extension, type)}
				alt="thumbnail"
				width={100}
				height={100}
				className={cn(
					'size-8 object-contain',
					imageClassName,
					isImage && 'thumbnail-image'
				)}
			/>
		</figure>
	);
};

export default Thumbnail;
