import { Models } from 'node-appwrite';
import React from 'react';

import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import {
	convertFileSize,
	getFileTypesParams,
	getUsageSummary,
} from '@/lib/utils';

const Page = async ({ searchParams, params }: SearchParamProps) => {
	const searchText = ((await searchParams)?.query as string) || '';
	const sort = ((await searchParams)?.sort as string) || '';
	const type = ((await params)?.type as string) || '';
	const types = getFileTypesParams(type) as FileType[];
	const [files, totalSpace] = await Promise.all([
		getFiles({ types, searchText, sort }),
		getTotalSpaceUsed(),
	]);
	const usageSummary = getUsageSummary(totalSpace);
	return (
		<div className="page-container">
			<section className="w-full">
				<h1 className="h1 capitalize">{type}</h1>

				<div className="total-size-section">
					<p className="body-1">
						Total:{' '}
						{usageSummary.map(
							(fileType) =>
								fileType.url === `/${type}` && (
									<span key={fileType.title} className="h5">
										{convertFileSize(fileType.size)}
									</span>
								)
						)}
					</p>

					<div className="sort-container">
						<p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

						<Sort />
					</div>
				</div>
			</section>
			{/* Render the files */}
			{files.total > 0 ? (
				<section className="file-list">
					{files.documents.map((file: Models.Document) => (
						<Card key={file.$id} file={file} />
					))}
				</section>
			) : (
				<p className="empty-list">No files uploaded</p>
			)}
		</div>
	);
};

export default Page;
