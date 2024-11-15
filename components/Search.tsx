'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Models } from 'node-appwrite';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { getFiles } from '@/lib/actions/file.actions';

import FormattedDateTime from './FormattedDateTime';
import Thumbnail from './Thumbnail';
import { Input } from './ui/input';

const Search = () => {
	const [query, setQuery] = useState('');
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query') || '';
	const [results, setResults] = useState<Models.Document[]>([]);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const path = usePathname();
	const [debounceQuery] = useDebounce(query, 300);
	useEffect(() => {
		const fetchFiles = async () => {
			if (debounceQuery.length === 0) {
				setResults([]);
				setOpen(false);
				return router.push(path.replace(searchParams.toString(), ''));
			}
			const files = await getFiles({ types: [], searchText: debounceQuery });
			console.log(files);
			setResults(files.documents);
			setOpen(true);
		};
		fetchFiles();
	}, [debounceQuery]);

	useEffect(() => {
		if (!searchQuery) {
			setQuery('');
		}
	}, [searchQuery]);

	const handleClickItem = (file: Models.Document) => {
		setOpen(false);
		setResults([]);

		router.push(
			`/${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?query=${query} `
		);
	};
	return (
		<div className="search">
			<div className="search-input-wrapper">
				<Image
					src="/assets/icons/search.svg"
					width={24}
					height={24}
					alt="Search"
				/>
				<Input
					value={query}
					placeholder="Search..."
					className="search-input"
					onChange={(e) => setQuery(e.target.value)}
				/>

				{open && (
					<ul className="search-result">
						{results.length > 0 ? (
							results.map((file) => (
								<li
									key={file.$id}
									className="flex items-center justify-between"
									onClick={() => handleClickItem(file)}
								>
									<div className="flex cursor-pointer items-center gap-4">
										<Thumbnail
											type={file.type}
											extension={file.extension}
											url={file.url}
											className="size-9 min-w-9"
										/>
										<p className="subtitle-2 line-clamp-1 text-light-100">
											{file.name}
										</p>
									</div>
									<FormattedDateTime
										date={file.$createdAt}
										className="caption line-clamp-1 text-light-200"
									/>
								</li>
							))
						) : (
							<p className="empty-result">No files found</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Search;
