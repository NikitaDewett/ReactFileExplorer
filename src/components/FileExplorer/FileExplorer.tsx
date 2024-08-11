import React, { useState } from 'react';
import data from '../../data';
import Folder from '../Folder/Folder';
import FileViewer from '../FileViewer/FileViewer';
import './style.css';
import { fetchFile, Item } from '../../utils';

const FileExplorer: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

    const handleSelect = async (item: Item) => {
        // In case of a txt file, we want to open the file viewer with the content of the file
        if (item.type === 'file') {
            if (item.link) {
                const fileContent = await fetchFile(item.link);
                setSelectedItem({ ...item, content: fileContent });
            } else {
                console.error('File link is undefined');
            }
        } else {
            /**
             * If it's a folder, we want to open the folder with inner structure
             * We can apply same logic for images, since we don't need to fetch them
             */
            setSelectedItem(item);
        }
    };

    const handleFolderClick = (folder: any) => {
        setActiveFolderId(folder.id);
        setSelectedItem(folder);
    };

    return (
        <div className="explorerContainer">
            <div className="foldersContainer">
                <Folder
                    // Gonna pass full data and render folders recursively
                    folderItem={data} 
                    onSelect={handleSelect} 
                    onFolderClick={handleFolderClick} 
                    activeFolderId={activeFolderId}
                />
            </div>
            <div className="fileViewerContainer">
                <FileViewer item={selectedItem} onFolderClick={handleFolderClick} />
            </div>
        </div>
    );
};

export default FileExplorer;