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
        if (item.type === 'file') {
            if (item.link) {
                const fileContent = await fetchFile(item.link);
                setSelectedItem({ ...item, content: fileContent });
            } else {
                console.error('File link is undefined');
            }
        } else {
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
                    explorer={data} 
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